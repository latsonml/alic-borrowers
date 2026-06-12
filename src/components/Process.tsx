export default function Process() {
  return (
    <div className="panel" id="process">
      <section aria-label="The process">
        <div className="sec-head reveal">
          <span className="mono">02 — The process</span>
          <h2>Monday to Wednesday</h2>
        </div>
        <div className="tl reveal">
          <div className="tl-track" aria-hidden="true" />
          <div className="tl-fill" id="tl-fill" aria-hidden="true" />
          <div className="tl-stops">
            <div className="tl-stop done">
              <span className="tl-when">Mon · 9:12 am</span>
              <h3>Create your account</h3>
              <p>Name, business, contact. No documents to dig up, no PDFs to scan.</p>
              <span className="tl-dur">~2 min</span>
            </div>
            <div className="tl-stop done">
              <span className="tl-when">Mon · 9:15 am</span>
              <h3>Connect your bank</h3>
              <p>A secure, read-only link — we read your real cash flow, not just a credit score.</p>
              <span className="tl-dur">~3 min</span>
            </div>
            <div className="tl-stop done">
              <span className="tl-when">Mon · 9:22 am</span>
              <h3>Select your obligations</h3>
              <p>We detect the advances automatically. Tick the ones to retire and see your new payment instantly.</p>
              <span className="tl-dur">~5 min</span>
            </div>
            <div className="tl-stop">
              <span className="tl-when">Tue · 8:47 am</span>
              <h3>Get relief</h3>
              <p>We pay your funders directly. The daily debits stop; one smaller payment takes their place.</p>
              <span className="tl-dur">Next day</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
