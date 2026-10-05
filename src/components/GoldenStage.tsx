'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

/*
 * Scène « heure dorée » : un produit RESTART avance lentement dans un paysage
 * au soleil couchant (ciel ambré, reliefs en silhouette, poussière dans la
 * lumière). Tout est dessiné en SVG : aucun média externe, un poids minime,
 * et les trois produits partagent le même éclairage.
 */

export type StageProduct = 'flipper' | 'flechettes' | 'basket'

type Ref = { id: (n: string) => string; url: (n: string) => string }

const r2 = (n: number) => Math.round(n * 100) / 100

/** Secteur d'anneau (cible de fléchettes). Angles en degrés, 0 = midi. */
function sector(r1: number, r2_: number, a1: number, a2: number) {
  const p = (r: number, a: number) => {
    const rad = ((a - 90) * Math.PI) / 180
    return `${r2(r * Math.cos(rad))} ${r2(r * Math.sin(rad))}`
  }
  return `M${p(r2_, a1)}A${r2_} ${r2_} 0 0 1 ${p(r2_, a2)}L${p(r1, a2)}A${r1} ${r1} 0 0 0 ${p(r1, a1)}Z`
}

/* --- Produits ------------------------------------------------------------
 * Chaque produit est dessiné avec son pied au point (0, 0), lumière venant de
 * la droite (le soleil). Les faces tournées vers le soleil prennent le dégradé
 * « lit », les autres restent dans l'ombre avec un liseré chaud.
 */

function Flechettes({ url, id }: Ref) {
  const rings: [number, number, (k: number) => string][] = [
    [12, 35, (k) => (k % 2 ? '#e8dcc2' : '#16110e')],
    [35, 40, (k) => (k % 2 ? '#2f6b55' : '#b5352b')],
    [40, 57, (k) => (k % 2 ? '#e8dcc2' : '#16110e')],
    [57, 62, (k) => (k % 2 ? '#2f6b55' : '#b5352b')],
  ]
  return (
    <g>
      <ellipse cx={-70} cy={4} rx={210} ry={22} fill={url('shadow')} />
      <clipPath id={id('clip-flechettes')}>
        <polygon points="-100,-575 144,-575 144,-16 88,0 -95,0" />
      </clipPath>

      {/* Faces latérales, côté soleil */}
      <polygon points="88,-505 132,-520 132,-16 88,0" fill={url('lit')} />
      <polygon points="100,-560 144,-575 144,-520 100,-505" fill={url('lit')} />
      <polygon points="-100,-560 100,-560 144,-575 -56,-575" fill="#c9a77e" />

      {/* Façade */}
      <rect x={-88} y={-505} width={176} height={470} fill={url('shade')} />
      <rect x={-100} y={-560} width={200} height={55} fill="#1d1511" />
      <rect x={-86} y={-551} width={172} height={36} rx={4} fill="#0e0907" />
      <text
        x={0}
        y={-525}
        textAnchor="middle"
        fontSize={22}
        fontWeight={700}
        letterSpacing={4}
        fill="#ffd08f"
        filter={url('glow')}
      >
        RESTART
      </text>
      {Array.from({ length: 13 }, (_, i) => (
        <circle key={i} cx={-72 + i * 12} cy={-498} r={2.2} fill="#ffc46b" className="gs-led" style={{ animationDelay: `${i * 90}ms` }} />
      ))}

      {/* Panneau cible */}
      <rect x={-80} y={-490} width={160} height={182} rx={6} fill="#0b0807" />
      <g transform="translate(0 -416)">
        <circle r={74} fill="#050404" />
        <circle r={66} fill="#1b1512" />
        {rings.map(([a, b, color]) =>
          Array.from({ length: 20 }, (_, k) => (
            <path key={`${a}-${k}`} d={sector(a, b, k * 18 - 9, k * 18 + 9)} fill={color(k)} />
          )),
        )}
        <circle r={12} fill="#2f6b55" />
        <circle r={5} fill="#b5352b" />
        <circle r={66} fill={url('board-light')} />
      </g>
      <rect x={-52} y={-344} width={104} height={30} rx={3} fill="#0f2233" />
      <rect x={-52} y={-344} width={104} height={30} rx={3} fill={url('screen-glow')} />
      <text x={0} y={-322} textAnchor="middle" fontSize={20} fontWeight={800} fill="#f4f7fb">
        501
      </text>

      {/* Pupitre */}
      <polygon points="-94,-300 94,-300 104,-278 -104,-278" fill="#2a1f18" />
      <polygon points="94,-300 138,-315 148,-293 104,-278" fill={url('lit')} />

      {/* Caisson bas : covering à rayons, dessin RESTART */}
      <clipPath id={id('dart-body')}>
        <rect x={-88} y={-278} width={176} height={238} />
      </clipPath>
      <rect x={-88} y={-278} width={176} height={238} fill="#14100d" />
      <g clipPath={url('dart-body')} opacity={0.92}>
        {['#e07a2f', '#f2b134', '#c4462d', '#2f7f78', '#1f4f4a'].map((c, i) => (
          <polygon key={c} points={`${-120 + i * 26},-40 ${-96 + i * 26},-40 ${30 + i * 26},-278 ${6 + i * 26},-278`} fill={c} />
        ))}
      </g>
      <rect x={-88} y={-278} width={176} height={238} fill={url('shade-overlay')} />
      <rect x={-95} y={-40} width={190} height={40} fill="#100b08" />
      <polygon points="95,-40 139,-55 139,-15 95,0" fill="#5a4231" />

      {/* Liserés de lumière */}
      <g stroke="#ffd79e" strokeLinecap="round" fill="none">
        <path d="M132 -520 L132 -16" strokeWidth={2.5} opacity={0.9} />
        <path d="M144 -575 L144 -520" strokeWidth={2.5} />
        <path d="M-56 -575 L144 -575" strokeWidth={1.5} opacity={0.7} />
        <path d="M88 -505 L88 0" strokeWidth={1.2} opacity={0.45} />
      </g>
    </g>
  )
}

