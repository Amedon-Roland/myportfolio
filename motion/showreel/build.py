"""Builds the showreel composition (index.html) for HyperFrames.

    python3 build.py                      # copies the screenshots, writes index.html
    npx hyperframes@0.9.39 render -o out/showreel.mp4
    ffmpeg -i out/showreel.mp4 -vf scale=1280:720 -c:v libx264 -crf 27 -preset slow \
        -pix_fmt yuv420p -movflags +faststart -an ../../public/motion/showreel.mp4
"""
import json, os, shutil
P=[
 ("gspe","GSPE B2D","Laravel · Filament","gestion.gspeb2d.com",["gspe-app.jpg","gspe-app-3.jpg"]),
 ("technick","Technick Store","Next.js · Laravel","technickstore.com",["technick-site.jpg","technick-site-2.jpg"]),
 ("shenco","Shenco Empire","Next.js · Firebase","shencoempiresarl.com",["shenco-site.jpg","shenco-shop.jpg"]),
 ("bkbg","BKBG Hotels","Next.js · Three.js","bkbghotels.vercel.app",["bkbg-site.jpg","bkbg-room-3d.jpg"]),
 ("somayaf","Somayaf","Laravel · Filament","gestion · somayaf",["somayaf-app.jpg","somayaf-app-2.jpg"]),
]
os.makedirs('assets',exist_ok=True)
for *_,imgs in P:
    for im in imgs: shutil.copy(os.path.join('..','..','src','assets','work',im),'assets')
GAP=1500; W=1280; H=800; CH=52
wins=[]; labels=[]
for i,(k,name,stack,url,imgs) in enumerate(P):
    pages="".join(f'<img src="assets/{im}" alt="" />' for im in imgs)
    wins.append(f'''<div class="win" id="win-{k}" style="left:{i*GAP}px">
  <div class="chrome"><i></i><i></i><i></i><span class="url">{url}</span></div>
  <div class="view"><div class="page" id="page-{k}">{pages}</div></div>
</div>''')
    labels.append(f'''<div class="label" id="label-{k}"><span class="idx">0{i+1}</span><span class="name">{name}</span><span class="stack">{stack}</span></div>''')
N=len(P); STEP=2.8; HOLD=2.0; FOCUS=0.84; CY=495; MOVE=STEP-HOLD
def cam(i,s=None):
    s=FOCUS if s is None else s
    return dict(x=960-s*(i*GAP+W/2), y=CY-s*((H+CH)/2), scale=s)
over_s=0.235; overlocal=((N-1)*GAP+W)/2
over=dict(x=960-over_s*overlocal, y=540-over_s*((H+CH)/2), scale=over_s)
js=[]
js.append(f"tl.set('#camera',{json.dumps(cam(0))},0);")
for i,(k,*_ ) in enumerate(P):
    js.append(f"tl.set('#page-{k}',{{y:0}},0);")
T=0.0
for i,(k,*_ ) in enumerate(P):
    hold_start=T
    js.append(f"tl.to('#page-{k}',{{y:-{H},duration:0.55,ease:'expo.inOut'}},{hold_start+0.85:.2f});")
    if i<N-1:
        nk=P[i+1][0]; ms=hold_start+HOLD
        js.append(f"tl.to('#camera',{{...{json.dumps(cam(i+1))},duration:{MOVE:.2f},ease:'power3.inOut'}},{ms:.2f});")
        js.append(f"tl.to('#label-{k} > *',{{opacity:0,filter:'blur(8px)',duration:0.18,stagger:0.03,ease:'power2.in'}},{ms:.2f});")
        js.append(f"tl.fromTo('#label-{nk} > *',{{opacity:0,filter:'blur(8px)'}},{{opacity:1,filter:'blur(0px)',duration:0.3,stagger:0.07,ease:'expo.out',immediateRender:false}},{ms+MOVE*0.65:.2f});")
    T+=STEP
last=P[-1][0]
z0=T-MOVE+0.3   # end of last hold
js.append(f"tl.to('#label-{last} > *',{{opacity:0,filter:'blur(8px)',duration:0.18,stagger:0.03,ease:'power2.in'}},{z0:.2f});")
js.append(f"tl.to('#camera',{{...{json.dumps(over)},duration:1.2,ease:'power3.inOut'}},{z0:.2f});")
js.append(f"tl.fromTo('#outro > *',{{opacity:0,y:0,filter:'blur(8px)'}},{{opacity:1,filter:'blur(0px)',duration:0.4,stagger:0.08,ease:'expo.out',immediateRender:false}},{z0+0.9:.2f});")
for k,*_ in P: js.append(f"tl.to('#page-{k}',{{y:0,duration:0.6,ease:'power2.inOut'}},{z0+0.4:.2f});")
back=z0+2.9
js.append(f"tl.to('#outro > *',{{opacity:0,filter:'blur(8px)',duration:0.2,stagger:0.03,ease:'power2.in'}},{back-0.1:.2f});")
js.append(f"tl.to('#camera',{{...{json.dumps(cam(0))},duration:1.2,ease:'power3.inOut'}},{back:.2f});")
js.append(f"tl.fromTo('#label-{P[0][0]} > *',{{opacity:0,filter:'blur(8px)'}},{{opacity:1,filter:'blur(0px)',duration:0.3,stagger:0.07,ease:'expo.out',immediateRender:false}},{back+0.9:.2f});")
DUR=round(back+1.6,2)
html=open('template.html.tpl').read().replace('__DUR__',str(DUR)).replace('__WINS__',"\n".join(wins)).replace('__LABELS__',"\n".join(labels)).replace('__JS__',"\n      ".join(js))
open('index.html','w').write(html); print('duration',DUR)
