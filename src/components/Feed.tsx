export default function Feed() {
  return (
    <section id="feed">
      <div className="sec-head reveal">
        <span className="mono">01 — Before &amp; after</span>
        <h2>Your bank feed, fixed</h2>
      </div>
      <p className="feed-intro reveal">
        You know that feeling at 6am when the debits hit before your first sale does? <em>It stops.</em>
      </p>
      <div className="feed-grid">
        <div className="feed before reveal" aria-label="Bank feed before Alic: multiple daily debits">
          <div className="feed-head">
            <span className="mono">Operating account</span>
            <span className="feed-chip">Before — 4 advances</span>
          </div>
          <div className="feed-rows" id="rows-before">
            <div className="frow debit">
              <span className="f-when">Mon 06:02</span>
              <span className="f-desc">ADV*RAPIDFND DAILY</span>
              <span className="f-amt">−$540</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Mon 06:02</span>
              <span className="f-desc">ADV*MERCHCAP DAILY</span>
              <span className="f-amt">−$420</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Mon 06:03</span>
              <span className="f-desc">ADV*SWIFTADV DAILY</span>
              <span className="f-amt">−$610</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Mon 06:05</span>
              <span className="f-desc">ADV*CAPNOW DAILY</span>
              <span className="f-amt">−$430</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Tue 06:02</span>
              <span className="f-desc">ADV*RAPIDFND DAILY</span>
              <span className="f-amt">−$540</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Tue 06:02</span>
              <span className="f-desc">ADV*MERCHCAP DAILY</span>
              <span className="f-amt">−$420</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Tue 06:03</span>
              <span className="f-desc">ADV*SWIFTADV DAILY</span>
              <span className="f-amt">−$610</span>
            </div>
            <div className="frow debit">
              <span className="f-when">Tue 06:05</span>
              <span className="f-desc">ADV*CAPNOW DAILY</span>
              <span className="f-amt">−$430</span>
            </div>
            <div className="frow more">
              <span className="f-desc">⋯ and every business day, all week</span>
            </div>
          </div>
          <div className="feed-total">
            <span>20 debits / week</span>
            <b>−$10,000</b>
          </div>
        </div>

        <div className="feed after reveal" aria-label="Bank feed after Alic: one weekly payment, deposits stay">
          <div className="feed-head">
            <span className="mono">Operating account</span>
            <span className="feed-chip">After — one plan</span>
          </div>
          <div className="feed-rows" id="rows-after">
            <div className="frow credit">
              <span className="f-when">Mon 18:11</span>
              <span className="f-desc">POS BATCH DEPOSIT</span>
              <span className="f-amt">+$4,180</span>
            </div>
            <div className="frow credit">
              <span className="f-when">Tue 18:09</span>
              <span className="f-desc">POS BATCH DEPOSIT</span>
              <span className="f-amt">+$3,920</span>
            </div>
            <div className="frow alic">
              <span className="f-when">Wed 09:00</span>
              <span className="f-desc">ALIC WEEKLY PLAN</span>
              <span className="f-amt">−$7,000</span>
            </div>
            <div className="frow credit">
              <span className="f-when">Wed 18:12</span>
              <span className="f-desc">POS BATCH DEPOSIT</span>
              <span className="f-amt">+$4,470</span>
            </div>
            <div className="frow credit">
              <span className="f-when">Thu 18:08</span>
              <span className="f-desc">POS BATCH DEPOSIT</span>
              <span className="f-amt">+$4,050</span>
            </div>
            <div className="frow credit">
              <span className="f-when">Fri 18:10</span>
              <span className="f-desc">POS BATCH DEPOSIT</span>
              <span className="f-amt">+$5,140</span>
            </div>
          </div>
          <div className="feed-total">
            <span>1 debit / week</span>
            <b>−$7,000 · $3,000 kept</b>
          </div>
        </div>
      </div>
      <p className="feed-foot reveal">
        <b>Same week. Same revenue.</b> The only thing that changed is the structure of the debt: twenty scattered
        debits became one payment, 30% smaller — and your deposits finally get to sit in the account long enough to
        work for you.
      </p>
    </section>
  )
}
