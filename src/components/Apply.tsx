import { useCallback, useState, type FormEvent } from 'react'
import gsap from 'gsap'

const API_URL = import.meta.env.VITE_APPLY_API_URL || '/api/alic/apply-submit'

export default function Apply() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const data = new FormData(form)
    const payload = {
      business: String(data.get('business') || '').trim(),
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      weekly: String(data.get('weekly') || '').trim(),
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(result.error || 'Unable to submit your request. Please try again.')
      }

      setSubmittedName(payload.name)
      setSubmitted(true)
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const done = document.getElementById('form-done')
      if (done && !prefersReduced) {
        gsap.from(done, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [])

  return (
    <div className="panel invest" id="apply">
      <section>
        <div className="sec-head reveal">
          <span className="mono">08 — Apply</span>
          <h2>Ten minutes. That&apos;s it.</h2>
        </div>
        <div className="invest-grid">
          <div className="reveal">
            <h2 className="big">
              See your new payment <em>before you commit</em>.
            </h2>
            <p className="invest-sub">
              Start the application and you&apos;ll see your exact restructured payment before you sign anything.
              Checking your savings doesn&apos;t touch your credit and doesn&apos;t obligate you to proceed.
            </p>
          </div>
          {!submitted && (
            <form id="apply-form" className="reveal" noValidate onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="f-biz">Business name</label>
                <input
                  id="f-biz"
                  name="business"
                  type="text"
                  placeholder="Riverside Bakery LLC"
                  autoComplete="organization"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" name="name" type="text" placeholder="Jordan Ellis" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  placeholder="you@business.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="f-weekly">Current weekly payments, all advances</label>
                <select id="f-weekly" name="weekly" required defaultValue="">
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option>Under $5,000 / wk</option>
                  <option>$5,000 – $10,000 / wk</option>
                  <option>$10,000 – $25,000 / wk</option>
                  <option>$25,000+ / wk</option>
                </select>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="submit" type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Start my 10-minute application'}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </form>
          )}
          {submitted && (
            <div className="form-done" id="form-done" role="status" style={{ display: 'block' }}>
              <div className="form-done-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M7 14.5l4.5 4.5L21 9.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="mono">Application started</span>
              <h3 className="form-done-title">
                {submittedName ? `Thanks, ${submittedName.split(' ')[0]}.` : 'Thank you.'}
              </h3>
              <p className="form-done-lead">
                Check your inbox — we&apos;ve sent a secure link to connect your bank and pick the obligations to
                retire. Most owners finish in under ten minutes and hear back within a day.
              </p>
              <span className="mono form-done-steps-label">Next Steps</span>
              <ul className="form-done-steps">
                <li>Check your inbox for the secure bank connection link</li>
                <li>Connect your accounts and select obligations to retire</li>
                <li>No commitment required until you review your exact payment</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
