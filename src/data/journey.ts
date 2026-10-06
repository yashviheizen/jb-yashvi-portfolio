/*
 * My journey: the Experience section of Jb-Yashvi-Resume.pdf (project root and
 * public/resume), in the résumé's own order. Company names, roles, dates and bullet text are
 * copied from it word for word; nothing here is added. The first bullet is the entry's
 * summary, the rest are its details. Some roles overlap, so My journey lists every role with
 * its own dates rather than as a strict sequence.
 */

export interface Role {
  company: string
  role: string
  /** as written on the résumé: a year, or a month and year */
  from: string
  /** as written on the résumé, or 'Present' */
  to: string
  summary: string
  details: string[]
  current?: boolean
}

export const roles: Role[] = [
  {
    company: 'Heizen',
    role: 'Product Designer',
    from: '2025',
    to: 'Present',
    current: true,
    summary:
      'Designed web and mobile experiences across multiple client projects, from user research and UX planning to high-fidelity interface design.',
    details: [
      'Structured complex workflows for customer-facing applications, admin dashboards and platforms with multiple user roles.',
      'Used AI-assisted design and prototyping to explore concepts, refine interfaces and create interactive mobile and web experiences.',
      'Selected work includes NUTRIO, spanning customer, delivery, kitchen and admin experiences, and TAN90, a multi-portal cold-chain logistics platform.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Product Designer',
    from: '2022',
    to: '2024',
    summary:
      'Designed web and mobile interfaces for early-stage companies, translating client requirements into user flows and UI designs.',
    details: ['Developed brand identities and reusable design systems to support consistent digital experiences.'],
  },
  {
    company: 'Urban Culture',
    role: 'UI/UX Design Intern',
    from: 'May 2024',
    to: 'July 2024',
    summary:
      'Designed an admin panel to support operational workflows and created social media content aligned with the brand identity.',
    details: [],
  },
  {
    company: 'Scenco',
    role: 'Product Designer',
    from: '2022',
    to: '2023',
    summary: 'Designed end-to-end UI/UX and conducted competitive research to inform product features.',
    details: ['Built and maintained a design system to support consistent interfaces and developer handoff.'],
  },
  {
    company: 'Polo',
    role: 'Product Designer',
    from: '2022',
    to: '2023',
    summary:
      'Contributed to digital product design and created high-fidelity interactive prototypes aligned with business goals and user needs.',
    details: [],
  },
]

const THIS_YEAR = new Date().getFullYear()

/** the year in a résumé date ("2022", "May 2024", or 'Present' for this year) */
const yearOf = (s: string) => (s === 'Present' ? THIS_YEAR : Number(s.split(' ').at(-1)))

/** the years on the strip: the earliest start through the current year */
export const mapYears = (() => {
  const first = Math.min(...roles.map((r) => yearOf(r.from)))
  return Array.from({ length: THIS_YEAR - first + 1 }, (_, i) => first + i)
})()

/** the years a role covers on the year strip: years only, as the strip shows no months */
export function roleYears(r: Role): number[] {
  return mapYears.filter((y) => y >= yearOf(r.from) && y <= yearOf(r.to))
}
