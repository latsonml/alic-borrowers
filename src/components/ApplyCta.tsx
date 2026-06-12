import { APPLY_URL } from '../constants'

export default function ApplyCta() {
  return (
    <div className="panel" id="apply">
      <section className="cta-section reveal" aria-labelledby="cta-heading">
        <div className="cta-eyebrow-row">
          <span className="cta-eyebrow">08 — Apply</span>
          <span className="cta-eyebrow">
            <b>Ten minutes.</b> That&apos;s it.
          </span>
        </div>

        <div className="cta-inner">
          <div>
            <h2 id="cta-heading" className="cta-heading">
              See your new payment <span className="cta-accent">before you commit.</span>
            </h2>
            <p className="cta-sub">
              Start the application and you&apos;ll see your exact restructured payment before you sign anything.
              Checking your savings doesn&apos;t touch your credit and doesn&apos;t obligate you to proceed.
            </p>
            <div className="cta-actions">
              <a className="cta-btn" href={APPLY_URL}>
                Apply today <span className="cta-arrow">→</span>
              </a>
              <p className="cta-reassure">
                <span>✓</span>
                No credit impact
                <br />
                <span>✓</span>
                No obligation
              </p>
            </div>
          </div>

          <aside className="cta-preview" aria-label="Example payment preview">
            <div className="cta-preview-label">
              <span className="cta-preview-live">Your payment preview</span>
              <span>Example</span>
            </div>
            <div className="cta-row">
              <span className="cta-k">Current weekly</span>
              <span className="cta-v cta-v-old">$4,820</span>
            </div>
            <div className="cta-row cta-row-new">
              <span className="cta-k">Restructured</span>
              <span className="cta-v">$2,150</span>
            </div>
            <div className="cta-delta">
              <span className="cta-pill">−55% / week</span>
              <span className="cta-note">Shown before signing</span>
            </div>
            <p className="cta-preview-foot">
              Composite example representative of completed plans. Your terms depend on your verified cash flow.
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
