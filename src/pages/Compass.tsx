import DeviceMockup from '../components/DeviceMockup'
import External from '../components/External'
import NextProject from '../components/NextProject'
import ProjectHeader from '../components/ProjectHeader'
import { useLightbox } from '../components/Lightbox'
import useTitle from '../components/useTitle'
import type { ImageItem } from '../data/images'
import { getProject } from '../data/projects'

const LIVE = 'https://compass-mapperv2.vercel.app/'
const PDF = `${import.meta.env.BASE_URL}work/compass/cmp-autobot-design-system.pdf`
const FROM_PDF = 'From the CMP Autobot design system PDF'

/** The four mapping queues, in the colours the design system gives them */
const queues = [
  { name: 'Matches', color: '#14874E', soft: '#D5F9E0', body: 'Auto-matched and ready for CookBook.' },
  { name: 'Likely', color: '#CA8A10', soft: '#FFF0CC', body: 'A likely match: review the Autobot’s reasoning.' },
  { name: 'No match', color: '#D33B36', soft: '#FFE8E3', body: 'No credible match: needs human investigation.' },
  { name: 'Retired', color: '#193CB8', soft: '#E1EFFF', body: 'The mapped article is retired in SAP.' },
]

interface Excerpt {
  slug: string
  w: number
  h: number
  title: string
  body: string
  alt: string
  decision?: { title: string; body: string }
}

const foundations: Excerpt[] = [
  {
    slug: 'pdf-brand',
    w: 1800,
    h: 1035,
    title: 'Amber brand, neutral surfaces',
    body: 'Brand Gold #C68A1E with hover, ink and soft tints, a dark primary for ink-heavy actions, and four near-white surfaces that keep the workspace quiet.',
    alt: 'Design system PDF excerpt, Brand Gold and Surfaces: swatches for Brand #C68A1E, Brand Hover #B27A18, Brand Ink #7A5310, Brand Soft #FFF1D6 and Primary #232932, then Background #FEFDFC, Card #FFFFFF, Secondary #F0F2F4 and Accent #EBEFF4.',
  },
  {
    slug: 'pdf-status',
    w: 1800,
    h: 581,
    title: 'Status and queue colours',
    body: 'Each queue gets one strong tone and a soft background: green, amber, red and blue. Pills, filter tabs and progress bars all use the same pairs.',
    alt: 'Design system PDF excerpt, Status & Queue Colors: Green Matches #14874E, Amber Likely #CA8A10, Red No Match #D33B36 and Blue Retired #193CB8, each with its soft background, and a note on queue semantics.',
    decision: {
      title: 'Brand colour is never a status',
      body: 'Gold marks identity only: the wordmark, the top stripe, the active nav item. Status lives in its own palette, so amber the brand and amber “Likely” never get read as the same thing.',
    },
  },
  {
    slug: 'pdf-type',
    w: 1800,
    h: 1626,
    title: 'Inter, one family for the whole UI',
    body: 'Weights 400 to 700 with tabular numbers, on a compact scale from Display 36 down to Body 13, Small 12 and 11px labels.',
    alt: 'Design system PDF excerpt, Typeface and Type Scale: a large Inter “Aa” specimen and a table of tokens Display 36px, H1 26px, H2 18px, H3 14px, Body 13px, Small 12px, Label 11px and Mono 11px with line heights, letter spacing and usage.',
  },
  {
    slug: 'pdf-spacing',
    w: 1800,
    h: 987,
    title: 'Compact spacing',
    body: 'Tailwind’s 4px scale applied tightly: small paddings inside tables and pills, wider gaps only between sections.',
    alt: 'Design system PDF excerpt, Spacing Scale: dots from 2px to 24px and a table mapping tokens 0.5 to 6 to their pixel sizes and uses, from icon gaps to page gutters.',
  },
]

