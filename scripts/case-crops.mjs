// Detail crops for the Compass and NUTRIO case studies, cut from images already on the site
// (and, for the dialog, from the design system PDF) so small UI text stays readable on phones.
// Run from the repo root: node scripts/case-crops.mjs
import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const webp = (img, dest) => img.webp({ quality: 86 }).toFile(dest)

// Compass: worklist status + actions columns, and the dashboard's attention banners (2016px screenshots)
const c = 'public/work/compass'
await webp(sharp(`${c}/wl.webp`).extract({ left: 1478, top: 128, width: 538, height: 425 }), `${c}/detail-actions.webp`)
await webp(sharp(`${c}/home.webp`).extract({ left: 1440, top: 84, width: 545, height: 170 }), `${c}/detail-attention.webp`)

// Compass: the destructive "Retire APL link?" dialog from the design system PDF, rendered at 2x
const dialog = join(tmpdir(), 'cmp-dialog')
execFileSync('pdftoppm', ['-png', '-singlefile', '-scale-to-x', '3600', '-scale-to-y', '-1', '-x', '980', '-y', '15750', '-W', '800', '-H', '290', `${c}/cmp-autobot-design-system.pdf`, dialog])
await webp(sharp(`${dialog}.png`), `${c}/detail-dialog.webp`)

// NUTRIO: ordering choices, scheduling and meal setup, from the 2000px case-study slices
const n = 'public/case-studies/nutrio'
const out = 'public/work/nutrio'
mkdirSync(out, { recursive: true })
const crops = [
  ['plans', '08', { left: 80, top: 600, width: 1840, height: 1000 }],
  ['schedule', '09', { left: 90, top: 570, width: 1820, height: 920 }],
  ['meals', '10', { left: 180, top: 0, width: 1660, height: 1000 }],
]
for (const [name, slice, box] of crops) {
  const base = sharp(`${n}/${slice}-2000.webp`).extract(box)
  await webp(base.clone().resize(1800), `${out}/${name}-1800.webp`)
  await webp(base.clone().resize(800), `${out}/${name}-800.webp`)
}
// Compass: the full screenshots at the lightbox's size, so they can be opened larger
for (const name of ['home', 'wl', 'settings']) await webp(sharp(`${c}/${name}.webp`).resize(1800), `${c}/${name}-1800.webp`)
console.log('crops done')
