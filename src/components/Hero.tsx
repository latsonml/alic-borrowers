import { APPLY_URL } from '../constants'
import Ticker from './Ticker'

export default function Hero() {
  return (
    <div className="panel hero" id="top">
      <span className="hero-eyebrow reveal-now">
        <i />
        10-minute application · Decision in a day
      </span>
      <h1 id="headline">
        <span className="line">
          <span>
            <span className="hero-hl">One lower payment</span>
          </span>
        </span>
        <span className="line">
          <span>for your business</span>
        </span>
      </h1>

      <div className="stage">
        <img id="coin" src="/coin.webp" alt="" />
        <div className="hero-assets-m">
          <div className="tag-box tag-pos float" aria-hidden="true">
            <div className="t-label">Relief plan 88-2104</div>
            <div className="t-body">
              Was&nbsp;&nbsp;<s>$10,000/wk</s>
              <br />
              Now&nbsp;&nbsp;$7,000/wk
            </div>
          </div>
          <div className="tag-box tag-remit float" aria-hidden="true">
            <div className="t-label">Turnaround</div>
            <div className="t-body">
              Applied&nbsp;Mon&nbsp;9:12am
              <br />
              Funded&nbsp;&nbsp;Tue&nbsp;8:47am
            </div>
          </div>
          <div className="pay-card float" aria-hidden="true">
            <div className="pay-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v14M12 18l-5.5-5.5M12 18l5.5-5.5" />
              </svg>
            </div>
            <div>
              <div className="pay-name">Payment reduced</div>
              <div className="pay-time">Riverside Bakery · today</div>
            </div>
            <div className="pay-amt">−$3,000/wk</div>
          </div>
        </div>
      </div>

      <p className="hero-sub">
        Stacked advances with daily debits are draining your cash flow. Alic replaces the pile with{' '}
        <strong>one payment that&apos;s at least 20% smaller</strong> — and we target 30% or more.
      </p>
      <div className="hero-actions">
        <a className="hero-cta" id="hero-cta" href={APPLY_URL}>
          Apply Today
          <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>
        <a className="hero-cta-secondary" href="#steps">
          See how it works
        </a>
      </div>
      <div className="hero-note">No credit impact · No obligation · Read-only bank connection</div>

      <Ticker />
    </div>
  )
}
