'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'

const KEY = 'restart-consent'

/** Permet de consulter et de modifier son choix cookies depuis la page dédiée. */
export function ConsentReset() {
  const [state, setState] = useState<string | null>(null)

  useEffect(() => {
    try {
      setState(localStorage.getItem(KEY))
    } catch {
      setState(null)
    }
  }, [])

  const set = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? 'granted' : 'denied')
    } catch {
      /* ignore */
    }
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    })
    track('consent_update', { consent_state: granted ? 'granted' : 'denied' })
    setState(granted ? 'granted' : 'denied')
  }

  const labels: Record<string, string> = {
    granted: 'Vous avez accepté la mesure d’audience.',
    denied: 'Vous avez refusé la mesure d’audience. Aucun cookie analytique n’est déposé.',
  }

  return (
    <div className="rounded-card border border-line bg-surface-2 p-6 not-prose">
      <p className="text-sm text-chalk">
        {state ? labels[state] : 'Vous n’avez pas encore fait de choix.'}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => set(true)}
          className="rounded-lg bg-cyan px-4 py-2 text-sm font-semibold text-ink transition hover:bg-cyan/90"
        >
          Accepter la mesure d&apos;audience
        </button>
        <button
          onClick={() => set(false)}
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-fog transition hover:border-fog hover:text-chalk"
        >
          Refuser
        </button>
      </div>
    </div>
  )
}
