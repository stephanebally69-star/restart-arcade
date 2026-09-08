'use client'

import { useSearchParams } from 'next/navigation'
import { ContactForm } from '@/components/ContactForm'

/**
 * Récupère le `?produit=` posé par les fiches produit pour pré-remplir le
 * formulaire. Isolé dans son propre composant car `useSearchParams` impose
 * une frontière Suspense en export statique.
 */
export function ContactFormWithPreset() {
  const params = useSearchParams()
  return <ContactForm presetProduct={params.get('produit') ?? undefined} />
}
