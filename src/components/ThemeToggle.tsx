import { useState } from 'react'

type Theme = 'light' | 'dark'

const KEY = 'jb-theme'
const META = { light: '#ffffff', dark: '#111216' }

/** the theme index.html set before first paint */
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[t])
}

/**
 * Sun and moon switch in the header. The page starts light for every visitor, whatever their
 * system theme; dark only when they choose it here, and that choice is remembered on this device.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)

  const toggle = () => {
    const t = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(KEY, t)
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    const swap = () => {
      apply(t)
      setTheme(t)
    }
    // a short cross-fade where the browser supports it, and only with motion allowed
    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(swap)
    } else swap()
  }

  const dark = theme === 'dark'
  return (
    <button type="button" className="theme-toggle" aria-label="Dark theme" aria-pressed={dark} onClick={toggle}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <g className="theme-toggle__sun">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
        <path className="theme-toggle__moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      {/* shown only in the phone menu, where the switch is a full row */}
      <span className="theme-toggle__label" aria-hidden="true">Dark theme</span>
    </button>
  )
}
