import type { ReactNode } from 'react'
import { setTheme, useTheme, type Theme } from './theme'

const OPTIONS: { value: Theme; label: string; icon: ReactNode }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: <path className="appearance__moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />,
  },
]

/**
 * The footer's Appearance setting: Light and Dark, side by side, the current one marked. It
 * shares its state with the header switch, so changing either updates both.
 */
export default function Appearance() {
  const theme = useTheme()
  return (
    <div className="appearance" role="group" aria-labelledby="appearance-label">
      <span id="appearance-label" className="appearance__label">Appearance</span>
      <span className="appearance__options">
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            className="appearance__option"
            aria-pressed={theme === o.value}
            onClick={() => setTheme(o.value)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              {o.icon}
            </svg>
            {o.label}
          </button>
        ))}
      </span>
    </div>
  )
}