function Flipper({ url, id }: Ref) {
  // Vue de trois quarts : longueur vers la droite, profondeur D = (95, -42).
  const pf = 'matrix(1 -0.0667 0.95 -0.42 -250 -300)'
  const bg = 'matrix(1 -0.4421 0 1 185 -579)'
  return (
    <g>
      <ellipse cx={-20} cy={-10} rx={330} ry={34} fill={url('shadow')} />
      <clipPath id={id('clip-flipper')}>
        <polygon points="-250,-228 -155,-270 185,-293 185,-507 280,-549 320,-552 320,-300 295,-180 200,-138 192,0 -236,0 -250,-138" />
      </clipPath>
      <g transform="translate(0 72)">

      {/* Pieds côté opposé (masqués en partie par la caisse) */}
      <g fill={url('metal-dark')}>
        <rect x={-141} y={-254} width={12} height={140} />
        <rect x={273} y={-254} width={12} height={140} />
      </g>

      {/* Fronton : face avant (vitre de fronton), côté, dessus */}
      <polygon points="185,-329 280,-371 280,-621 185,-579" fill="#120c09" />
      <g transform={bg}>
        <rect x={6} y={10} width={83} height={158} rx={3} fill={url('backglass')} />
        <circle cx={47.5} cy={82} r={22} fill="#ffe2a8" opacity={0.95} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={6} y={102 + i * 11} width={83} height={4 + i} fill="#3a1630" opacity={0.75} />
        ))}
        <text x={47.5} y={40} textAnchor="middle" fontSize={13} fontWeight={800} letterSpacing={1.5} fill="#fff4dd">
          RESTART
        </text>
        <rect x={12} y={178} width={71} height={30} rx={2} fill="#1a0d06" />
        <text x={47.5} y={199} textAnchor="middle" fontSize={15} fontWeight={700} fill="#ff9d3c" filter={url('glow')}>
          88 420
        </text>
        <circle cx={28} cy={230} r={9} fill="#0a0706" stroke="#3b2c22" />
        <circle cx={67} cy={230} r={9} fill="#0a0706" stroke="#3b2c22" />
      </g>
      <polygon points="185,-329 225,-332 225,-582 185,-579" fill={url('lit')} />
      <polygon points="185,-579 225,-582 320,-624 280,-621" fill="#d2ad80" />

      {/* Plateau vitré, vu de dessus */}
      <polygon points="-250,-300 200,-330 295,-372 -155,-342" fill={url('glass')} />
      <g transform={pf} opacity={0.95}>
        <path d="M20 10 L20 90 M60 6 L60 94" stroke="#ffb35c" strokeWidth={1.5} opacity={0.35} />
        <rect x={34} y={30} width={18} height={4} rx={2} fill="#ffe0a3" transform="rotate(-24 34 32)" />
        <rect x={34} y={66} width={18} height={4} rx={2} fill="#ffe0a3" transform="rotate(24 34 68)" />
        <circle cx={300} cy={28} r={11} fill="#ff8a3d" filter={url('glow')} />
        <circle cx={340} cy={62} r={11} fill="#3fd0c2" filter={url('glow')} />
        <circle cx={286} cy={72} r={11} fill="#ffcf66" filter={url('glow')} />
        <path d="M120 85 C220 95 330 100 410 60" stroke="#ffd59a" strokeWidth={2} fill="none" opacity={0.6} />
        <circle cx={170} cy={48} r={4} fill="#f2f2f2" className="gs-ball" />
      </g>
      <polygon points="-250,-300 200,-330 295,-372 -155,-342" fill={url('glass-reflect')} />

      {/* Face avant de la caisse (côté joueur) */}
      <polygon points="-250,-300 -155,-342 -155,-252 -250,-210" fill="#1a120d" />
      <polygon points="-232,-262 -214,-270 -214,-246 -232,-238" fill="#ff9d3c" opacity={0.85} className="gs-led" />
      <polygon points="-200,-276 -182,-284 -182,-260 -200,-252" fill="#ff9d3c" opacity={0.85} className="gs-led" />

      {/* Flanc de la caisse, habillage RESTART */}
      <polygon points="-250,-300 200,-330 200,-210 -250,-210" fill={url('lit')} />
      <polygon points="-250,-262 200,-292 200,-280 -250,-250" fill="#e07a2f" opacity={0.85} />
      <polygon points="-250,-244 200,-274 200,-268 -250,-238" fill="#f2b134" opacity={0.85} />
      <circle cx={-236} cy={-280} r={5} fill="#ffcf66" />

      {/* Barre de verrouillage et pieds côté visible */}
      <path d="M-250 -300 L-155 -342" stroke={url('metal')} strokeWidth={7} strokeLinecap="round" />
      <g fill={url('metal')}>
        <rect x={-236} y={-212} width={14} height={140} />
        <rect x={178} y={-212} width={14} height={140} />
      </g>
      <ellipse cx={-229} cy={-71} rx={11} ry={3} fill="#0d0907" />
      <ellipse cx={185} cy={-71} rx={11} ry={3} fill="#0d0907" />

      <g stroke="#ffd79e" strokeLinecap="round" fill="none">
        <path d="M-250 -300 L200 -330" strokeWidth={2} opacity={0.8} />
        <path d="M200 -330 L200 -210" strokeWidth={2.5} />
        <path d="M225 -332 L225 -582" strokeWidth={2.5} />
        <path d="M225 -582 L320 -624" strokeWidth={1.5} opacity={0.8} />
        <path d="M192 -212 L192 -72" strokeWidth={1.5} opacity={0.7} />
      </g>
      </g>
    </g>
  )
}

