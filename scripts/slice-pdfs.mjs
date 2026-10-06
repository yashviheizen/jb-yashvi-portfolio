// Renders each single-page case-study PDF into stacked image slices
// (full-res + half-res WebP) so the original layout can be shown at a legible size.
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'

sharp.cache(false)
sharp.concurrency(2)

const cases = [
  { id: 'nutrio', pdf: 'public/case-studies/nutrio-case-study.pdf' },
  { id: 'tan90', pdf: 'public/case-studies/tan90-case-study.pdf' },
]
const SLICE = 1600 // px tall per slice at full width (2000px)
const manifest = {}

for (const c of cases) {
  const out = `public/case-studies/${c.id}`
  rmSync(out, { recursive: true, force: true })
  mkdirSync(out, { recursive: true })
  const base = join(tmpdir(), `${c.id}-render`)
  // 1280pt page width -> 2000px
  if (!existsSync(`${base}.png`)) execFileSync('pdftoppm', ['-png', '-singlefile', '-scale-to-x', '2000', '-scale-to-y', '-1', c.pdf, base])
  sharp.limitInputPixels?.(false)
  const img = sharp(`${base}.png`, { limitInputPixels: false })
  const { width, height } = await img.metadata()
  const slices = []
  for (let top = 0, i = 0; top < height; top += SLICE, i++) {
    const h = Math.min(SLICE, height - top)
    const name = String(i + 1).padStart(2, '0')
    const region = sharp(`${base}.png`, { limitInputPixels: false }).extract({ left: 0, top, width, height: h })
    const buf = await region.toBuffer()
    await sharp(buf).webp({ quality: 82 }).toFile(`${out}/${name}-2000.webp`)
    await sharp(buf).resize(1000).webp({ quality: 80 }).toFile(`${out}/${name}-1000.webp`)
    slices.push({ src: `/case-studies/${c.id}/${name}`, w: width, h })
  }
  manifest[c.id] = slices
  console.log(c.id, width, height, slices.length)
}
writeFileSync('src/data/caseSlices.json', JSON.stringify(manifest, null, 2))
