'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCanvasTexture } from './kit'

/** Un produit posé sur le plateau : son détourage et sa hauteur dans la scène. */
export type TurntableItem = { name: string; image: string; height: number }

/**
 * Pilotage partagé entre la scène et l'interface HTML autour : `hold` suspend
 * le défilement (survol), `spin` reçoit l'élan donné à la souris ou au doigt
 * (degrés par seconde).
 */
export type TurntableControl = { hold: boolean; spin: number }

/**
 * Rythme : chaque produit reste SLOT secondes, s'efface en EXIT secondes, le
 * suivant arrive en ENTER secondes. Le disque tourne à SPEED degrés par seconde.
 */
const SLOT = 4.2
const EXIT = 0.45
const ENTER = 0.85
const SPEED = 14
const PLINTH_H = 0.16
const PLATTER_H = 0.06
const GOLD = '#f6c46b'


/** Reflets doux d'un studio photo, sans fichier HDR à charger. */
function Studio({ intensity }: { intensity: number }) {
  const { gl, scene } = useThree()
  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    scene.environmentIntensity = intensity
    pmrem.dispose()
    return () => {
      scene.environment = null
      env.dispose()
    }
  }, [gl, scene, intensity])
  return null
}

/** Halo radial (transparent au bord) : lueur de la LED et ombre portée au sol. */
function useRadial(stops: [number, string][]) {
  return useCanvasTexture(
    256,
    256,
    (ctx) => {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      for (const [at, color] of stops) g.addColorStop(at, color)
      ctx.fillStyle = g
      ctx.fillRect(0, 0, 256, 256)
    },
    [stops.map((s) => s.join()).join()],
  )
}

/**
 * Le plateau : un socle fixe cerclé d'une LED dorée, et un disque qui tourne,
 * gravé de sillons fins, qui porte les produits.
 */
