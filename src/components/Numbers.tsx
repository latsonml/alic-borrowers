export default function Numbers() {
  return (
    <div className="panel dark" id="numbers">
      <canvas id="contours" aria-hidden="true" />
      <section>
        <div className="sec-head reveal">
          <span className="mono">03 — The numbers</span>
          <h2>What businesses get</h2>
        </div>
        <div className="figures">
          <div className="fig reveal">
            <div className="num">
              <span className="count" data-target="30" data-decimals="0">
                0
              </span>
              <small>%+</small>
            </div>
            <div className="lbl">Minimum savings we target on your weekly payment</div>
          </div>
          <div className="fig reveal">
            <div className="num">
              <span className="count" data-target="100" data-decimals="0">
                0
              </span>
              <small>%</small>
            </div>
            <div className="lbl">Of completed plans reduced the payment — every single one</div>
          </div>
          <div className="fig reveal">
            <div className="num">
              <span className="count" data-target="10" data-decimals="0">
                0
              </span>
              <small>&nbsp;min</small>
            </div>
            <div className="lbl">To complete the application, start to finish</div>
          </div>
          <div className="fig reveal">
            <div className="num">
              <span className="count" data-target="1" data-decimals="0">
                0
              </span>
              <small>&nbsp;day</small>
            </div>
            <div className="lbl">Typical turnaround from application to funded relief</div>
          </div>
        </div>

        <div className="pledge reveal">
          <div className="pledge-item">
            <span className="mono">The floor</span>
            <p>
              If we can&apos;t cut your payment by <b>at least 20%</b>, we won&apos;t propose a plan. Ever.
            </p>
          </div>
          <div className="pledge-item">
            <span className="mono">The target</span>
            <p>
              Most plans land at <b>30% or more</b> — sized to what your verified cash flow can carry.
            </p>
          </div>
          <div className="pledge-item">
            <span className="mono">The record</span>
            <p>
              <b>100% of completed plans</b> reduced the payment. You see your exact number before you sign.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