const components: Excerpt[] = [
  {
    slug: 'pdf-buttons',
    w: 1800,
    h: 755,
    title: 'Buttons',
    body: 'The six shadcn/ui button variants and four sizes. The app leans on outline and ghost; default and destructive are kept for the one primary action in a dialog.',
    alt: 'Design system PDF excerpt, Button Variants and Sizes: Default, Secondary, Outline, Ghost, Destructive and Link buttons, then small, default, large, extra-large and icon sizes with a disabled state.',
  },
  {
    slug: 'pdf-decisions',
    w: 1800,
    h: 1229,
    title: 'Review actions, badges and inputs',
    body: 'Custom inline Confirm and Reject buttons for the worklist, five badge variants, and text inputs, search and a Radix select.',
    alt: 'Design system PDF excerpt, Worklist Decision Buttons, Badges, and Inputs & Select: soft green Confirm, soft red Reject and a Link APL button, badge variants, and Full name, Email, Role and search fields.',
    decision: {
      title: 'Review actions stay in one place',
      body: 'Confirm and Reject are always a pair, always in that order, never swapped, and only shown where a decision is pending. The hand learns where they are.',
    },
  },
  {
    slug: 'pdf-toggles',
    w: 1800,
    h: 784,
    title: 'Selection controls',
    body: 'Radix checkbox and switch. Checked is green, indeterminate is amber, for bulk selection in the worklist and the site multi-select.',
    alt: 'Design system PDF excerpt, Checkbox and Toggle Switch: unchecked, checked green and indeterminate amber checkboxes, a site multi-select list, and switches for on, off, disabled and active.',
  },
  {
    slug: 'pdf-table',
    w: 1800,
    h: 590,
    title: 'The worklist table',
    body: 'Uppercase 10px headers, mono tabular IDs, one queue pill per row, and decision buttons only on rows that need one.',
    alt: 'Design system PDF excerpt, Worklist Table: rows for three articles with their MOG ingredient, confidence, a queue pill (Matches, Likely Matches, No Match) and a Confirm, Confirm and Reject, or Link APL action.',
    decision: {
      title: 'Dense, but readable',
      body: 'Many rows fit on screen, so the table does the sorting work visually: quiet headers, aligned numbers, and colour only in the status pill and the pending actions.',
    },
  },
]

const inUse = [
  {
    src: '/work/compass/home.webp',
    title: 'Dashboard',
    body: 'Queue colours carry the page: the Needs Attention and Needs Transition banners and each Work progress card take the colour of their queue, while the brand gold marks the product in the sidebar.',
    alt: 'CMP Autobot Current Status dashboard: a progress gauge, amber Needs Attention and blue Needs Transition banners, stat cards, and Work progress cards with green, amber, red and blue queue pills and progress bars.',
  },
  {
    src: '/work/compass/wl.webp',
    title: 'Mapping worklist',
    body: 'Filter tabs by queue, then the table pattern from the system: checkboxes, articles with their IDs, one status pill per row, and Confirm and Reject where a decision is pending.',
    alt: 'CMP Autobot My Tasks worklist: filter tabs for All, Matches, Likely Matches, No Match and Mapped, then a table of MOG ingredients and articles with status pills and Confirm, Reject and Link APL actions.',
  },
  {
    src: '/work/compass/settings.webp',
    title: 'Settings',
    body: 'The same table, badges and switches in user management, with Add user as the single primary action.',
    alt: 'CMP Autobot Settings, User management: tabs for Users, Configuration and Sites, and a table of users with role badges, site chips and Active switches, with an Add user button.',
  },
]

const toItem = (e: Excerpt): ImageItem => ({
  slug: e.slug,
  src: `/work/compass/${e.slug}`,
  w: e.w,
  h: e.h,
  alt: e.alt,
  caption: e.title,
  label: FROM_PDF,
})

const excerpts = [...foundations, ...components]
const items = excerpts.map(toItem)

