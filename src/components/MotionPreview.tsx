import { useEffect, useRef } from 'react'

/** Muted screen recording. Plays only while visible and never when the visitor prefers reduced motion. */
export default function MotionPreview({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.5 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="motion"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      width={1280}
      height={800}
      aria-label={label}
    />
  )
}
