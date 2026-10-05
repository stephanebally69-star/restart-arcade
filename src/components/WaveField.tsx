'use client'

import { useEffect, useRef } from 'react'

export type FieldMode = 'demo' | 'joueur'

type Ripple = { x: number; y: number; born: number; amp: number }

/**
 * Grille de pixels vivante, inspirée du « Digital Wave Field Hero » de HorizonX.
 * Le curseur laisse une traînée lumineuse et chaque mouvement envoie une onde à
 * travers la grille. Sans interaction, la grille passe en « mode démo », comme
 * une borne d'arcade au repos : un curseur fantôme la parcourt seul.
 *
 * Canvas 2D, pas de dépendance. La boucle s'arrête quand la grille sort de
 * l'écran ou que l'onglet est masqué ; avec « réduire les animations », une
 * seule image fixe est dessinée.
 */
export function WaveField({
  cell = 112,
  minCell = 46,
  intensity = 1,
  className = '',
  onModeChange,
}: {
  /** Taille d'une case en grand écran, en pixels CSS. */
  cell?: number
  /** Taille d'une case sur mobile. */
  minCell?: number
  /** Multiplicateur de luminosité (bandeaux secondaires plus discrets). */
  intensity?: number
  className?: string
  onModeChange?: (mode: FieldMode) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const modeCb = useRef(onModeChange)
  modeCb.current = onModeChange

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = 1
    let w = 0
    let h = 0
    let size = cell
    let cols = 0
    let rows = 0
    let heat = new Float32Array(0)
    let shown = new Float32Array(0)
    let accent: [number, number, number] = [92, 225, 230]

    const ripples: Ripple[] = []
    const pointer = { x: 0, y: 0, active: false, last: -1e9 }
    let mode: FieldMode = 'demo'
    let lastRipple = 0
    let lastAuto = 0
    let raf = 0
    let running = false
    let visible = true
    let prev = performance.now()

    const readAccent = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--t-accent').trim()
      const hex = raw.match(/^#([0-9a-f]{6})$/i)
      if (hex) {
        const n = parseInt(hex[1], 16)
        accent = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
        return
      }
      const rgb = raw.match(/\d+(\.\d+)?/g)
      if (raw.startsWith('rgb') && rgb && rgb.length >= 3) accent = [+rgb[0], +rgb[1], +rgb[2]]
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      size = w < 640 ? minCell : w < 1024 ? Math.round((cell + minCell) / 2) : cell
      const nextCols = Math.ceil(w / size) + 1
      const nextRows = Math.ceil(h / size) + 1
      if (nextCols !== cols || nextRows !== rows) {
        cols = nextCols
        rows = nextRows
        heat = new Float32Array(cols * rows)
        shown = new Float32Array(cols * rows)
      }
      if (!running) draw(performance.now())
    }

    const setMode = (m: FieldMode) => {
      if (m === mode) return
      mode = m
      modeCb.current?.(m)
    }

    /** Dépose de l'énergie autour d'un point (coordonnées en cases). */
    const deposit = (gx: number, gy: number, strength: number) => {
      const r = 1.7
      for (let y = Math.floor(gy - r); y <= Math.ceil(gy + r); y++) {
        if (y < 0 || y >= rows) continue
        for (let x = Math.floor(gx - r); x <= Math.ceil(gx + r); x++) {
          if (x < 0 || x >= cols) continue
          const d = Math.hypot(x + 0.5 - gx, y + 0.5 - gy)
          if (d > r) continue
          const v = strength * (1 - d / r) ** 1.4
          const i = y * cols + x
          if (v > heat[i]) heat[i] = v
        }
      }
    }

    /** Traînée continue entre deux positions, pour ne pas laisser de trous. */
    const trail = (x0: number, y0: number, x1: number, y1: number, strength: number) => {
      const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / (size * 0.35)))
      for (let s = 1; s <= steps; s++) {
        const t = s / steps
        deposit((x0 + (x1 - x0) * t) / size, (y0 + (y1 - y0) * t) / size, strength)
      }
    }

    const addRipple = (x: number, y: number, amp: number, now: number) => {
      ripples.push({ x: x / size, y: y / size, born: now, amp })
      if (ripples.length > 14) ripples.shift()
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
      const now = performance.now()
      if (pointer.active && now - pointer.last < 400) {
        const speed = Math.hypot(x - pointer.x, y - pointer.y)
        trail(pointer.x, pointer.y, x, y, Math.min(1, 0.6 + speed / 260))
        if (now - lastRipple > 160 && speed > size * 0.25) {
          addRipple(x, y, 0.32, now)
          lastRipple = now
        }
      } else {
        deposit(x / size, y / size, 0.7)
      }
      pointer.x = x
      pointer.y = y
      pointer.active = true
      pointer.last = now
      setMode('joueur')
      start()
    }

    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      addRipple(e.clientX - rect.left, e.clientY - rect.top, 0.75, performance.now())
      start()
    }

    // Curseur fantôme du mode démo : une courbe de Lissajous lente.
    const ghost = (t: number) => {
      const s = t / 1000
      return {
        x: w * (0.62 + 0.3 * Math.sin(s * 0.37) * Math.cos(s * 0.11)),
        y: h * (0.5 + 0.38 * Math.sin(s * 0.53 + 1.3)),
      }
    }
    let ghostPrev = ghost(prev)

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000)
      prev = now
      const idle = now - pointer.last > 2600
      if (idle) {
        pointer.active = false
        setMode('demo')
        const g = ghost(now)
        trail(ghostPrev.x, ghostPrev.y, g.x, g.y, 0.85)
        ghostPrev = g
        if (now - lastAuto > 2400) {
          addRipple(g.x, g.y, 0.42, now)
          lastAuto = now
        }
      } else {
        ghostPrev = ghost(now)
      }

      const decay = Math.exp(-dt * 1.1)
      for (let i = 0; i < heat.length; i++) heat[i] *= decay
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].born > 3200) ripples.splice(i, 1)
      }
    }

    const draw = (now: number) => {
      const t = now / 1000
      const ease = reduced ? 1 : 0.14
      const [ar, ag, ab] = accent
      const gap = Math.max(1, Math.round(dpr * 1.5))
      const px = size * dpr

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x
          const cx = x + 0.5
          const cy = y + 0.5

          // Houle de fond : deux ondes lentes qui se croisent.
          const swell =
            (0.5 + 0.5 * Math.sin(cx * 0.55 + cy * 0.32 - t * 0.85)) *
            (0.5 + 0.5 * Math.sin(cx * 0.19 - cy * 0.47 + t * 0.55))
          let e = swell * 0.2 + heat[i]

          for (const r of ripples) {
            const age = (now - r.born) / 1000
            const radius = age * 6.5
            const d = Math.hypot(cx - r.x, cy - r.y) - radius
            e += r.amp * Math.exp(-(d * d) / 0.9) * Math.exp(-age * 1.15)
          }

          e = Math.min(1, e) * intensity
          shown[i] += (e - shown[i]) * ease
          const v = shown[i]

          const left = x * px + gap / 2
          const top = y * px + gap / 2
          const side = px - gap

          // Case éteinte : à peine visible, juste assez pour lire la grille.
          ctx.fillStyle = 'rgba(255,255,255,0.022)'
          ctx.fillRect(left, top, side, side)
          if (v < 0.02) continue

          // Case allumée : dégradé vertical, plus clair en haut, comme un bloc éclairé.
          const g = ctx.createLinearGradient(0, top, 0, top + side)
          g.addColorStop(0, `rgba(${ar},${ag},${ab},${0.06 + v * 0.62})`)
          g.addColorStop(1, `rgba(${ar},${ag},${ab},${0.03 + v * 0.3})`)
          ctx.fillStyle = g
          ctx.fillRect(left, top, side, side)
          ctx.fillStyle = `rgba(255,255,255,${v * 0.16})`
          ctx.fillRect(left, top, side, gap)
        }
      }
    }

    const loop = (now: number) => {
      if (!running) return
      step(now)
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    function start() {
      if (reduced || running || !visible || document.hidden) return
      running = true
      prev = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    readAccent()
    resize()

    if (reduced) {
      // Image fixe : quelques cases allumées en diagonale, sans animation.
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) {
          const d = Math.abs(x - y * 1.2 - cols * 0.35)
          heat[y * cols + x] = Math.max(0, 0.5 - d * 0.12)
        }
      draw(0)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    const mo = new MutationObserver(() => {
      readAccent()
      if (!running) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] })

    if (!reduced) {
      host.addEventListener('pointermove', onMove, { passive: true })
      host.addEventListener('pointerdown', onDown, { passive: true })
    }
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerdown', onDown)
    }
  }, [cell, minCell, intensity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
