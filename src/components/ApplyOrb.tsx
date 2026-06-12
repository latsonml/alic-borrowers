import { APPLY_URL } from '../constants'

export default function ApplyOrb() {
  return (
    <button
      className="invest-orb"
      id="orb"
      type="button"
      aria-label="Lower my payment — apply today"
      onClick={() => {
        window.location.href = APPLY_URL
      }}
    >
      <span className="orb-label">
        Lower my
        <br />
        payment
      </span>
    </button>
  )
}
