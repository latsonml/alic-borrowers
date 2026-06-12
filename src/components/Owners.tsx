import OwnersScene from './OwnersScene'

export default function Owners() {
  return (
    <div className="panel" id="owners">
      <section aria-label="What owners say">
        <div className="sec-head reveal">
          <span className="mono">06 — Owners</span>
          <h2>People who got their mornings back</h2>
        </div>

        <OwnersScene />

        <div className="quotes">
          <div className="quote quote--sand reveal">
            <span className="q-mark" aria-hidden="true">
              &quot;
            </span>
            <p>
              I was checking my balance before sunrise every day, doing math in the parking lot. Now one payment comes
              out on Wednesdays and I already know it clears.
            </p>
            <footer>
              <div className="q-who">
                <b>Marisol V.</b>
                <span>Bakery · Tampa, FL</span>
              </div>
              <span className="q-chip">−32% / wk</span>
            </footer>
          </div>
          <div className="quote quote--mint reveal">
            <span className="q-mark" aria-hidden="true">
              &quot;
            </span>
            <p>
              Three funders became one. The application took me twelve minutes between jobs, and the plan was funded the
              next morning. My foreman thought I was kidding.
            </p>
            <footer>
              <div className="q-who">
                <b>Dre W.</b>
                <span>HVAC contractor · Atlanta, GA</span>
              </div>
              <span className="q-chip">−28% / wk</span>
            </footer>
          </div>
          <div className="quote quote--rust reveal">
            <span className="q-mark" aria-hidden="true">
              &quot;
            </span>
            <p>
              Nobody had ever shown me the whole picture — what I owed, to whom, and when it would end. Alic put it on one
              page and then cut the payment by a third.
            </p>
            <footer>
              <div className="q-who">
                <b>Priya S.</b>
                <span>Med spa · Scottsdale, AZ</span>
              </div>
              <span className="q-chip">−34% / wk</span>
            </footer>
          </div>
        </div>
        <p className="quotes-note reveal">
          Composite examples representative of completed plans; names and details changed for privacy.
        </p>
      </section>
    </div>
  )
}
