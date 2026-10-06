import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

const now = () => fmt.format(new Date())

/**
 * Jb's local time in India, e.g. "10:42:08 AM IST", ticking on each second, under a visible
 * label. Two-digit hours and tabular figures keep its width fixed, so nothing beside it shifts.
 * It isn't a live region, so screen readers read it when they reach it, not every second.
 */
export default function Clock() {
  const [time, setTime] = useState(now)

  useEffect(() => {
    let id: number
    // tick just after each whole second, so it stays in step with the system clock
    const tick = () => {
      setTime(now())
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5)
    }
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 5)
    return () => clearTimeout(id)
  }, [])

  return (
    <p className="clock">
      <span className="clock__label">Local time in India</span>
      <span className="clock__time">
        {time} <abbr title="India Standard Time">IST</abbr>
      </span>
    </p>
  )
}
