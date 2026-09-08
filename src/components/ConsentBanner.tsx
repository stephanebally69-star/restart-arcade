'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'

const KEY = 'restart-consent'

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch {
      // navigation privée ou stockage bloqué : on n'affiche rien plutôt que de boucler
    }
  }, [])

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? 'granted' : 'denied')
    } catch {
      /* ignore */
    }
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
    track('consent_update', { consent_state: granted ? 'granted' : 'denied' })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-surface-2/95 p-4 shadow-2xl backdrop-blur sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-fog">
          Nous utilisons des cookies de mesure d&apos;audience pour comprendre quelles pages sont
          utiles. Rien n&apos;est déposé avant votre accord.{' '}
          <Link href="/politique-de-cookies/" className="text-cyan underline underline-offset-2">
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide(false)}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fog transition hover:border-fog hover:text-chalk"
          >
            Refuser
          </button>
          <button
            onClick={() => decide(true)}
            className="rounded-lg bg-cyan px-4 py-2 text-sm font-semibold text-ink transition hover:bg-cyan/90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
