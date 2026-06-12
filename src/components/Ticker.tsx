const TICKER_ITEMS: [string, string][] = [
  ['Target savings', '30%+'],
  ['Floor', 'Every plan saves 20%+'],
  ['Success rate', '100% reduced'],
  ['Application', '10 minutes'],
  ['Decision', 'Within a day'],
  ['Bank link', 'Read-only & secure'],
  ['Payoffs', 'You pay your lenders'],
  ['Credit check', 'None to see savings'],
]

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track" id="ticker-track">
        {items.map(([label, value], i) => (
          <span className="ticker-item" key={i}>
            {label} <b>{value}</b>
          </span>
        ))}
      </div>
    </div>
  )
}
