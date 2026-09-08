'use client'

import { useEffect } from 'react'
import { viewItem, type TrackedItem } from '@/lib/analytics'

/** Déclenche le `view_item` GA4 au montage d'une fiche produit. */
export function ViewItem({ item }: { item: TrackedItem }) {
  useEffect(() => {
    viewItem(item)
    // On ne suit que l'identifiant : l'objet est recréé à chaque rendu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.item_id])

  return null
}
