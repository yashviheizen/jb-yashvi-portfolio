/** small outline icons (24px grid, stroked in currentColor); all decorative */
const ICONS = {
  pointer: <path d="M6 3.5v15.2l4.1-3.9 2.8 6.2 2.5-1.1-2.8-6.1h5.7z" strokeLinejoin="round" />,
  frame: <path d="M8 3v18M16 3v18M3 8h18M3 16h18" />,
  rect: <rect x="4.5" y="6.5" width="15" height="11" />,
  pen: (
    <>
      <path d="M12 3.5 18.5 14 12 20.5 5.5 14z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="1.6" />
      <path d="M12 3.5v7.9" />
    </>
  ),
  text: <path d="M5 6.5V5h14v1.5M12 5v14M9 19h6" />,
  component: (
    <path
      d="m12 2.8 2.7 2.7L12 8.2 9.3 5.5zM12 15.8l2.7 2.7-2.7 2.7-2.7-2.7zM5.5 9.3l2.7 2.7-2.7 2.7L2.8 12zM18.5 9.3l2.7 2.7-2.7 2.7-2.7-2.7z"
      strokeLinejoin="round"
    />
  ),
  // What I do
  layers: <path d="m12 4 8.5 4.5L12 13 3.5 8.5zM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" strokeLinejoin="round" />,
  layout: <path d="M3.5 4.5h17v15h-17zM3.5 9h17M9.5 9v10.5" />,
  spark: <path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7zM18.5 15.5c.3 1.8 1 2.5 2.7 2.7-1.8.3-2.4 1-2.7 2.8-.3-1.8-1-2.5-2.7-2.8 1.8-.2 2.4-.9 2.7-2.7z" strokeLinejoin="round" />,
}
type IconName = keyof typeof ICONS

const Icon = ({ name }: { name: IconName }) => (
  <svg className="hero__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    {ICONS[name]}
  </svg>
)

const SKILLS: [string, IconName][] = [
  ['Product Design', 'layers'],
  ['UI/UX', 'layout'],
  ['AI Prototyping', 'spark'],
]

/** the toolbar's tools, in Figma's order; the pointer is the selected one */
const TOOLS: IconName[] = ['pointer', 'frame', 'rect', 'pen', 'text']

/**
 * The hero as a design canvas: a small introduction, then the headline inside a tilted
 * selection frame with eight handles and a component label, two small labels hanging off its
 * corners, and a design-tool toolbar beneath it. The frame, labels and toolbar are decoration
 * (plain text and pictures: no controls, no pointer events, no keyboard stops) and are styled
 * in neutral greys so they never read as buttons; the only blue fill, and the only interactive
 * element, is the CTA. They appear once, in sequence, and then stay still.
 */
export default function HeroCanvas() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__canvas">
        <div className="hero__group">
          <p className="hero__hello">
            <img src="/about/cafe-avatar.webp" width={240} height={240} alt="" decoding="async" />
            Hi, I’m Jb Yashvi
          </p>
          <div className="hero__stage">
            <div className="hero__sel">
              <div className="hero__frame" aria-hidden="true">
                <span className="hero__label">
                  <Icon name="component" />
                  Product designer
                </span>
                <i /><i /><i /><i /><i /><i /><i /><i />
              </div>
              <h1 id="hero-title" className="hero__title">
                <span className="hero__line"><span>Product</span></span>
                <span className="hero__line"><span>Designer</span></span>
              </h1>
            </div>
            <div className="hero__tag hero__tag--skills">
              <p className="hero__tag-head">What I do</p>
              <ul>
                {SKILLS.map(([label, icon]) => (
                  <li key={label}>
                    <Icon name={icon} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <p className="hero__tag hero__tag--tools"><span className="sr-only">Tools: </span>Figma · Claude · Codex</p>
          </div>
          <div className="hero__bar" aria-hidden="true">
            {TOOLS.map((t) => (
              <span key={t} className={`hero__tool hero__tool--${t}${t === 'pointer' ? ' is-on' : ''}`}>
                <Icon name={t} />
              </span>
            ))}
            <span className="hero__bar-rule" />
            <span className="hero__tool hero__tool--component">
              <Icon name="component" />
            </span>
          </div>
        </div>

        <div className="hero__foot">
          <p className="hero__lede">I design thoughtful digital products and bring ideas to life with AI.</p>
          <a href="#work" className="btn btn--solid hero__cta">
            Explore my work <span aria-hidden="true" className="btn__icon">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
