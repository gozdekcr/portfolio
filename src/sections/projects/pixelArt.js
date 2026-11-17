// Pixel-art covers for projects. Each sprite is drawn on a 16×16 grid, then
// composited onto a 28×36 stepped-gradient background (see renderCover).

export const PALETTE = {
  k: '#1b1530', // outline
  w: '#ffffff',
  l: '#EDE4FF', // lavender tint
  m: '#B99AFF', // mid lavender
  p: '#9047FF', // brand
  d: '#6E2BD9', // deep violet
  s: '#2A2140', // screen
  y: '#FFD66B', // accent yellow
  o: '#FF9EC7', // accent pink
  g: '#7FE3B0', // accent green
  b: '#8B5E4A', // coffee
}

function sprite(draw) {
  const g = Array.from({ length: 16 }, () => Array(16).fill('.'))
  const px = (x, y, c) => {
    if (x >= 0 && x < 16 && y >= 0 && y < 16) g[y][x] = c
  }
  const rect = (x0, y0, x1, y1, c) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) px(x, y, c)
  }
  const box = (x0, y0, x1, y1, line, fill) => {
    rect(x0, y0, x1, y1, line)
    if (fill) rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, fill)
  }
  const round = (x0, y0, x1, y1) => {
    px(x0, y0, '.')
    px(x1, y0, '.')
    px(x0, y1, '.')
    px(x1, y1, '.')
  }
  draw({ px, rect, box, round })
  return g.map((r) => r.join(''))
}

export const SPRITES = {
  // document with { } → JSON
  json: sprite(({ px, rect, box }) => {
    box(2, 0, 13, 13, 'k', 'w')
    // folded corner
    ;[[11, 0], [12, 0], [13, 0], [12, 1], [13, 1], [13, 2]].forEach(([x, y]) => px(x, y, '.'))
    px(11, 1, 'k'); px(12, 2, 'k'); px(13, 3, 'k')
    rect(10, 1, 10, 3, 'k'); rect(11, 3, 12, 3, 'k'); px(11, 2, 'l')
    // {
    rect(5, 5, 6, 5, 'p'); rect(5, 6, 5, 7, 'p'); px(4, 8, 'p'); rect(5, 9, 5, 10, 'p'); rect(5, 11, 6, 11, 'p')
    // }
    rect(9, 5, 10, 5, 'p'); rect(10, 6, 10, 7, 'p'); px(11, 8, 'p'); rect(10, 9, 10, 10, 'p'); rect(9, 11, 10, 11, 'p')
    rect(7, 8, 8, 8, 'd')
    px(7, 6, 'm'); px(8, 10, 'm')
    rect(3, 14, 14, 14, 'd')
  }),

  // chat bubble → CRM card with confidence flags
  message: sprite(({ px, rect, box, round }) => {
    box(0, 0, 15, 9, 'k', 'l')
    round(0, 0, 15, 9)
    rect(2, 2, 8, 2, 'p')
    rect(2, 4, 12, 4, 'm')
    rect(2, 6, 9, 6, 'm')
    // tail
    rect(3, 9, 4, 9, 'l'); px(2, 10, 'k'); rect(3, 10, 4, 10, 'l'); px(5, 10, 'k'); px(3, 11, 'k'); px(4, 11, 'k')
    // CRM card
    box(7, 10, 15, 15, 'k', 'w')
    px(8, 11, 'g'); rect(10, 11, 13, 11, 'm')
    px(8, 12, 'g'); rect(10, 12, 12, 12, 'm')
    px(8, 14, 'y'); rect(10, 14, 13, 14, 'm')
  }),

  // microphone + waveform + letter
  audio: sprite(({ px, rect, box }) => {
    box(2, 0, 6, 7, 'k', 'p')
    px(2, 0, '.'); px(6, 0, '.')
    px(4, 2, 'm'); px(4, 4, 'm')
    rect(0, 5, 0, 7, 'k'); rect(8, 5, 8, 7, 'k')
    px(1, 8, 'k'); px(7, 8, 'k'); rect(2, 9, 6, 9, 'k')
    rect(4, 10, 4, 11, 'k'); rect(2, 12, 6, 12, 'k')
    // waveform
    const bars = [[10, 2, 'm'], [11, 4, 'p'], [12, 3, 'd'], [13, 5, 'p'], [14, 2, 'm'], [15, 1, 'm']]
    bars.forEach(([x, h, c]) => rect(x, 4 - h + 1, x, 4 + h - 1, c))
    // letter
    box(8, 10, 15, 15, 'k', 'w')
    px(9, 11, 'k'); px(10, 12, 'k'); px(11, 13, 'k'); px(12, 13, 'k'); px(13, 12, 'k'); px(14, 11, 'k')
    px(11, 12, 'o'); px(12, 12, 'o')
  }),

  // design components grid
  component: sprite(({ px, rect, box, round }) => {
    box(0, 0, 6, 6, 'k', 'p')
    px(2, 2, 'l'); px(3, 2, 'l')
    box(9, 0, 15, 6, 'k', 'm')
    round(9, 0, 15, 6); round(10, 1, 14, 5)
    px(10, 1, 'k'); px(14, 1, 'k'); px(10, 5, 'k'); px(14, 5, 'k')
    // diamond
    const cx = 3
    for (let i = 0; i < 4; i++) {
      rect(cx - i, 9 + i, cx + i, 9 + i, 'd')
      rect(cx - i, 15 - i, cx + i, 15 - i, 'd')
    }
    px(cx, 12, 'm')
    // add-new tile
    box(9, 9, 15, 15, 'k', 'l')
    rect(12, 10, 12, 14, 'p'); rect(10, 12, 14, 12, 'p')
    // cursor
    px(7, 7, 'w'); px(7, 8, 'w'); px(8, 8, 'w')
  }),

  // coffee cup with steam
  coffee: sprite(({ px, rect, box }) => {
    ;[[4, 0], [5, 1], [4, 2], [5, 3], [8, 0], [9, 1], [8, 2], [9, 3]].forEach(([x, y]) => px(x, y, 'l'))
    box(2, 5, 11, 13, 'k', 'w')
    rect(3, 6, 10, 6, 'b')
    rect(3, 9, 10, 10, 'p')
    px(6, 9, 'o'); px(7, 9, 'o'); px(6, 10, 'o'); px(7, 10, 'o')
    // handle
    rect(12, 7, 13, 7, 'k'); rect(14, 8, 14, 10, 'k'); rect(12, 11, 13, 11, 'k')
    // saucer
    rect(0, 14, 14, 14, 'k'); rect(1, 15, 13, 15, 'd')
    px(2, 13, 'k'); px(11, 13, 'k')
  }),

  // terminal window with prompt
  terminal: sprite(({ px, rect, box }) => {
    box(0, 1, 15, 14, 'k', 's')
    rect(1, 2, 14, 3, 'd')
    px(2, 2, 'o'); px(4, 2, 'y'); px(6, 2, 'g')
    rect(1, 4, 14, 4, 'k')
    // >_
    px(2, 6, 'g'); px(3, 7, 'g'); px(2, 8, 'g')
    rect(5, 8, 7, 8, 'w')
    rect(2, 10, 10, 10, 'm')
    rect(2, 12, 6, 12, 'm')
    px(8, 12, 'y'); px(9, 12, 'y')
    rect(1, 15, 14, 15, 'd')
  }),

  // class diagram (inheritance)
  classes: sprite(({ px, rect, box }) => {
    box(4, 0, 11, 5, 'k', 'p')
    rect(5, 2, 10, 2, 'k')
    rect(6, 4, 9, 4, 'l')
    // hollow arrow head + connector
    px(7, 6, 'k'); px(8, 6, 'k'); rect(6, 7, 9, 7, 'k')
    rect(7, 8, 8, 9, 'k')
    rect(2, 9, 13, 9, 'k')
    rect(2, 10, 2, 10, 'k'); rect(13, 10, 13, 10, 'k')
    box(0, 11, 5, 15, 'k', 'm')
    rect(1, 13, 4, 13, 'k')
    box(10, 11, 15, 15, 'k', 'm')
    rect(11, 13, 14, 13, 'k')
    px(1, 12, 'w'); px(11, 12, 'w')
  }),

  // sorting bars
  bars: sprite(({ rect }) => {
    const bars = [[0, 5, 'm'], [3, 10, 'p'], [6, 7, 'd'], [9, 13, 'y'], [12, 9, 'p']]
    bars.forEach(([x, h, c]) => {
      rect(x, 15 - h, x + 2, 14, 'k')
      rect(x, 16 - h, x + 1, 14, c)
    })
    rect(0, 15, 15, 15, 'k')
  }),
}

