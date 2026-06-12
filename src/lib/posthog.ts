import posthog from 'posthog-js'

const POSTHOG_KEY = 'phc_CbFWPbbpvXkQgDqWTxPjJ2LnMqzLWS5bBCnzvApQ3XxG'
const POSTHOG_HOST = 'https://us.i.posthog.com'

export function initPostHog() {
  if (typeof window === 'undefined' || posthog.__loaded) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: '2026-01-30',
  })
}

export { posthog }