function Basket({ url, id }: Ref) {
  // Vue de face : la rampe file vers le panier, filets de part et d'autre.
  return (
    <g>
      <ellipse cx={-50} cy={4} rx={280} ry={26} fill={url('shadow')} />
      <clipPath id={id('clip-basket')}>
        <polygon points="-158,0 -158,-120 -150,-430 -110,-600 -140,-605 -140,-665 170,-675 170,-615 140,-610 150,-430 158,-120 190,-131 190,-11 158,0" />
      </clipPath>

      {/* Tour du fond : panneau, cible, enseigne */}
      <rect x={-110} y={-600} width={220} height={300} fill="#17100c" />
      <polygon points="110,-600 140,-610 140,-310 110,-300" fill={url('lit')} />
      <rect x={-68} y={-575} width={136} height={95} rx={3} fill="#f1e2c8" />
      <rect x={-68} y={-575} width={136} height={95} rx={3} fill={url('board-sheen')} />
      <rect x={-24} y={-530} width={48} height={38} fill="none" stroke="#e0641e" strokeWidth={3} />
      <rect x={-68} y={-575} width={136} height={95} rx={3} fill="none" stroke="#fff6e6" strokeWidth={3} />
      <rect x={-140} y={-665} width={280} height={60} rx={6} fill="#120b08" />
      <polygon points="140,-665 170,-675 170,-615 140,-605" fill={url('lit')} />
      <text x={0} y={-624} textAnchor="middle" fontSize={30} fontWeight={800} letterSpacing={4} fill="#ffd08f" filter={url('glow')}>
        RESTART
      </text>

      {/* Rampe */}
      <polygon points="-150,-120 150,-120 100,-300 -100,-300" fill={url('ramp-front')} />
      <g stroke="#3a2416" strokeWidth={1.2} opacity={0.55}>
        <path d="M-50 -120 L-33 -300 M50 -120 L33 -300 M-140 -156 L140 -156 M-128 -200 L128 -200 M-115 -248 L115 -248" />
      </g>

      {/* Filets latéraux et montants */}
      <polygon points="-150,-120 -100,-300 -100,-520 -150,-430" fill={url('mesh')} opacity={0.45} />
      <polygon points="150,-120 100,-300 100,-520 150,-430" fill={url('mesh')} opacity={0.6} />
      <g stroke={url('metal')} strokeLinecap="round">
        <path d="M-150 -120 L-150 -430 L-100 -520 L-100 -300" strokeWidth={5} fill="none" />
        <path d="M150 -120 L150 -430 L100 -520 L100 -300" strokeWidth={5} fill="none" />
      </g>

      {/* Cercle et filet, en avant du panneau */}
      <path d="M0 -480 L0 -474" stroke="#c9b9a2" strokeWidth={4} />
      <g className="gs-net">
        <path
          d="M-34 -470 L-20 -428 M-17 -463 L-10 -426 M0 -461 L0 -425 M17 -463 L10 -426 M34 -470 L20 -428 M-34 -470 L-10 -446 L10 -426 M34 -470 L10 -446 L-10 -426 M-20 -428 Q0 -420 20 -428"
          stroke="#f6ead6"
          strokeWidth={1.6}
          fill="none"
          opacity={0.85}
        />
      </g>
      <ellipse cx={0} cy={-470} rx={34} ry={9} fill="none" stroke="#e8661f" strokeWidth={4.5} />

      {/* Ballons : deux au repos, un qui remonte la rampe */}
      {[
        [-62, -142],
        [-24, -147],
        [26, -150],
      ].map(([cx, cy], i) => (
        // Position dans l'attribut, animation sur le groupe interne : le CSS écraserait l'attribut.
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <g className={i === 2 ? 'gs-roll' : undefined}>
            <circle r={18} fill={url('ball')} />
            <path d="M-18 0 Q0 6 18 0 M0 -18 Q-7 0 0 18 M-12 -13 Q0 -4 12 -13" stroke="#3b1a08" strokeWidth={1.4} fill="none" />
          </g>
        </g>
      ))}

      {/* Caisson avant (côté joueur) */}
      <rect x={-158} y={-120} width={316} height={120} fill={url('shade')} />
      <clipPath id={id('basket-front')}>
        <rect x={-158} y={-120} width={316} height={120} />
      </clipPath>
      <g clipPath={url('basket-front')} opacity={0.9}>
        {['#e07a2f', '#f2b134', '#c4462d', '#2f7f78'].map((c, i) => (
          <polygon key={c} points={`${-40 + i * 24},0 ${-18 + i * 24},0 ${70 + i * 24},-120 ${48 + i * 24},-120`} fill={c} />
        ))}
      </g>
      <rect x={-158} y={-120} width={316} height={120} fill={url('shade-overlay')} />
      <circle cx={-110} cy={-82} r={9} fill="#3fd0c2" className="gs-led" />
      <circle cx={-80} cy={-82} r={9} fill="#ff9d3c" className="gs-led" style={{ animationDelay: '300ms' }} />
      <polygon points="158,-120 190,-131 190,-11 158,0" fill={url('lit')} />
      <rect x={-158} y={-124} width={316} height={6} fill={url('metal')} />

      <g stroke="#ffd79e" strokeLinecap="round" fill="none">
        <path d="M190 -131 L190 -11" strokeWidth={2.5} />
        <path d="M140 -610 L140 -310" strokeWidth={2.5} />
        <path d="M170 -675 L170 -615" strokeWidth={2} />
        <path d="M150 -120 L150 -430" strokeWidth={1.5} opacity={0.8} />
      </g>
    </g>
  )
}

