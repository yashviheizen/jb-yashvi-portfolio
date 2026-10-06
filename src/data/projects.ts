export type Track = 'designed' | 'ai'

export interface Project {
  slug: string
  name: string
  track: Track
  type: string
  summary: string
  contribution: string
  cover: string
  coverAlt: string
  /** Intrinsic cover size, used to reserve space before the image loads */
  coverSize?: [number, number]
  /** Device mockup used as the project-page hero */
  mockup?: Mockup
}

/** A real screenshot at its natural pixel size */
export interface Screen { src: string; alt: string; w: number; h: number }

export type Mockup =
  | { device: 'laptop' | 'monitor'; screens: [Screen] }
  | { device: 'phones'; screens: Screen[] }

export const projects: Project[] = [
  {
    slug: 'nutrio',
    name: 'NUTRIO',
    track: 'designed',
    type: 'End-to-end product design',
    summary:
      'A healthy-food ordering and subscription product: customer app, delivery partner app, kitchen panel and admin dashboard.',
    contribution: 'User research and end-to-end UX/UI design. No AI used.',
    cover: '/work/covers/home/nutrio.png',
    coverAlt: 'A phone on concrete steps showing the Nutrio welcome screen with a yellow Get Started button, beside the NutriO logo.',
    coverSize: [1160, 773],
  },
  {
    slug: 'tan90',
    name: 'TAN90',
    track: 'designed',
    type: 'Multi-portal product design',
    summary:
      'A cold-chain logistics platform connecting admin, warehouse managers, delivery operations and customers.',
    contribution: 'Product design across all four portals.',
    cover: '/work/covers/home/tan90.png',
    coverAlt: 'A tablet with a keyboard showing the Tan90 admin dashboard.',
    coverSize: [1279, 853],
  },
  {
    slug: 'medurun',
    name: 'Medurun',
    track: 'ai',
    type: 'AI-built live landing page',
    summary: 'Landing page for an ambulance-booking and emergency healthcare-mobility platform.',
    contribution: 'Built fully with AI. Live on the web.',
    cover: '/work/covers/home/medurun.png',
    coverAlt: 'A laptop showing the Medurun landing page with an ambulance on a city street.',
    coverSize: [1121, 1403],
    mockup: {
      device: 'laptop',
      screens: [
        {
          src: '/work/medurun/hero.webp',
          alt: 'The live Medurun landing page on a laptop: an ambulance on a night city street under the headline “Emergency support, delivered faster than ever.”',
          w: 2000,
          h: 1250,
        },
      ],
    },
  },
  {
    slug: 'iica',
    name: 'IICA',
    track: 'ai',
    type: 'AI-built interactive mobile prototype',
    summary: 'A mobile app for creators, artists and influencers: discovery, profiles, collaboration, events, classes and shopping.',
    contribution: 'Built fully with AI. Clickable prototype, not a released app.',
    cover: '/work/covers/home/iica.png',
    coverAlt: 'A phone held in a hand showing the IICA prototype.',
    coverSize: [1449, 1085],
    mockup: {
      device: 'phones',
      screens: [
        { src: '/work/iica/home.webp', alt: 'IICA home screen with a creator banner, artist spotlight and quick actions.', w: 780, h: 1688 },
        { src: '/work/iica/profile.webp', alt: 'Artist profile for Ananya Rao with a Request Collaboration button.', w: 780, h: 1688 },
        { src: '/work/iica/matches.webp', alt: 'Swipeable match card for a dancer, marked 92% match.', w: 780, h: 1688 },
      ],
    },
  },
  {
    slug: 'retina',
    name: 'Retina.ai',
    track: 'ai',
    type: 'AI-built store staff mobile prototype',
    summary: 'A store staff app for finding assigned articles, scanning barcodes and capturing product images.',
    contribution: 'Built fully with AI. Prototype of one app within the larger Retina.ai project.',
    cover: '/work/covers/home/retina.png',
    coverAlt: 'An upright phone showing the Retina.ai My Articles screen.',
    coverSize: [1457, 1080],
    mockup: {
      device: 'phones',
      screens: [
        { src: '/work/retina/articles.webp', alt: 'My Articles list with To scan, Mapped and Loose Items tabs, and a failed upload flagged at the top.', w: 680, h: 1400 },
        { src: '/work/retina/capture.webp', alt: 'Capture screen with Front, Back and Barcode steps.', w: 680, h: 1400 },
      ],
    },
  },
  {
    slug: 'flowtech',
    name: 'Flowtech',
    track: 'ai',
    type: 'AI-designed web platform prototype',
    summary:
      'An RFQ-to-PO platform prototype connecting inquiries, quotations, purchase-order verification and sales-order workflows.',
    contribution: 'Designed fully using AI. Frontend prototype with sample data.',
    cover: '/work/covers/home/flowtech.png',
    coverAlt: 'A laptop showing the Flowtech RFQ and PO inbox.',
    coverSize: [1254, 1254],
    mockup: {
      device: 'monitor',
      screens: [
        {
          src: '/work/flowtech/dashboard.webp',
          alt: 'Flowtech Operations Dashboard on a desktop monitor: a conversion pipeline from total inquiries received through quotes sent, follow-up, budgetary, negotiation and finalise stages to sales orders sent, above an Overdue Tasks table and an Action Required list.',
          w: 1512,
          h: 801,
        },
      ],
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)!

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

export const contact = {
  email: 'jbieyashvi011@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jb-yashvi/',
  /** 30-minute call booking, opened in a new tab */
  calendly: 'https://calendly.com/jbieyashvi011/30min',
  /** Prototype demos */
  instagram: 'https://www.instagram.com/jbie_uiux/',
  /** Résumé PDF in public/resume, opened in a new tab (not a forced download). BASE_URL keeps
   *  it working if the site is ever served from a subpath, and from any route. */
  resume: `${import.meta.env.BASE_URL}resume/Jb-Yashvi-Resume.pdf`,
}
