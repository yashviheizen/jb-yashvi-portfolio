import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { revealAbove } from './reveal'

/**
 * One-time reveals for elements marked data-reveal. The hiding CSS only applies under
 * html.reveal-on, which is set here, so nothing is hidden unless this script runs. Anything
 * already scrolled past (for example after a #hash jump) is revealed straight away.
 *
 * Two independent paths reveal content: the IntersectionObserver, and a scroll check that
 * shows anything at or above the bottom of the viewport. If either fails, the other still
 * makes the section visible, so a reader can never land on a blank screen.
 */
export default function RevealManager() {
  const { pathname } = useLocation()

  // layout effect: hide before the first paint, so nothing flashes then fades
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    let io: IntersectionObserver
    try {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting || e.boundingClientRect.top < 0) {
              e.target.classList.add('is-in')
              io.unobserve(e.target)
            }
          }
        },
        // phones: start a little before the content scrolls in, as fast flicks otherwise
        // reach it while it is still faded
        window.matchMedia('(max-width: 760px)').matches
          ? { rootMargin: '0px 0px 12% 0px', threshold: 0 }
          : { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    } catch {
      return // nothing is hidden if the observer cannot run
    }
    root.classList.add('reveal-on')

    // safety net: once scrolling pauses, anything in or above the viewport is shown
    let t = 0
    const check = () => {
      clearTimeout(t)
      t = window.setTimeout(() => revealAbove(window.innerHeight), 120)
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    return () => {
      io.disconnect()
      clearTimeout(t)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  return null
}
