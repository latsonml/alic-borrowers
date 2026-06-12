export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-mark">
          Alic<sup>®</sup>
        </span>
        <br />
        <span className="mono">© 2026 Alic Capital Management</span>
        <br />
        <br />
        <a
          className="mono"
          href="https://alicinvestments.com"
          style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          For investors →
        </a>
      </div>
      <p className="disclaimer">
        Savings figures describe completed restructuring plans to date and targets for new plans; your terms depend on
        your verified cash flow and are confirmed with you before any change takes effect. Checking your savings does
        not affect your credit. Commercial financing only — not consumer credit. Funded plans provide capital for you to
        pay your other lenders as part of each plan. Owner stories are composite examples representative of completed
        plans.
      </p>
    </footer>
  )
}
