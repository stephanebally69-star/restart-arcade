'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { site } from '@/lib/site'

/**
 * GA4 avec Consent Mode v2.
 *
 * Le tag est chargé dès la première visite mais démarre en `denied` : aucun cookie
 * n'est écrit tant que l'utilisateur n'a pas accepté. On garde ainsi la mesure
 * modélisée de Google tout en restant conforme. Le passage en `granted` est fait
 * par ConsentBanner via `gtag('consent', 'update', …)`.
 */
export function Analytics() {
  const pathname = usePathname()
  const firstLoad = useRef(true)

  // Le premier page_view est envoyé par la config du tag ; on n'envoie ensuite
  // que les navigations client, sinon la première vue est comptée deux fois.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'page_view', page_path: pathname })
  }, [pathname])

  if (!site.ga4Id) return null

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var stored = null;
          try { stored = localStorage.getItem('restart-consent'); } catch (e) {}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: stored === 'granted' ? 'granted' : 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('js', new Date());
        `}
      </Script>
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4Id}`}
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          gtag('config', '${site.ga4Id}', {
            send_page_view: true,
            currency: 'EUR',
            country: 'FR'
          });
        `}
      </Script>
    </>
  )
}
