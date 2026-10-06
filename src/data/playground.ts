import type { ImageItem } from './images'

export type PlaygroundKind = 'ui' | 'logo'

export interface PlaygroundItem extends ImageItem {
  kind: PlaygroundKind
  /** Where the file came from, for traceability only; never shown */
  source: string
  /** Width/height of the moving preview when it shows only the top of a long page; the enlarged view is always whole */
  preview?: number
}

const KIND_LABEL: Record<PlaygroundKind, string> = {
  ui: 'UI exploration',
  logo: 'Logo exploration',
}

/*
 * Ideas in motion (formerly the Design Playground): self-initiated design exercises by Jb, not client commissions,
 * launched products or case studies. All were shown in Jb's earlier Framer portfolio
 * (jbyashvi.framer.website) without project pages; Jb confirmed they are their own designs
 * (2026-10-05). The photography inside the website explorations is third-party imagery.
 * Handmade art and photographs belong in the Gallery (src/data/art.ts), not here.
 */
const items: (Omit<PlaygroundItem, 'label'>)[] = [
  {
    slug: 'jewellery',
    kind: 'ui',
    src: '/work/gallery/jewellery',
    w: 1280,
    h: 832,
    alt: 'Jewellery store homepage with the headline “Sublime into External Grace” above a scattered collage of portraits wearing gold jewellery.',
    caption: 'Jewellery store homepage',
    source: 'Voice of Grey, earlier portfolio',
  },
  {
    slug: 'coso',
    kind: 'ui',
    src: '/work/gallery/coso',
    w: 1280,
    h: 1912,
    alt: 'Long homepage for a skincare brand called COSO: a skincare photo hero, a brand mission block, four product category cards and an oversized COSO wordmark behind product packaging.',
    caption: 'Skincare brand homepage, COSO',
    preview: 0.8,
    source: 'Voice of Grey, earlier portfolio',
  },
  {
    slug: 'eyewear',
    kind: 'ui',
    src: '/work/gallery/eyewear',
    w: 1280,
    h: 832,
    alt: 'Eyewear store homepage with the headline “Pick your mood today” and a row of sunglasses and frames in thin outlined cards.',
    caption: 'Eyewear store homepage',
    source: 'Voice of Grey, earlier portfolio',
  },
  {
    slug: 'mars',
    kind: 'ui',
    src: '/work/gallery/mars',
    w: 822,
    h: 535,
    alt: 'Laptop on dark concrete steps showing a solar-system website with Mars at the centre, ringed by orbit lines and a list of planets.',
    caption: 'Solar-system website on a laptop',
    source: 'Voice of Grey, earlier portfolio',
  },
  {
    slug: 'logos',
    kind: 'logo',
    src: '/work/gallery/logos',
    w: 1800,
    h: 1349,
    alt: 'Sheet of logos on black, including FundFlow, the Casho mark, Glimm, Convo Craft and several lettermarks, with two business-card mockups.',
    caption: 'Logo sheet',
    source: 'Earlier portfolio',
  },
  {
    slug: 'ai-education',
    kind: 'ui',
    src: '/work/gallery/ai-education',
    w: 1280,
    h: 832,
    alt: 'Online learning landing page in a bento grid: the headline “Revolutionize learning with AI-driven education”, a humanoid robot photo and a lime card labelled Flexible.',
    caption: 'Online learning landing page',
    source: 'Voice of Grey, earlier portfolio',
  },
]

export const playground: PlaygroundItem[] = items.map((i) => ({ ...i, label: KIND_LABEL[i.kind] }))

const bySlug = (slugs: string[]) => slugs.map((s) => playground.find((g) => g.slug === s)!)

/** The two moving rows on the home page: the first drifts left, the second right */
export const playgroundRows = [bySlug(['jewellery', 'coso', 'eyewear']), bySlug(['logos', 'mars', 'ai-education'])]
