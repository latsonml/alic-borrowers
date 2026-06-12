import type posthogJs from 'posthog-js'

const POSTHOG_KEY = 'phc_CbFWPbbpvXkQgDqWTxPjJ2LnMqzLWS5bBCnzvApQ3XxG'
const POSTHOG_HOST = 'https://us.i.posthog.com'

let posthog: typeof posthogJs | null = null

export async function initPostHog() {
  if (typeof window === 'undefined') return

  const mod = await import('posthog-js')
  posthog = mod.default

  if (posthog.__loaded) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: '2026-01-30',
  })
}

export function getPostHog() {
  return posthog
}