const PRODUCTS: Record<StageProduct, { draw: (r: Ref) => ReactNode; at: string }> = {
  flipper: { draw: (r) => <Flipper {...r} />, at: 'translate(780 800) scale(1.08)' },
  flechettes: { draw: (r) => <Flechettes {...r} />, at: 'translate(770 806) scale(1.12)' },
  basket: { draw: (r) => <Basket {...r} />, at: 'translate(790 806) scale(1.04)' },
}

// Particules de poussière dans le faisceau du soleil (positions fixes : rendu identique serveur/client).
const DUST = [
  [980, 520, 2.2, 0], [1060, 470, 1.6, 1.2], [1120, 560, 2.6, 2.4], [1210, 500, 1.4, 0.6],
  [1290, 590, 2, 3.1], [1010, 610, 1.4, 1.8], [1160, 430, 1.8, 4], [1350, 470, 2.4, 2.2],
  [900, 560, 1.4, 3.6], [1240, 650, 1.6, 0.9], [1420, 560, 1.8, 1.5], [1080, 640, 2.2, 4.4],
  [840, 480, 1.2, 2.8], [1310, 420, 1.4, 0.3], [960, 450, 1.8, 3.3], [1480, 640, 2, 2],
] as const

export function GoldenScene({
  product,
  playing,
  label,
}: {
  product: StageProduct
  playing: boolean
  label: string
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (n: string) => `gs${uid}-${n}`
  const url = (n: string) => `url(#${id(n)})`
  const ref = { id, url }
  const p = PRODUCTS[product]

  // Une couche SVG par plan : chaque mouvement anime une couche entière, que le
  // navigateur déplace sans la redessiner. Les dégradés, déclarés dans la
  // première couche, servent à toutes les autres.
  const layer = 'absolute inset-0 size-full'
  const box = { viewBox: '0 0 1600 900', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true } as const

  return (
    <div
      role="img"
      aria-label={label}
      className={`gs relative size-full overflow-hidden ${playing ? '' : 'gs-paused'}`}
    >
      <svg {...box} className={layer}>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d130f" />
          <stop offset="0.34" stopColor="#4b2718" />
          <stop offset="0.56" stopColor="#a4532a" />
          <stop offset="0.68" stopColor="#e19651" />
          <stop offset="0.74" stopColor="#f7cd8a" />
        </linearGradient>
        <radialGradient id={id('sun')} cx="1240" cy="610" r="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff3d4" stopOpacity="1" />
          <stop offset="0.08" stopColor="#ffd998" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#f2a457" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f2a457" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('haze')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd39a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffd39a" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffd39a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('ground')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f2216" />
          <stop offset="0.3" stopColor="#2a170e" />
          <stop offset="1" stopColor="#0e0806" />
        </linearGradient>
        <radialGradient id={id('spill')} cx="1180" cy="700" r="620" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 0.16 0 588)">
          <stop offset="0" stopColor="#ffc983" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffc983" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#060302" stopOpacity="0.75" />
          <stop offset="0.6" stopColor="#060302" stopOpacity="0.35" />
          <stop offset="1" stopColor="#060302" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('lit')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2a20" />
          <stop offset="0.55" stopColor="#7d5f46" />
          <stop offset="0.9" stopColor="#d8ab74" />
          <stop offset="1" stopColor="#f6d39b" />
        </linearGradient>
        <linearGradient id={id('shade')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#120d0a" />
          <stop offset="1" stopColor="#2a1e17" />
        </linearGradient>
        <linearGradient id={id('shade-overlay')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b0705" stopOpacity="0.72" />
          <stop offset="0.7" stopColor="#0b0705" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={id('metal')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3c33" />
          <stop offset="0.45" stopColor="#b9a089" />
          <stop offset="0.7" stopColor="#fff0d2" />
          <stop offset="1" stopColor="#8b725f" />
        </linearGradient>
        <linearGradient id={id('metal-dark')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c1410" />
          <stop offset="1" stopColor="#4c3a2e" />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0c1418" />
          <stop offset="0.7" stopColor="#1a2329" />
          <stop offset="1" stopColor="#5b4a3a" />
        </linearGradient>
        <linearGradient id={id('glass-reflect')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.42" stopColor="#ffe6c2" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#ffe6c2" stopOpacity="0.18" />
          <stop offset="0.86" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('backglass')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24103a" />
          <stop offset="0.45" stopColor="#c2462d" />
          <stop offset="0.62" stopColor="#ffb357" />
          <stop offset="1" stopColor="#3a1630" />
        </linearGradient>
        <radialGradient id={id('board-light')} cx="0.75" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#ffd59a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </radialGradient>
        <linearGradient id={id('screen-glow')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4f7b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={id('board-sheen')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#c9874a" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={id('ramp-front')} x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0" stopColor="#6b4428" />
          <stop offset="1" stopColor="#d49a5e" />
        </linearGradient>
        <radialGradient id={id('ball')} cx="0.68" cy="0.32" r="0.8">
          <stop offset="0" stopColor="#ffb06a" />
          <stop offset="0.5" stopColor="#d9631f" />
          <stop offset="1" stopColor="#5d260b" />
        </radialGradient>
        <pattern id={id('mesh')} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 14 M0 0 L14 0" stroke="#f3dcb8" strokeWidth="1" />
        </pattern>
        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3dc" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff3dc" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff3dc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('vignette')} cx="0.5" cy="0.55" r="0.75">
          <stop offset="0.55" stopColor="#0b0604" stopOpacity="0" />
          <stop offset="1" stopColor="#0b0604" stopOpacity="0.65" />
        </radialGradient>
        <linearGradient id={id('ray')} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#ffe2ad" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffe2ad" stopOpacity="0" />
        </linearGradient>
        <filter id={id('glow')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1600" height="900" fill={url('sky')} />
      </svg>

      {/* Halo du soleil et rayons : seule leur opacité varie */}
      <svg {...box} className={`${layer} gs-sun`}>
        <rect width="1600" height="900" fill={url('sun')} />
      </svg>
      <svg {...box} className={`${layer} gs-rays`}>
        <polygon points="1240,610 -100,260 -100,420" fill={url('ray')} />
        <polygon points="1240,610 -100,520 -100,600" fill={url('ray')} />
        <polygon points="1240,610 200,-40 420,-40" fill={url('ray')} />
      </svg>

      {/* Reliefs, du plus lointain au plus proche (parallaxe) */}
      <svg {...box} className={`${layer} gs-far`}>
        <circle cx="1240" cy="610" r="44" fill="#fff6df" />
        <path
          d="M-200 640 L-40 590 L90 612 L240 548 L400 600 L560 556 L720 612 L880 566 L1040 618 L1200 574 L1360 612 L1520 560 L1680 604 L1820 570 L1820 720 L-200 720Z"
          fill="#8a4a2a"
          opacity={0.55}
        />
        <rect x="-200" y="560" width="2020" height="140" fill={url('haze')} />
      </svg>
      <svg {...box} className={`${layer} gs-mid`}>
        <path
          d="M-200 672 C40 630 180 660 360 640 S700 672 900 636 S1260 676 1460 642 S1760 660 1820 650 L1820 760 L-200 760Z"
          fill="#3f2216"
        />
      </svg>
      <svg {...box} className={layer}>
        <rect y="680" width="1600" height="220" fill={url('ground')} />
        <rect y="560" width="1600" height="340" fill={url('spill')} />
      </svg>

      {/* Produit : poussée lente vers l'avant + reflet qui balaie le métal */}
      <svg {...box} className={`${layer} gs-push`}>
        <g transform={p.at}>
          {p.draw(ref)}
          <g clipPath={url(`clip-${product}`)}>
            <rect className="gs-sheen" x={-520} y={-720} width={150} height={760} fill={url('sheen')} />
          </g>
        </g>
      </svg>

      {/* Premier plan rocheux */}
      <svg {...box} className={`${layer} gs-near`}>
        <path d="M1280 900 L1340 770 L1400 742 L1470 700 L1560 690 L1640 720 L1760 700 L1760 900Z" fill="#1c100b" />
        <path d="M-160 900 L-160 740 L-40 728 L60 760 L150 820 L200 900Z" fill="#150c08" />
        {[
          [260, 862, 7], [420, 846, 4], [1120, 870, 6], [980, 850, 3], [620, 880, 5], [1210, 840, 3],
        ].map(([cx, cy, r], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={r * 2} ry={r} fill="#0f0806" />
        ))}
      </svg>

      {/* Poussière dans la lumière */}
      <div aria-hidden="true" className="absolute inset-0">
        {DUST.map(([cx, cy, r, d], i) => (
          <span
            key={i}
            className="gs-dust"
            style={{
              left: `${cx / 16}%`,
              top: `${cy / 9}%`,
              width: `${r * 2.2}px`,
              height: `${r * 2.2}px`,
              animationDelay: `${-d}s`,
            }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="gs-vignette absolute inset-0" />
    </div>
  )
}

/* --- Carrousel ------------------------------------------------------------
 * Diapositive centrale large, voisines visibles et atténuées de chaque côté,
 * pagination en pastille sous la scène. Défilement automatique suspendu au
 * survol, au focus clavier, sur demande (bouton pause) et si l'utilisateur
 * réduit les animations.
 */

export type StageSlide = {
  product: StageProduct
  name: string
  title: string
  detail: string
  href: string
  cta: string
}

const STEP_MS = 8000

export function GoldenStage({ slides }: { slides: StageSlide[] }) {
  const n = slides.length
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [reduced, setReduced] = useState(false)
  const prevRel = useRef<number[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const playing = !hover && !stopped && !reduced
  useEffect(() => {
    if (!playing || n < 2) return
    const t = window.setTimeout(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => window.clearTimeout(t)
  }, [playing, active, n])

  const go = (d: number) => setActive((i) => (i + d + n) % n)
  // Position relative à la diapositive active : -1 à gauche, 0 au centre, 1 à droite.
  const rel = slides.map((_, i) => {
    let r = (i - active + n) % n
    if (r > n / 2) r -= n
    return r
  })
  const jumped = rel.map((r, i) => prevRel.current[i] !== undefined && Math.abs(r - prevRel.current[i]) > 1)
  useEffect(() => {
    prevRel.current = rel
  })

  const current = slides[active]
  const pad = (x: number) => String(x).padStart(2, '0')

  return (
    <div
      className="gs-stage"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      aria-roledescription="carrousel"
      aria-label="Produits RESTART à l'heure dorée"
    >
      <div className="gs-track">
        {slides.map((s, i) => {
          const r = rel[i]
          const isActive = r === 0
          return (
            <div
              key={s.product}
              className={`gs-slide ${isActive ? 'is-active' : ''} ${jumped[i] ? 'no-anim' : ''}`}
              style={{ ['--rel' as string]: r }}
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${n} : ${s.name}`}
              aria-hidden={!isActive}
              onClick={isActive ? undefined : () => setActive(i)}
            >
              {/* Remonté à chaque activation : la poussée vers l'avant repart du début. */}
              <GoldenScene
                key={isActive ? `on-${active}` : 'off'}
                product={s.product}
                playing={isActive && playing}
                label={`${s.name} à l'heure dorée`}
              />
              {isActive && (
                <div className="gs-caption" key={`cap-${active}`}>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                      {pad(i + 1)} / {pad(n)} · {s.name}
                    </p>
                    <p className="mt-1 max-w-md text-balance text-base font-semibold leading-snug tracking-tight text-white sm:mt-1.5 sm:text-2xl">
                      {s.title}
                    </p>
                    <p className="mt-1 hidden text-sm text-[#ffd79e] sm:block">{s.detail}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="group inline-flex h-9 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold sm:h-10 text-[#141414] shadow-lg transition hover:bg-[#fff4e2]"
                  >
                    {s.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              )}
              {isActive && playing && (
                <span key={`bar-${active}`} aria-hidden="true" className="gs-progress" style={{ animationDuration: `${STEP_MS}ms` }} />
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Produit précédent" className="gs-btn">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <div className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 shadow-[var(--shadow-paper-sm)]">
          {slides.map((s, i) => (
            <button
              key={s.product}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir : ${s.name}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-foreground' : 'w-2 bg-foreground/25 hover:bg-foreground/45'}`}
            />
          ))}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-label={stopped ? 'Relancer le défilement' : 'Mettre le défilement en pause'}
            className="inline-flex size-5 items-center justify-center text-foreground/70 transition hover:text-foreground"
          >
            {stopped ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Produit suivant" className="gs-btn">
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {current?.name}
      </p>
    </div>
  )
}
