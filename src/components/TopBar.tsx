import Link from 'next/link'

/** Bandeau marine au-dessus de l'en-tête, comme celui des promotions de poltronesofa.com. */
export function TopBar() {
  return (
    <div className="bg-[#283444] px-4 py-2 text-center">
      <Link
        href="/contact/"
        className="text-[12px] font-bold uppercase leading-[15px] tracking-[0.02em] text-[#fffdfc] hover:underline"
      >
        Devis gratuit sous 48 heures : livré monté et installé partout en France
      </Link>
    </div>
  )
}
