import { useEffect, useRef, useState } from 'react'

interface Section { id: string; label: string }

/**
 * Jump links for a long case study. The bar sticks just below the site header (measured, since
 * the header grows when the role wraps on phones) and marks the section being read. While it is
 * on the page it adds its own height to the page's scroll-padding-top, so a #section jump (handled
 * by the app's ScrollManager) lands below both bars. On phones the links scroll sideways.
 */
export default function CaseNav({ sections }: { sections: Section[] }) {
  const bar = useRef<HTMLElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const el = bar.current
    const header = document.querySelector<HTMLElement>('.nav')
    if (!el) return
    const root = document.documentElement
    const before = root.style.scrollPaddingTop
    const measure = () => {
      const top = header?.offsetHeight ?? 0
      el.style.top = `${top}px`
      root.style.scrollPaddingTop = `${top + el.offsetHeight + 16}px`
    }
    let frame = 0
    const update = () => {
      frame = 0
      const line = (parseFloat(root.style.scrollPaddingTop) || 0) + 8
      let next: string | null = null
      for (const s of sections) {
        const target = document.getElementById(s.id)
        if (target && target.getBoundingClientRect().top <= line) next = s.id
      }
      setActive(next)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const ro = new ResizeObserver(() => {
      measure()
      schedule()
    })
    ro.observe(el)
    if (header) ro.observe(header)
    measure()
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      root.style.scrollPaddingTop = before
    }
  }, [sections])

  // keep the current link in view in the sideways strip on phones
  useEffect(() => {
    const ol = list.current
    const a = active && ol?.querySelector<HTMLElement>(`[href="#${active}"]`)
    if (!ol || !a || ol.scrollWidth <= ol.clientWidth) return
    ol.scrollTo({ left: a.offsetLeft - ol.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <nav ref={bar} className="casenav" aria-label="On this page">
      <div className="wrap">
        <ol ref={list} className="casenav__list">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
