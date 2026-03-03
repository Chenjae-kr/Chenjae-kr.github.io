import { useEffect, useRef } from 'react'

export default function ClickSpark({
  sparkColor = '#6366f1',
  sparkSize = 3,
  sparkRadius = 14,
  sparkCount = 16,
  duration = 500,
  easing = 'ease-out',
  extraScale = 1,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf
    const sparks = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const ease = (t) => {
      if (easing === 'linear') return t
      if (easing === 'ease-in') return t * t
      if (easing === 'ease-in-out') return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2
      return 1 - (1 - t) * (1 - t) // ease-out
    }

    const spawn = (x, y) => {
      for (let i = 0; i < sparkCount; i++) {
        const a = (Math.PI * 2 * i) / sparkCount + Math.random() * 0.2
        const distance = sparkRadius * (0.65 + Math.random() * 0.6)
        sparks.push({
          x,
          y,
          sx: x,
          sy: y,
          tx: x + Math.cos(a) * distance * extraScale,
          ty: y + Math.sin(a) * distance * extraScale,
          start: performance.now(),
          size: Math.max(1, sparkSize * (0.7 + Math.random() * 0.6)),
        })
      }
    }

    const onClick = (e) => spawn(e.clientX, e.clientY)

    const tick = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        const raw = Math.min(1, (now - s.start) / duration)
        const t = ease(raw)
        const alpha = 1 - raw

        if (raw >= 1) {
          sparks.splice(i, 1)
          continue
        }

        const x = s.sx + (s.tx - s.sx) * t
        const y = s.sy + (s.ty - s.sy) * t

        ctx.fillStyle = sparkColor.startsWith('#')
          ? `${sparkColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
          : sparkColor
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(x, y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('click', onClick)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale])

  return <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
}
