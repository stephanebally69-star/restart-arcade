'use client'

type Params = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/** Pousse un évènement dans le dataLayer GA4. No-op côté serveur. */
export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/* --- Évènements e-commerce standards GA4 --------------------------------- */

export type TrackedItem = {
  item_id: string
  item_name: string
  item_category: string
  price?: number
  quantity?: number
}

export const viewItemList = (list: string, items: TrackedItem[]) =>
  track('view_item_list', { item_list_name: list, ecommerce: { items } })

export const selectItem = (list: string, item: TrackedItem) =>
  track('select_item', { item_list_name: list, ecommerce: { items: [item] } })

export const viewItem = (item: TrackedItem) =>
  track('view_item', { ecommerce: { currency: 'EUR', value: item.price ?? 0, items: [item] } })

export const generateLead = (params: Params) =>
  track('generate_lead', { currency: 'EUR', ...params })

export const contactClick = (method: 'phone' | 'email' | 'whatsapp', location: string) =>
  track('contact_click', { contact_method: method, link_location: location })

export const selectAudience = (audience: string, location: string) =>
  track('select_audience', { audience, link_location: location })

export const ctaClick = (label: string, location: string) =>
  track('cta_click', { cta_label: label, link_location: location })
