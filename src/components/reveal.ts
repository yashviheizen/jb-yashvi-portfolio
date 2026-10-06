/**
 * Shared helpers for the one-time [data-reveal] entrances (see RevealManager).
 * "instant" marks an element shown without its fade, for content the reader jumps past or to.
 */

const pending = () => document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')

/** Show every hidden element that starts above `limit` (a viewport y), optionally without the fade */
export function revealAbove(limit: number, instant = false) {
  pending().forEach((el) => {
    if (el.getBoundingClientRect().top < limit) {
      el.classList.add('is-in')
      if (instant) el.classList.add('is-instant')
    }
  })
}

/**
 * Before jumping to a section: show it and everything above it straight away, so the page
 * never scrolls through (or lands on) content that is still waiting for its entrance.
 */
export function revealThrough(target: Element) {
  revealAbove(target.getBoundingClientRect().bottom + window.innerHeight, true)
}
