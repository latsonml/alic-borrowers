import { useEffect } from 'react'

const fmt$ = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

function paintTrack(input: HTMLInputElement) {
  const pct = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100
  input.style.setProperty('--fill', pct + '%')
}

export default function Savings() {
  useEffect(() => {
    const sPay = document.getElementById('s-pay') as HTMLInputElement | null
    const sSave = document.getElementById('s-save') as HTMLInputElement | null
    if (!sPay || !sSave) return

    const calc = () => {
      const P = parseInt(sPay.value, 10)
      const s = parseInt(sSave.value, 10) / 100
      const newPay = P * (1 - s)
      const keepWk = P * s
      const keepMo = (keepWk * 52) / 12
      const keepYr = keepWk * 52

      const vPay = document.getElementById('v-pay')
      const vSave = document.getElementById('v-save')
      const oNew = document.getElementById('o-new')
      const oWeek = document.getElementById('o-week')
      const oMonth = document.getElementById('o-month')
      const oYear = document.getElementById('o-year')
      const oPct = document.getElementById('o-pct')
      const barNew = document.getElementById('bar-new')

      if (vPay) vPay.textContent = fmt$(P)
      if (vSave) vSave.textContent = Math.round(s * 100) + '%'
      if (oNew) oNew.textContent = fmt$(Math.round(newPay))
      if (oWeek) oWeek.textContent = fmt$(Math.round(keepWk))
      if (oMonth) oMonth.textContent = fmt$(Math.round(keepMo))
      if (oYear) oYear.textContent = fmt$(Math.round(keepYr))
      if (oPct) oPct.textContent = Math.round(s * 100) + '%'
      if (barNew) barNew.style.width = (1 - s) * 100 + '%'

      paintTrack(sPay)
      paintTrack(sSave)
    }

    sPay.addEventListener('input', calc)
    sSave.addEventListener('input', calc)
    calc()

    return () => {
      sPay.removeEventListener('input', calc)
      sSave.removeEventListener('input', calc)
    }
  }, [])

  return (
    <div className="panel" id="savings">
      <section aria-label="Savings calculator">
        <div className="sec-head reveal">
          <span className="mono">04 — Run your own numbers</span>
          <h2>What would you keep?</h2>
        </div>

        <div className="calc-grid reveal">
          <div className="calc-controls">
            <div className="ctl">
              <div className="ctl-row">
                <span className="mono">Your weekly payments today</span>
                <span className="ctl-val" id="v-pay">
                  $10,000
                </span>
              </div>
              <input
                type="range"
                id="s-pay"
                min="2500"
                max="50000"
                step="500"
                defaultValue="10000"
                aria-label="Your total weekly debt payments today, in dollars"
              />
              <p className="ctl-cap">Everything your advances debit in a typical week, added up across all of them.</p>
            </div>
            <div className="ctl">
              <div className="ctl-row">
                <span className="mono">Payment reduction</span>
                <span className="ctl-val" id="v-save">
                  30%
                </span>
              </div>
              <input
                type="range"
                id="s-save"
                min="20"
                max="40"
                step="1"
                defaultValue="30"
                aria-label="Payment reduction percentage"
              />
              <p className="ctl-cap">
                Every plan saves at least 20%. We target 30% or more — your exact number depends on your cash flow.
              </p>
            </div>
            <div className="calc-basis">
              Floor — every plan saves 20%+
              <br />
              Target — 30%+ payment reduction
              <br />
              100% of completed plans reduced the payment
            </div>
          </div>

          <div className="calc-outs">
            <div className="out hero-out">
              <div className="o-label">Your new payment</div>
              <div className="o-num">
                <span id="o-new">$7,000</span>
                <small>/wk</small>
              </div>
              <p className="o-sub">one payment, on a schedule your revenue can carry</p>
              <div className="bars" aria-hidden="true">
                <div className="bar-row">
                  <span className="mono" style={{ color: 'rgba(238,242,249,.6)' }}>
                    old
                  </span>
                  <div className="bar" style={{ background: 'rgba(238,242,249,.18)' }}>
                    <i style={{ background: 'rgba(238,242,249,.55)', width: '100%' }}></i>
                  </div>
                </div>
                <div className="bar-row">
                  <span className="mono" style={{ color: 'rgba(238,242,249,.6)' }}>
                    new
                  </span>
                  <div className="bar" style={{ background: 'rgba(238,242,249,.18)' }}>
                    <i id="bar-new" style={{ background: '#FFFFFF', width: '70%' }}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="out">
              <div className="o-label">Back in your pocket</div>
              <div className="o-num">
                <span id="o-week">$3,000</span>
                <small>/wk</small>
              </div>
              <p className="o-sub">
                cash that stays in the business <b>every week</b>, starting day one
              </p>
            </div>
            <div className="out">
              <div className="o-label">Kept per month</div>
              <div className="o-num">
                <span id="o-month">$13,000</span>
              </div>
              <p className="o-sub">enough to cover payroll gaps, inventory, or just sleep at night</p>
            </div>
            <div className="out">
              <div className="o-label">Kept per year</div>
              <div className="o-num">
                <span id="o-year">$156,000</span>
              </div>
              <p className="o-sub">
                at this rate over a full year — <b id="o-pct">30%</b> off every payment, with one funder instead of four
              </p>
            </div>
          </div>
        </div>
        <p className="calc-disc reveal">
          Illustrative estimate based on the reduction you select. Your actual plan is sized to your verified cash flow
          during the application and confirmed before anything changes.
        </p>
      </section>
    </div>
  )
}