function Platform({
  light,
  spinRef,
  glowRef,
  children,
}: {
  light: boolean
  spinRef: MutableRefObject<THREE.Group | null>
  glowRef: MutableRefObject<THREE.MeshBasicMaterial | null>
  children: ReactNode
}) {
  const base = light ? '#efede8' : '#0d0d10'
  const platter = useCanvasTexture(
    1024,
    1024,
    (ctx) => {
      const c = 512
      ctx.fillStyle = light ? '#f4f2ee' : '#121216'
      ctx.fillRect(0, 0, 1024, 1024)
      for (let r = 40; r < 500; r += 3.2) {
        ctx.strokeStyle = light ? `rgba(0,0,0,${0.025 + (r % 9) * 0.004})` : `rgba(255,255,255,${0.018 + (r % 9) * 0.003})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(c, c, r, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.strokeStyle = GOLD
      ctx.globalAlpha = 0.75
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(c, c, 455, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
      ctx.fillStyle = GOLD
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2
        ctx.beginPath()
        ctx.arc(c + Math.cos(a) * 480, c + Math.sin(a) * 480, i % 6 === 0 ? 6 : 3, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    [light],
  )
  const glow = useRadial([
    [0, 'rgba(246,196,107,0)'],
    [0.78, 'rgba(246,196,107,0)'],
    [0.857, 'rgba(246,196,107,0.55)'],
    [0.93, 'rgba(246,196,107,0.1)'],
    [1, 'rgba(246,196,107,0)'],
  ])
  const shadow = useRadial([
    [0, 'rgba(0,0,0,0.55)'],
    [0.6, 'rgba(0,0,0,0.3)'],
    [1, 'rgba(0,0,0,0)'],
  ])
  return (
    <group>
      {/* Ombre au sol et lueur de la LED, à plat sous le socle. */}
      <mesh position={[0, -0.001, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={light ? 0.5 : 0.9} />
      </mesh>
      <mesh position={[0, PLINTH_H - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial
          ref={glowRef}
          map={glow}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, PLINTH_H / 2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.5, 1.56, PLINTH_H, 128]} />
        <meshPhysicalMaterial
          color={base}
          metalness={light ? 0.1 : 0.7}
          roughness={light ? 0.35 : 0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh position={[0, PLINTH_H - 0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.008, 8, 192]} />
        <meshBasicMaterial color={new THREE.Color(GOLD).multiplyScalar(1.6)} toneMapped={false} />
      </mesh>

      <group ref={spinRef} position={[0, PLINTH_H, 0]}>
        <mesh position={[0, PLATTER_H / 2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.44, 1.44, PLATTER_H, 128]} />
          <meshPhysicalMaterial color={light ? '#e9e6df' : '#1a1a1f'} metalness={0.85} roughness={0.28} />
        </mesh>
        <mesh position={[0, PLATTER_H + 0.0006, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.42, 128]} />
          <meshPhysicalMaterial
            map={platter}
            metalness={light ? 0.05 : 0.35}
            roughness={0.42}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        {/* Ce qui est posé sur le disque tourne avec lui. */}
        <group position={[0, PLATTER_H, 0]}>{children}</group>
      </group>
    </group>
  )
}

/** Détourage du produit (WebP transparent), chargé en texture ; null tant qu'il n'est pas arrivé. */
function useCutout(src: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  useEffect(() => {
    let alive = true
    let loaded: THREE.Texture | null = null
    new THREE.TextureLoader().load(src, (t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 8
      loaded = t
      if (alive) setTexture(t)
      else t.dispose()
    })
    return () => {
      alive = false
      loaded?.dispose()
    }
  }, [src])
  return texture
}

/**
 * Donne du volume au détourage : une grille épouse la silhouette (canal alpha)
 * et se gonfle depuis ses bords, arrondie sur le pourtour et presque plate au
 * centre. Éclairée, elle accroche la lumière quand le produit pivote.
 */
function reliefGeometry(img: HTMLImageElement, width: number, height: number, thickness: number) {
  const cols = 140
  const rows = Math.max(2, Math.round((cols * height) / width))
  const canvas = document.createElement('canvas')
  canvas.width = cols + 1
  canvas.height = rows + 1
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, cols + 1, rows + 1)
  const alpha = ctx.getImageData(0, 0, cols + 1, rows + 1).data
  const n = (cols + 1) * (rows + 1)
  // Distance au bord de la silhouette (chanfrein en deux passes).
  const dist = new Float32Array(n)
  for (let i = 0; i < n; i++) dist[i] = alpha[i * 4 + 3] > 96 ? 1e6 : 0
  const at = (x: number, y: number) => y * (cols + 1) + x
  for (let y = 0; y <= rows; y++)
    for (let x = 0; x <= cols; x++) {
      const i = at(x, y)
      if (!dist[i]) continue
      let d = dist[i]
      if (x > 0) d = Math.min(d, dist[at(x - 1, y)] + 1)
      if (y > 0) d = Math.min(d, dist[at(x, y - 1)] + 1)
      if (x > 0 && y > 0) d = Math.min(d, dist[at(x - 1, y - 1)] + 1.414)
      if (x < cols && y > 0) d = Math.min(d, dist[at(x + 1, y - 1)] + 1.414)
      dist[i] = d
    }
  for (let y = rows; y >= 0; y--)
    for (let x = cols; x >= 0; x--) {
      const i = at(x, y)
      if (!dist[i]) continue
      let d = dist[i]
      if (x < cols) d = Math.min(d, dist[at(x + 1, y)] + 1)
      if (y < rows) d = Math.min(d, dist[at(x, y + 1)] + 1)
      if (x < cols && y < rows) d = Math.min(d, dist[at(x + 1, y + 1)] + 1.414)
      if (x > 0 && y < rows) d = Math.min(d, dist[at(x - 1, y + 1)] + 1.414)
      dist[i] = d
    }
  const edge = Math.max(4, Math.min(cols, rows) * 0.16)
  const geometry = new THREE.PlaneGeometry(width, height, cols, rows)
  const pos = geometry.attributes.position
  // La grille de PlaneGeometry part du haut ; l'image aussi.
  for (let i = 0; i < pos.count; i++) {
    const t = Math.min(1, dist[i] / edge)
    pos.setZ(i, Math.sqrt(1 - (1 - t) ** 2) * thickness)
  }
  geometry.computeVertexNormals()
  return geometry
}

/** Le produit en relief, debout sur le disque, avec une ombre douce à ses pieds. */
function Product({
  item,
  shadow,
  groupRef,
}: {
  item: TurntableItem
  shadow: THREE.Texture
  groupRef: (g: THREE.Group | null) => void
}) {
  const texture = useCutout(item.image)
  const img = texture?.image as HTMLImageElement | undefined
  const h = item.height
  const w = img ? (h * img.width) / img.height : h
  const geometry = useMemo(() => (img ? reliefGeometry(img, w, h, Math.min(w, h) * 0.16) : null), [img, w, h])
  useEffect(() => () => geometry?.dispose(), [geometry])
  return (
    <group ref={groupRef} visible={false}>
      {texture && geometry && (
        <>
          <mesh position={[0, 0.003, 0.04]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w * 1.2, Math.min(w, 1.1) * 0.6]} />
            <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.85} />
          </mesh>
          <mesh geometry={geometry} position={[0, h / 2, 0]} castShadow>
            <meshStandardMaterial
              map={texture}
              emissiveMap={texture}
              emissive="#ffffff"
              emissiveIntensity={0.3}
              roughness={0.38}
              metalness={0.05}
              alphaTest={0.4}
              transparent
            />
          </mesh>
        </>
      )}
    </group>
  )
}

const easeOutBack = (x: number) => 1 + 2.2 * (x - 1) ** 3 + 1.2 * (x - 1) ** 2
const easeInBack = (x: number) => 2.2 * x ** 3 - 1.2 * x ** 2
const easeOutCubic = (x: number) => 1 - (1 - x) ** 3

function Scene({
  items,
  light,
  reduced,
  control,
  onIndex,
}: {
  items: TurntableItem[]
  light: boolean
  reduced: boolean
  control: MutableRefObject<TurntableControl>
  onIndex: (i: number) => void
}) {
  const spinRef = useRef<THREE.Group | null>(null)
  const glowRef = useRef<THREE.MeshBasicMaterial | null>(null)
  const groups = useRef<(THREE.Group | null)[]>([])
  const camera = useThree((s) => s.camera)
  const state = useRef({
    angle: 0,
    index: 0,
    next: 0,
    clock: 0,
    time: 0,
    yaw: 0,
    phase: 'enter' as 'show' | 'exit' | 'enter',
    phaseT: 0,
    boost: 0,
  })
  const contact = useRadial([
    [0, 'rgba(0,0,0,0.75)'],
    [0.45, 'rgba(0,0,0,0.4)'],
    [1, 'rgba(0,0,0,0)'],
  ])
  const keyTarget = useMemo(() => {
    const o = new THREE.Object3D()
    o.position.set(0, 0.8, 0)
    return o
  }, [])

  useLayoutEffect(() => {
    camera.position.set(0, 2.2, 7.0)
    camera.lookAt(0, 1.08, 0)
  }, [camera])

  useFrame((_, delta) => {
    const s = state.current
    const c = control.current
    const dt = Math.min(delta, 0.1)
    s.time += dt

    // Un produit à la fois : il arrive d'un bond, reste SLOT secondes, s'efface.
    if (s.phase === 'show') {
      if (!c.hold && !reduced) s.clock += dt
      if (s.clock >= SLOT) {
        s.next = (s.index + 1) % items.length
        s.phase = 'exit'
        s.phaseT = 0
      }
    } else {
      s.phaseT += dt
      if (s.phase === 'exit' && s.phaseT >= EXIT) {
        s.index = s.next
        s.phase = 'enter'
        s.phaseT = 0
        onIndex(s.index)
      } else if (s.phase === 'enter' && s.phaseT >= ENTER) {
        s.phase = 'show'
        s.clock = 0
      }
    }

    // Le disque tourne en continu, plus vite pendant les changements ; un geste
    // de la main lui donne de l'élan.
    const switching = s.phase !== 'show'
    s.boost += ((switching ? 160 : 0) - s.boost) * Math.min(1, dt * 5)
    s.angle += THREE.MathUtils.degToRad((reduced ? 0 : SPEED) + s.boost + c.spin) * dt
    if (spinRef.current) spinRef.current.rotation.y = s.angle

    // Le produit pivote lentement de part et d'autre pour montrer son volume ;
    // glisser le fait tourner davantage, puis il revient.
    s.yaw += (c.spin * 0.004 - s.yaw * 1.5) * dt
    c.spin *= Math.exp(-dt * 2.4)
    if (Math.abs(c.spin) < 1) c.spin = 0
    const swing = reduced ? 0 : Math.sin(s.time * 0.55) * 0.42
    const yaw = THREE.MathUtils.clamp(swing + s.yaw, -0.9, 0.9)

    groups.current.forEach((g, i) => {
      if (!g) return
      g.visible = i === s.index
      if (!g.visible) return
      let k = 1
      let lift = 0
      if (s.phase === 'exit') k = Math.max(0.001, 1 - easeInBack(Math.min(1, s.phaseT / EXIT)))
      if (s.phase === 'enter') {
        const p = Math.min(1, s.phaseT / ENTER)
        k = Math.max(0.001, easeOutBack(p))
        lift = (1 - easeOutCubic(p)) * 0.45
      }
      // Le produit est posé sur le disque mais reste globalement tourné vers nous.
      g.rotation.y = -s.angle + yaw
      g.scale.setScalar(k)
      g.position.y = lift
    })

    if (glowRef.current) {
      const pulse = s.phase === 'enter' ? Math.sin(Math.min(1, s.phaseT / ENTER) * Math.PI) : 0
      glowRef.current.opacity = (light ? 0.35 : 0.5) + pulse * 0.45 + (c.hold ? 0.12 : 0)
    }
  })

  return (
    <>
      <Studio intensity={light ? 0.55 : 0.38} />
      <primitive object={keyTarget} />
      <spotLight
        position={[-2.6, 4.6, 3.8]}
        target={keyTarget}
        intensity={light ? 45 : 55}
        angle={0.55}
        penumbra={0.9}
        decay={1.8}
        color="#fff4e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <spotLight position={[3, 3.2, 2.4]} target={keyTarget} intensity={22} angle={0.6} penumbra={1} decay={1.8} color="#d9e6ff" />
      <pointLight position={[0, 4.2, 0]} intensity={8} distance={9} decay={1.6} />
      <ambientLight intensity={light ? 0.3 : 0.1} />

      <Platform light={light} spinRef={spinRef} glowRef={glowRef}>
        {items.map((item, i) => (
          <Product
            key={item.image}
            item={item}
            shadow={contact}
            groupRef={(g) => {
              groups.current[i] = g
            }}
          />
        ))}
      </Platform>
    </>
  )
}

/**
 * Plateau tournant en 3D portant les produits. Le rendu s'arrête
 * quand il sort de l'écran ou que l'onglet est masqué, pour ménager la batterie.
 */
export default function Turntable3D({
  items,
  light,
  control,
  onIndex,
}: {
  items: TurntableItem[]
  light: boolean
  control: MutableRefObject<TurntableControl>
  onIndex: (i: number) => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = wrapRef.current
    if (!el) return
    let onScreen = true
    const update = () => setActive(onScreen && document.visibilityState === 'visible')
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting
      update()
    })
    io.observe(el)
    document.addEventListener('visibilitychange', update)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        frameloop={active ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: 24, near: 0.1, far: 50, position: [0, 2.2, 7.0] }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene items={items} light={light} reduced={reduced} control={control} onIndex={onIndex} />
      </Canvas>
    </div>
  )
}
