import { setTheme, useTheme } from './theme'

/**
 * Sun and moon switch in the header. The page starts light for every visitor, whatever their
 * system theme; dark only when they choose it here, and that choice is remembered on this
 * device. Its label names what a press does.
 */
export default function ThemeToggle() {
  const dark = useTheme() === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
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
