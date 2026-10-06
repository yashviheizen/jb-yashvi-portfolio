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
 * Jb's local time in India, e.g. "10:42:08 AM · IST", ticking on each second. Two-digit hours
 * and tabular figures keep its width fixed, so the header never shifts. Screen readers get it
 * once with a label, not every second.
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
    <p className="nav__clock">
      <span className="sr-only">Local time in India: </span>
      <span className="nav__time">{time}</span>
      <span aria-hidden="true"> · </span>IST
    </p>
  )
}
