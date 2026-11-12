<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      :root {
        --ground: #0a0b0f;
        --raised: #13151c;
        --line: #23262f;
        --ink: #f2f3f6;
        --muted: #9aa0b0;
        --accent: #9db0ff;
        --font-display: Inter, sans-serif;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: var(--ground); }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: var(--font-display); color: var(--ink); }
      #backdrop {
        position: absolute; inset: 0;
        background:
          radial-gradient(1100px 600px at 50% 110%, rgba(157, 176, 255, 0.16), transparent 70%),
          radial-gradient(700px 400px at 85% -10%, rgba(157, 176, 255, 0.08), transparent 70%),
          var(--ground);
      }
      #camera { position: absolute; left: 0; top: 0; width: 1px; height: 1px; transform-origin: 0 0; }
      .win {
        position: absolute; top: 0; width: 1280px; height: 852px;
        border-radius: 22px; overflow: hidden;
        background: var(--raised);
        box-shadow: 0 0 0 1px var(--line), 0 40px 120px -20px rgba(0, 0, 0, 0.7);
      }
      .chrome { height: 52px; display: flex; align-items: center; gap: 8px; padding: 0 18px; border-bottom: 1px solid var(--line); }
      .chrome i { width: 12px; height: 12px; border-radius: 50%; background: #2c303b; }
      .url {
        margin-left: 18px; padding: 6px 16px; border-radius: 999px; background: var(--ground);
        color: var(--muted); font-size: 20px; font-weight: 500; letter-spacing: 0.01em;
      }
      .view { position: relative; height: 800px; overflow: hidden; }
      .page img { display: block; width: 1280px; height: 800px; object-fit: cover; object-position: top; }
      .label {
        position: absolute; left: 160px; bottom: 50px;
        display: flex; align-items: baseline; gap: 22px; white-space: nowrap;
      }
      .idx { font-size: 22px; font-weight: 700; color: var(--accent); font-variant-numeric: tabular-nums; }
      .name { font-size: 50px; font-weight: 700; letter-spacing: -0.03em; }
      .stack { font-size: 28px; color: var(--muted); }
      .label:not(#label-gspe) > * { opacity: 0; }
      #outro > * { opacity: 0; }
      #outro { position: absolute; left: 0; right: 0; bottom: 120px; text-align: center; }
      #outro .big { font-size: 64px; font-weight: 700; letter-spacing: -0.035em; }
      #outro .small { margin-top: 14px; font-size: 26px; color: var(--muted); }
      #outro .big b { color: var(--accent); font-weight: 700; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="__DUR__" data-width="1920" data-height="1080" data-layout-allow-overflow>
      <div id="backdrop"></div>
      <div id="camera" data-layout-allow-overflow>
__WINS__
      </div>
__LABELS__
      <div id="outro"><p class="big">Roland Amedon<b>.</b></p><p class="small">Lomé · Next.js · Laravel · Filament · Flutter</p></div>
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      __JS__
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
