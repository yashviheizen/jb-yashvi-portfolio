import { useEffect, useLayoutEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { art } from '../data/art'

/** the opening's pieces, where they sit, and how fast each drifts on scroll (a share of the scroll) */
const PLACES = [
  { slug: 'earth', at: 'tl', speed: 0.22 },
  { slug: 'portrait', at: 'tr', speed: 0.34 },
  { slug: 'faces', at: 'bl', speed: 0.12 },
  { slug: 'studio-corner', at: 'br', speed: 0.26 },
  { slug: 'sunset', at: 'ml', speed: 0.4 },
] as const

const figures = PLACES.map((p) => ({ ...p, item: art.find((i) => i.slug === p.slug)! }))

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
/** below this width the opening keeps the heading and two pieces, with no scroll drift */
const WIDE_QUERY = '(min-width: 761px)'

/**
 * The Gallery opening: the heading centred, five pieces placed around it. On load the heading
 * rises line by line and each piece opens through a rectangular mask, its image settling from
 * a slight zoom. While the opening is on screen the pieces drift upward at different speeds,
 * so they part as the reader scrolls into the collection below. Nothing is pinned.
 *
 * The pieces here are decorative repeats; every one of them is in the collection below, where
 * it can be enlarged. Without scripts, or with reduced motion, it is a still composition.
 */
export default function GalleryOpening() {
  const root = useRef<HTMLElement>(null)

  // entrance: hide before the first paint, then play once the pieces have loaded (or after a
  // short wait, so a slow image never holds the opening back)
  useLayoutEffect(() => {
    const el = root.current
    if (!el || !window.matchMedia(MOTION_QUERY).matches) return
    el.setAttribute('data-animate', '')
    const imgs = [...el.querySelectorAll('img')].filter((i) => i.offsetParent !== null)
    let done = false
    const play = () => {
      if (done) return
      done = true
      requestAnimationFrame(() => el.setAttribute('data-play', ''))
    }
    const timer = window.setTimeout(play, 900)
    Promise.all(imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))).then(play)
    return () => {
      done = true
      clearTimeout(timer)
    }
  }, [])

  // scroll drift, desktop and tablet only
  useEffect(() => {
    const el = root.current
    if (!el) return
    const motion = window.matchMedia(MOTION_QUERY)
    const wide = window.matchMedia(WIDE_QUERY)
    const figs = [...el.querySelectorAll<HTMLElement>('.opening__fig')]
    let raf = 0
    const update = () => {
      raf = 0
      const on = motion.matches && wide.matches
      const y = Math.max(0, -el.getBoundingClientRect().top)
      if (on && y > el.offsetHeight) return // off screen: leave the pieces where they are
      figs.forEach((f) => (f.style.translate = on ? `0 ${(-y * Number(f.dataset.speed)).toFixed(1)}px` : ''))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    motion.addEventListener('change', onScroll)
    wide.addEventListener('change', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      motion.removeEventListener('change', onScroll)
      wide.removeEventListener('change', onScroll)
    }
  }, [])

  return (
    <header ref={root} className="opening">
      <Link to="/#outside" className="gallery-page__back opening__back">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      <div className="opening__text">
        <h1 className="opening__title">
          <span className="opening__line">
            <span style={{ '--i': 0 } as CSSProperties}>Outside</span>
          </span>
          <span className="opening__line">
            <span style={{ '--i': 1 } as CSSProperties}>the brief</span>
          </span>
        </h1>
        <p className="opening__note">Sketches, illustrations and little moments from my everyday.</p>
      </div>

      <div className="opening__pieces" aria-hidden="true">
        {figures.map(({ slug, at, speed, item }, i) => (
          <div
            key={slug}
            className={`opening__fig opening__fig--${at}`}
            data-speed={speed}
            style={{ '--i': i, '--ar': item.w / item.h } as CSSProperties}
          >
            <div className="opening__mask">
              <img
                src={`${item.src}-800.webp`}
                width={item.w}
                height={item.h}
                alt=""
                decoding="async"
                fetchPriority={i < 2 ? 'high' : undefined}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </header>
  )
}
