export default function Steps() {
  return (
    <div className="steps-outer" id="steps">
      <section className="steps">
        <h2 className="reveal">A simple path to a lower payment</h2>
        <div className="steps-grid">
          <div className="step-list">
            <div className="path-step active" data-step="0">
              <div className="tag">[01 · TWO MINUTES]</div>
              <h4>Create your account</h4>
              <p>Tell us about your business. Name, basics, done — no documents needed to start.</p>
            </div>
            <div className="path-step" data-step="1">
              <div className="tag">[02 · SECURE CONNECTION]</div>
              <h4>Connect your bank accounts</h4>
              <p>Link your accounts through a secure, read-only connection so we can see your real payments and cash flow.</p>
            </div>
            <div className="path-step" data-step="2">
              <div className="tag">[03 · YOU CHOOSE]</div>
              <h4>Select your obligations</h4>
              <p>We surface every payment leaving your account. You pick which ones you want restructured.</p>
            </div>
            <div className="path-step" data-step="3">
              <div className="tag">[04 · ABOUT A DAY]</div>
              <h4>Get relief</h4>
              <p>Your daily payments stop, and one lower payment takes their place — typically 30% less than before.</p>
            </div>
          </div>
          <div className="step-art" aria-hidden="true">
            <img src="/step-1.webp" alt="" className="show" />
            <img src="/step-2.webp" alt="" />
            <img src="/step-3.webp" alt="" />
            <img src="/step-4.webp" alt="" />
            <div className="tagline" id="artTag">
              [CREATE ACCOUNT]
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
