export default function Nav() {
  return (
    <header className="nav" id="nav">
      <a className="brand" href="#top" aria-label="Alic — home">
        <span className="brand-mark">
          Alic<sup>®</sup>
        </span>
        <span className="brand-tag">For Business</span>
      </a>
      <nav className="nav-links" aria-label="Main">
        <a href="#feed">feed</a>
        <a href="#process">process</a>
        <a href="#savings">savings</a>
        <a href="#apply">apply</a>
        <a className="nav-pill" href="#apply">
          Check my savings
        </a>
      </nav>
    </header>
  )
}
