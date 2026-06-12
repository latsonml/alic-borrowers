import { APPLY_URL } from '../constants'

export default function ApplyOrb() {
  return (
    <a
      className="invest-orb"
      id="orb"
      href={APPLY_URL}
      aria-label="Lower my payment — apply today"
    >
      <span className="orb-label">
        Lower my
        <br />
        payment
      </span>
    </a>
  )
}
