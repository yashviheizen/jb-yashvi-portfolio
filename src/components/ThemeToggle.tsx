import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const KEY = 'jb-theme'
const SYSTEM = '(prefers-color-scheme: dark)'
const META = { light: '#ffffff', dark: '#071530' }

/** the theme index.html set before first paint */
const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function saved(): Theme | null {
  try {
    const t = localStorage.getItem(KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

function apply(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[t])
}

/**
 * Sun and moon switch in the header. The page starts in the visitor's system theme and follows
 * it until they choose one here; from then on their choice is remembered on this device.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)

  // follow the system theme while the visitor hasn't chosen one
  useEffect(() => {
    const mq = window.matchMedia?.(SYSTEM)
    if (!mq) return
    const onChange = () => {
      if (saved()) return
      const t = mq.matches ? 'dark' : 'light'
      apply(t)
      setTheme(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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
    </button>
  )
}
