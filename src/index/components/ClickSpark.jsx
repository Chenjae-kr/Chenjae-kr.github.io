import { useEffect, useRef } from 'react'

export default function ClickSpark({ color = '99,102,241' }) {
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

    const spawn = (x, y) => {
      for (let i = 0; i < 18; i++) {
        const a = (Math.PI * 2 * i) / 18 + Math.random() * 0.25
        const speed = 2 + Math.random() * 3
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
        })
      }
    }

    const onClick = (e) => {
      spawn(e.clientX, e.clientY)
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.02
        s.life -= 0.03
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.fillStyle = `rgba(${color},${Math.max(0, s.life)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
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
  }, [color])

  return <canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />
}