/* ---------- cover renderer ---------- */

export const W = 28
export const H = 36
const SX = 6 // sprite position
const SY = 5

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function mix(a, b, t) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`
}
function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

/** Draws the cover onto any 2D context with a fillRect/fillStyle API. */
export function paintCover(ctx, { slug, cover }) {
  const rand = seeded(slug)
  const BANDS = 6
  const bandH = Math.ceil(H / BANDS)
  // stepped gradient with dithered seams
  for (let b = 0; b < BANDS; b++) {
    ctx.fillStyle = mix(cover.from, cover.to, b / (BANDS - 1))
    ctx.fillRect(0, b * bandH, W, bandH)
    if (b > 0) {
      ctx.fillStyle = mix(cover.from, cover.to, (b - 1) / (BANDS - 1))
      for (let x = 0; x < W; x += 2) ctx.fillRect(x + ((b * bandH) % 2), b * bandH, 1, 1)
    }
  }
  // stars
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  for (let i = 0; i < 9; i++) {
    const x = 1 + Math.floor(rand() * (W - 2))
    const y = 1 + Math.floor(rand() * 22)
    if (x > SX - 2 && x < SX + 17 && y > SY - 2 && y < SY + 18) continue
    ctx.fillRect(x, y, 1, 1)
    if (rand() > 0.55) {
      ctx.fillRect(x - 1, y, 3, 1)
      ctx.fillRect(x, y - 1, 1, 3)
    }
  }
  // ground shadow
  ctx.fillStyle = 'rgba(10,6,24,0.28)'
  ctx.fillRect(SX + 1, SY + 17, 14, 1)
  ctx.fillRect(SX + 3, SY + 18, 10, 1)
  // sprite
  const rows = SPRITES[cover.sprite] ?? SPRITES.json
  rows.forEach((row, y) => {
    for (let x = 0; x < 16; x++) {
      const c = row[x]
      if (c === '.') continue
      ctx.fillStyle = PALETTE[c]
      ctx.fillRect(SX + x, SY + y, 1, 1)
    }
  })
}

const cache = new Map()

/** Returns a PNG data URL for the project's pixel cover (cached). */
export function coverDataUrl(project) {
  if (cache.has(project.slug)) return cache.get(project.slug)
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  paintCover(canvas.getContext('2d'), project)
  const url = canvas.toDataURL('image/png')
  cache.set(project.slug, url)
  return url
}
