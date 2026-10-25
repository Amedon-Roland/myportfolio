/**
 * Deterministic kente-inspired cloth from a word.
 * Every letter picks a motif and a colour pair, so the same name always
 * produces the same cloth, and the name can be read down each strip.
 */

export const KENTE = {
  gold: "#E2A43A",
  leaf: "#2F7D55",
  clay: "#B8432B",
  ink: "#141A30",
  indigo: "#2A3561",
  cotton: "#ECE7DC",
};

const COLOURS = Object.values(KENTE);

type Motif = "stripes" | "checker" | "bars" | "ladder" | "steps";
const MOTIFS: Motif[] = ["stripes", "checker", "bars", "ladder", "steps"];

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Cloth = {
  seed: number;
  strips: number;
  blocks: number;
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
};

export function weave(word: string, strips = 7): Cloth {
  const clean = word.trim().toLowerCase() || "roland";
  const seed = hash(clean);
  const random = rng(seed);
  const pick = <T,>(list: T[]) => list[Math.floor(random() * list.length)];

  // The ground pair repeats through the whole cloth, like the warp of a kente.
  const ground: [string, string] = [pick([KENTE.gold, KENTE.leaf, KENTE.clay]), KENTE.ink];
  const kept = clean.replace(/[^a-z0-9àâäéèêëîïôöùûüç]/g, "");
  const letters = [...(kept || "roland")];
  const rows = Math.max(8, Math.min(14, letters.length * 2));

  const blocks = letters.map((ch, i) => {
    const code = ch.charCodeAt(0) + i * 7;
    const a = COLOURS[code % COLOURS.length];
    let b = COLOURS[(code >> 2) % COLOURS.length];
    if (b === a) b = a === KENTE.ink ? KENTE.cotton : KENTE.ink;
    return { motif: MOTIFS[code % MOTIFS.length], a, b, density: 2 + (code % 3) };
  });

  const stripePattern = Array.from({ length: 5 }, () => 1 + Math.floor(random() * 3));

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const seam = Math.max(1.5, width / 400);
    const sw = (width - seam * (strips - 1)) / strips;
    const rh = height / rows;

    ctx.fillStyle = KENTE.ink;
    ctx.fillRect(0, 0, width, height);

    for (let s = 0; s < strips; s++) {
      const x0 = s * (sw + seam);
      for (let r = 0; r < rows; r++) {
        const y0 = r * rh;
        // Odd strips are shifted by one row, so weft blocks form a checkerboard across the cloth.
        const isBlock = (r + s) % 2 === 0;
        if (!isBlock) {
          paintStripes(ctx, x0, y0, sw, rh, ground, stripePattern);
          continue;
        }
        const block = blocks[(Math.floor(r / 2) + s) % blocks.length];
        paintBlock(ctx, x0, y0, sw, rh, block);
      }
    }
  };

  return { seed, strips, blocks: blocks.length, draw };
}

function paintStripes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  [a, b]: [string, string],
  pattern: number[],
) {
  const total = pattern.reduce((sum, n) => sum + n, 0) * 2;
  const unit = w / total;
  let cx = x;
  pattern.concat([...pattern].reverse()).forEach((n, i) => {
    ctx.fillStyle = i % 2 ? b : a;
    ctx.fillRect(cx, y, n * unit + 0.5, h);
    cx += n * unit;
  });
}

function paintBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  { motif, a, b, density }: { motif: Motif; a: string; b: string; density: number },
) {
  ctx.fillStyle = a;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = b;

  switch (motif) {
    case "stripes": {
      const n = density * 2 + 1;
      for (let i = 1; i < n; i += 2) ctx.fillRect(x + (i * w) / n, y, w / n, h);
      break;
    }
    case "bars": {
      const n = density * 2 + 1;
      for (let i = 1; i < n; i += 2) ctx.fillRect(x, y + (i * h) / n, w, h / n);
      break;
    }
    case "checker": {
      const n = density + 1;
      const cw = w / n;
      const ch = h / n;
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) if ((i + j) % 2) ctx.fillRect(x + i * cw, y + j * ch, cw, ch);
      break;
    }
    case "ladder": {
      const n = density * 2 + 1;
      for (let i = 1; i < n; i += 2) ctx.fillRect(x, y + (i * h) / n, w, h / n / 1.6);
      ctx.fillRect(x + w * 0.42, y, w * 0.16, h);
      break;
    }
    case "steps": {
      const n = density + 2;
      for (let i = 0; i < n; i++) {
        const inset = (Math.abs(i - (n - 1) / 2) / n) * w;
        ctx.fillRect(x + inset, y + (i * h) / n, w - inset * 2, h / n);
      }
      break;
    }
  }
}
