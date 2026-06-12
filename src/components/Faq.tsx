export default function Faq() {
  return (
    <section id="faq">
      <div className="sec-head reveal">
        <span className="mono">07 — Questions</span>
        <h2>Asked every day</h2>
      </div>
      <div className="faq reveal">
        <details>
          <summary>
            Is this a new loan on top of my advances?<span className="plus">+</span>
          </summary>
          <div className="a">
            No. We <b>retire your existing obligations</b> — paying your funders directly — and replace them with one
            plan. Nothing is stacked on top; the pile is replaced, not added to.
          </div>
        </details>
        <details>
          <summary>
            Do my current funders get paid?<span className="plus">+</span>
          </summary>
          <div className="a">
            Yes, <b>directly and in full per the plan</b>. You don&apos;t have to make awkward calls or manage payoffs —
            we handle the payoff process with each funder as part of funding your relief.
          </div>
        </details>
        <details>
          <summary>
            Will checking my savings hurt my credit?<span className="plus">+</span>
          </summary>
          <div className="a">
            No. Seeing your number uses a <b>read-only bank connection</b> and no hard credit pull. We underwrite your
            real cash flow, not just a score.
          </div>
        </details>
        <details>
          <summary>
            How fast is this, really?<span className="plus">+</span>
          </summary>
          <div className="a">
            The application takes about <b>10 minutes</b>. Most decisions come back the same day, and the typical plan
            is <b>funded within a day</b> — daily debits stop as each obligation is retired.
          </div>
        </details>
        <details>
          <summary>
            What if you can&apos;t lower my payment?<span className="plus">+</span>
          </summary>
          <div className="a">
            Then we won&apos;t propose a plan — that&apos;s the <b>20% floor</b>. We only move forward when the math
            clearly works in your favor, which is why 100% of completed plans reduced the payment.
          </div>
        </details>
        <details>
          <summary>
            What do you need from me?<span className="plus">+</span>
          </summary>
          <div className="a">
            Ten minutes, a <b>secure read-only bank link</b>, and your selection of which obligations to retire. No
            document scavenger hunt, no PDFs, no notary.
          </div>
        </details>
      </div>
    </section>
  )
}
