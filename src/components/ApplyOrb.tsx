type ApplyOrbProps = {
  onClick: () => void
}

export default function ApplyOrb({ onClick }: ApplyOrbProps) {
  return (
    <button
      className="invest-orb"
      id="orb"
      type="button"
      aria-label="Lower my payment — start the application"
      onClick={onClick}
    >
      <span className="orb-label">
        Lower my
        <br />
        payment
      </span>
    </button>
  )
}
