import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactFormWithPreset } from '@/components/ContactFormWithPreset'
import { Breadcrumbs, Eyebrow, Faq, JsonLd, Section } from '@/components/ui'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact et devis gratuit sous 48 h',
  description:
    "Décrivez votre projet d'aménagement : borne d'arcade, fléchettes, baby-foot, billard ou flipper. Devis gratuit sous 48 h. RESTART, Villette-d'Anthon (38280), près de Lyon.",
  alternates: { canonical: '/contact/' },
}

const faq = [
  {
    q: 'Sous quel délai recevrai-je une réponse ?',
    a: 'Sous 48 heures ouvrées. Si votre projet est urgent, appelez directement le 06 67 44 36 02 : nous cadrons le besoin en quelques minutes au téléphone.',
  },
  {
    q: 'Le devis est-il payant ou engageant ?',
    a: "Ni l'un ni l'autre. Le devis et l'audit de vos espaces sont gratuits et sans engagement, y compris si nous nous déplaçons.",
  },
  {
    q: 'Intervenez-vous en dehors de la région lyonnaise ?',
    a: "Oui, nous livrons et installons partout en France métropolitaine. Notre atelier est à Villette-d'Anthon (38280), ce qui nous permet simplement d'être plus réactifs sur Lyon, Grenoble et Saint-Étienne.",
  },
]

export default function ContactPage() {
  return (
    <>
      <Section className="pb-8">
        <Breadcrumbs items={[{ href: '/contact/', label: 'Contact' }]} />
        <Eyebrow>Parlons de votre projet</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl sm:text-5xl">
          Un devis gratuit, sous 48 heures
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fog">
          Dites-nous où vous voulez installer et ce que vous imaginez. Même flou, même sans budget
          arrêté — c&apos;est justement le moment où on est le plus utile.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="card p-6 sm:p-8">
            <Suspense fallback={<p className="text-sm text-fog">Chargement du formulaire…</p>}>
              <ContactFormWithPreset />
            </Suspense>
          </div>

          <aside className="space-y-8">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold">Nous joindre directement</h2>
              <address className="mt-4 space-y-3 text-sm not-italic text-fog">
                <p>
                  <a href={`tel:${site.phoneE164}`} className="text-chalk hover:text-cyan">
                    {site.phone}
                  </a>
                  <br />
                  Du lundi au vendredi, 9 h – 18 h
                </p>
                <p>
                  <a href={`mailto:${site.email}`} className="text-chalk hover:text-cyan">
                    {site.email}
                  </a>
                </p>
                <p>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chalk hover:text-cyan"
                  >
                    WhatsApp
                  </a>
                </p>
              </address>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold">Notre atelier</h2>
              <address className="mt-4 text-sm not-italic text-fog">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                {site.address.region}
              </address>
              <p className="mt-4 text-sm text-fog">
                Visite possible sur rendez-vous pour essayer les équipements avant de choisir.
              </p>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-bold">Ce qu&apos;on vous enverra</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-fog">
                {[
                  'Une proposition chiffrée, options comprises',
                  'Un visuel de personnalisation si vous en voulez une',
                  'Le délai réel de livraison et d’installation',
                  'Les deux formules : achat et location',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0 text-cyan" aria-hidden="true">
                      ✦
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <div className="border-t border-line-soft bg-surface">
        <Section>
          <div className="max-w-3xl">
            <Faq items={faq} />
          </div>
        </Section>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${site.url}/contact/`,
          name: 'Contact RESTART',
          mainEntity: { '@id': `${site.url}/#localbusiness` },
        }}
      />
    </>
  )
}