function ExcerptList({ list, open }: { list: Excerpt[]; open: (i: number) => void }) {
  return (
    <div className="ds__list">
      {list.map((e) => (
        <figure key={e.slug} className="ds__item">
          <button
            type="button"
            className="ds__zoom"
            onClick={() => open(excerpts.indexOf(e))}
            aria-label={`Enlarge: ${e.title}`}
          >
            <img
              src={`/work/compass/${e.slug}-1800.webp`}
              srcSet={`/work/compass/${e.slug}-800.webp 800w, /work/compass/${e.slug}-1800.webp 1800w`}
              sizes="(max-width: 760px) 100vw, 60vw"
              width={e.w}
              height={e.h}
              alt={e.alt}
              loading="lazy"
              decoding="async"
            />
          </button>
          <figcaption>
            <h3>{e.title}</h3>
            <p>{e.body}</p>
            {e.decision && (
              <div className="decision">
                <h4>{e.decision.title}</h4>
                <p>{e.decision.body}</p>
              </div>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Compass() {
  useTitle('Compass Group — CMP Autobot, design system & AI-assisted platform | Jb Yashvi')
  const { open, lightbox } = useLightbox(items)
  const links = (
    <>
      <External href={LIVE}>View platform</External>
      <External href={PDF} variant="ghost">
        View design system PDF
      </External>
    </>
  )

  return (
    <article>
      <ProjectHeader
        name="Compass Group — CMP Autobot"
        type="Design system & AI-assisted platform"
        intro={
          <>
            <p className="lede">
              CMP Autobot is an ingredient–article mapping workspace for Compass Group India. Teams work through
              queues of ingredients, review the Autobot’s suggested article matches, and confirm, reject or link them.
            </p>
            <p>
              I created the design system for the project and built the platform using AI. This page shows both: the
              system’s foundations and components, then the same pieces at work in the platform.
            </p>
          </>
        }
        meta={[
          { label: 'For', value: 'Compass Group India' },
          { label: 'My contribution', value: 'Design system, and the platform built using AI' },
          { label: 'Built on', value: 'Next.js, Tailwind, shadcn/ui and Radix' },
        ]}
        actions={links}
      />

      <section className="wrap showcase" aria-label="Dashboard preview">
        <DeviceMockup mockup={getProject('compass').mockup!} tone="paper" eager className="mock--hero" />
      </section>

      <section className="wrap split" aria-labelledby="overview-title">
        <div className="split__text">
          <h2 id="overview-title" className="section-title">Overview</h2>
          <p>
            The workspace is built around four mapping queues. Each row in the worklist carries one queue, and the
            queue tells the reviewer what to do next.
          </p>
        </div>
        <ul className="split__media queues">
          {queues.map((q) => (
            <li key={q.name} className="queue">
              <span className="queue__pill" style={{ color: q.color, background: q.soft }}>
                <span className="queue__dot" style={{ background: q.color }} aria-hidden="true" />
                {q.name}
              </span>
              <p>{q.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap split" aria-labelledby="contrib-title">
        <div className="split__text">
          <h2 id="contrib-title" className="section-title">My contribution</h2>
          <p>Two pieces of work, one feeding the other.</p>
        </div>
        <div className="split__media contrib">
          <div className="contrib__part">
            <h3>The design system</h3>
            <p>
              I created the CMP Autobot design system: colour, type, spacing and radius tokens, how each component is
              used, and page templates such as the app shell, worklist table, dialogs and settings.
            </p>
            <p>
              It builds on shadcn/ui and Radix, as the PDF documents. The base buttons, inputs, selects, checkboxes and
              switches come from there; the system sets how they look and when to use them, and adds the pieces this
              workspace needed, like the queue colours and the inline Confirm and Reject actions.
            </p>
          </div>
          <div className="contrib__part">
            <h3>The platform, built using AI</h3>
            <p>
              I built the platform’s interface using AI, applying the system across the dashboard, the mapping worklist
              and settings. The screens below are from that build.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap ds" aria-labelledby="found-title">
        <div className="ds__head">
          <h2 id="found-title" className="section-title">Foundations</h2>
          <p>Excerpts from the design system PDF. Select one to see it larger.</p>
        </div>
        <ExcerptList list={foundations} open={open} />
      </section>

      <section className="wrap ds" aria-labelledby="comp-title">
        <div className="ds__head">
          <h2 id="comp-title" className="section-title">Components</h2>
          <p>shadcn/ui and Radix bases, set up for a compact, data-heavy workspace.</p>
        </div>
        <ExcerptList list={components} open={open} />
      </section>

      <section className="wrap highlights" aria-labelledby="use-title">
        <h2 id="use-title" className="section-title">The system in use</h2>
        <div className="highlights__list highlights__list--single">
          {inUse.map((s) => (
            <figure key={s.title} className="highlight">
              <img src={s.src} alt={s.alt} width={2016} height={1200} loading="lazy" decoding="async" />
              <figcaption>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="end-cta end-cta--pair">{links}</div>
      </section>

      {lightbox}
      <NextProject slug="compass" />
    </article>
  )
}
