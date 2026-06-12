import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STATEMENT =
  'Small businesses send out payments every single day, but most owners are paying far more than they have to.'
const HIGHLIGHT_FROM = STATEMENT.indexOf('but most')
const WORDS = STATEMENT.split(' ')

/* Raw-data cards for phase 1: final resting position + the offset they fly in from (toward screen center). */
const RAW_CARDS = [
  {
    cls: 'left-[7%] top-[16%]',
    fx: '30vw',
    fy: '26vh',
    solid: true,
    lines: ['DAILY DEBIT 84781183', '−$486.00 · BEFORE 6AM'],
  },
  {
    cls: 'right-[8%] top-[20%] hidden sm:block',
    fx: '-30vw',
    fy: '22vh',
    solid: false,
    lines: ['► OBLIGATION 02', 'RENEWED · STACKED'],
  },
  {
    cls: 'left-[12%] bottom-[18%]',
    fx: '26vw',
    fy: '-24vh',
    solid: true,
    lines: ['DAILY DEBIT MG2832', '−$394.86 · EVERY BUSINESS DAY'],
  },
  {
    cls: 'right-[12%] bottom-[14%]',
    fx: '-26vw',
    fy: '-22vh',
    solid: false,
    lines: ['► CASH ON HAND', 'SHRINKING WEEKLY'],
  },
  {
    cls: 'left-[42%] top-[9%] hidden md:block',
    fx: '2vw',
    fy: '32vh',
    solid: true,
    lines: ['DAILY DEBIT JU2482', '−$360.00 · 2736 REMAINING'],
  },
]

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(17,20,27,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,20,27,.05) 1px,transparent 1px)',
  backgroundSize: '54px 54px',
}

export default function StatementScroll() {
  const rootRef = useRef<HTMLDivElement>(null)
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2Ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      /* Hide the mask paths fully until their draw step: dash/offset must use the
         real path length, since pathLength normalization breaks dash rendering
         on non-uniformly scaled SVGs and leaves stray dots visible. */
      const drawPaths = gsap.utils.toArray<SVGPathElement>('[data-draw]')
      drawPaths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      })

      if (prefersReduced) {
        gsap.set('[data-word]', { opacity: 1 })
        gsap.set(drawPaths, { strokeDashoffset: 0 })
        return
      }

      /* ---------- Phase 1: dark statement, scrubbed over its 300vh ---------- */
      const p1 = gsap.timeline({
        scrollTrigger: {
          trigger: phase1Ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      p1.to('[data-word]', { opacity: 1, stagger: 0.05, ease: 'none' }, 0)

      gsap.utils.toArray<HTMLElement>('[data-raw]').forEach((card, i) => {
        p1.from(
          card,
          {
            x: card.dataset.fx,
            y: card.dataset.fy,
            scale: 0.5,
            opacity: 0,
            ease: 'power2.out',
            duration: 0.9,
          },
          0.1 + i * 0.12,
        )
      })

      /* ---------- Phase 2: light mapping scene, scrubbed over its 300vh ---------- */
      const p2 = gsap.timeline({
        scrollTrigger: {
          trigger: phase2Ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      p2.from('[data-p2-title]', { opacity: 0, y: 32, duration: 0.6 }, 0)
        .from('[data-json]', { opacity: 0, x: -60, duration: 0.6, stagger: 0.2 }, 0.15)
        .to('[data-draw="1"]', { strokeDashoffset: 0, duration: 0.6, ease: 'none' }, 0.55)
        .to('[data-draw="2"]', { strokeDashoffset: 0, duration: 0.6, ease: 'none' }, 0.7)
        .from('[data-analysis]', { opacity: 0, y: 60, duration: 0.6 }, 0.8)
        .to('[data-draw="4"]', { strokeDashoffset: 0, duration: 0.5, ease: 'none' }, 0.95)
        .to('[data-draw="3"]', { strokeDashoffset: 0, duration: 0.6, ease: 'none' }, 1.2)
        .from('[data-restructure]', { opacity: 0, x: 60, duration: 0.6 }, 1.5)

      /* Dark nav treatment while phase 1 is under the fixed nav */
      ScrollTrigger.create({
        trigger: phase1Ref.current,
        start: 'top 72px',
        end: 'bottom 100%+=72px',
        onToggle: (self) => {
          document.getElementById('nav')?.classList.toggle('is-dark', self.isActive)
        },
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} id="statement" className="relative">
      {/* ================= PHASE 1 — dark ================= */}
      <div ref={phase1Ref} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#0D1430] px-6">
          {RAW_CARDS.map((card, i) => (
            <div
              key={i}
              data-raw
              data-fx={card.fx}
              data-fy={card.fy}
              className={`mono absolute z-0 rounded-md p-3 text-left leading-relaxed will-change-transform ${card.cls} ${
                card.solid
                  ? 'border border-[rgba(73,197,182,.28)] bg-[rgba(73,197,182,.14)] text-[#EEF2F9]'
                  : 'border border-dashed border-[rgba(73,197,182,.35)] text-[rgba(193,255,114,.75)]'
              }`}
            >
              {card.solid && (
                <span className="mr-2 inline-block h-3.5 w-3.5 translate-y-[2px] rounded-[3px] bg-[#C1FF72]" />
              )}
              {card.lines[0]}
              <br />
              {card.lines[1]}
            </div>
          ))}

          <h1 className="relative z-10 max-w-[21ch] text-center text-[clamp(34px,5vw,62px)] leading-[1.05] text-white">
            {WORDS.map((w, i) => {
              const pos = WORDS.slice(0, i).join(' ').length
              const teal = pos >= HIGHLIGHT_FROM - 1
              return (
                <span key={i}>
                  <span data-word className={`opacity-[.18] ${teal ? 'text-[#49C5B6]' : ''}`}>
                    {w}
                  </span>{' '}
                </span>
              )
            })}
          </h1>
        </div>
      </div>

      {/* ================= PHASE 2 — light ================= */}
      <div ref={phase2Ref} id="how" className="relative h-[300vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden bg-[#F5F7FB] px-6"
          style={GRID_BG}
        >
          {/* Connector lines (desktop only) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="ss-draw-1" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <path
                  data-draw="1"
                  d="M235 300 C330 470 380 640 470 765"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="14"
                />
              </mask>
              <mask id="ss-draw-2" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <path
                  data-draw="2"
                  d="M255 565 C330 640 390 700 465 775"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="14"
                />
              </mask>
              <mask id="ss-draw-3" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <path
                  data-draw="3"
                  d="M625 800 C700 720 720 540 750 440"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="14"
                />
              </mask>
              <mask id="ss-draw-4" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <path
                  data-draw="4"
                  d="M290 835 C330 855 350 865 380 880"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="14"
                />
              </mask>
            </defs>
            <path
              d="M235 300 C330 470 380 640 470 765"
              fill="none"
              stroke="#49C5B6"
              strokeOpacity=".6"
              strokeWidth="2"
              strokeDasharray="10 8"
              vectorEffect="non-scaling-stroke"
              mask="url(#ss-draw-1)"
            />
            <path
              d="M255 565 C330 640 390 700 465 775"
              fill="none"
              stroke="#49C5B6"
              strokeOpacity=".6"
              strokeWidth="2"
              strokeDasharray="10 8"
              vectorEffect="non-scaling-stroke"
              mask="url(#ss-draw-2)"
            />
            <path
              d="M625 800 C700 720 720 540 750 440"
              fill="none"
              stroke="#49C5B6"
              strokeOpacity=".6"
              strokeWidth="2"
              strokeDasharray="10 8"
              vectorEffect="non-scaling-stroke"
              mask="url(#ss-draw-3)"
            />
            <path
              d="M290 835 C330 855 350 865 380 880"
              fill="none"
              stroke="#49C5B6"
              strokeOpacity=".6"
              strokeWidth="2"
              strokeDasharray="10 8"
              vectorEffect="non-scaling-stroke"
              mask="url(#ss-draw-4)"
            />
          </svg>

          {/* Headline */}
          <div className="flex h-full flex-col items-center pt-[12vh] md:pt-[14vh]">
            <h2
              data-p2-title
              className="relative z-10 max-w-[24ch] text-center text-[clamp(28px,4.2vw,52px)] leading-[1.08] text-[#11141B]"
            >
              We map everything you owe, then restructure it into one payment your cash flow can actually carry.
            </h2>
          </div>

          {/* JSON blocks — existing repayments */}
          <div
            data-json
            className="mono absolute inset-x-4 top-[36%] mx-auto w-fit rounded-md border border-[rgba(17,20,27,.2)] bg-white p-4 text-left leading-[1.7] text-[rgba(17,20,27,.6)] shadow-[6px_6px_0_rgba(17,20,27,.05)] md:inset-x-auto md:left-[6%] md:top-[17%] md:mx-0"
          >
            ► OBLIGATION 01
            <br />
            {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;funder&quot;</span>: &quot;RapidFnd&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;debit&quot;</span>: &quot;$486 / day&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;remaining&quot;</span>: &quot;$38,400&quot;
            <br />
            {'}'}
          </div>
          <div
            data-json
            className="mono absolute left-[9%] top-[46%] hidden rounded-md border border-[rgba(17,20,27,.2)] bg-white p-4 text-left leading-[1.7] text-[rgba(17,20,27,.6)] shadow-[6px_6px_0_rgba(17,20,27,.05)] md:block"
          >
            ► OBLIGATION 02
            <br />
            {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;funder&quot;</span>: &quot;MerchCap&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;debit&quot;</span>: &quot;$394 / day&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;remaining&quot;</span>: &quot;$21,750&quot;
            <br />
            {'}'}
          </div>
          <div
            data-json
            className="mono absolute bottom-[8%] left-[7%] hidden rounded-md border border-[rgba(17,20,27,.2)] bg-white p-4 text-left leading-[1.7] text-[rgba(17,20,27,.6)] shadow-[6px_6px_0_rgba(17,20,27,.05)] md:block"
          >
            ► OBLIGATION 03
            <br />
            {'{'}
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;funder&quot;</span>: &quot;JetAdv&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;debit&quot;</span>: &quot;$360 / day&quot;,
            <br />
            &nbsp;&nbsp;<span className="text-[#49C5B6]">&quot;remaining&quot;</span>: &quot;$14,400&quot;
            <br />
            {'}'}
          </div>

          {/* Bottom-center consolidation analysis */}
          <div
            data-analysis
            className="absolute bottom-[5%] left-0 right-0 z-10 mx-auto w-[min(92%,380px)] rounded-2xl border border-[rgba(17,20,27,.08)] bg-white p-5 shadow-[0_22px_48px_-18px_rgba(17,20,27,.25)] md:bottom-[6%]"
          >
            <span className="mono block font-semibold text-[#49C5B6]">Consolidation analysis</span>
            <div className="mt-3 space-y-2 text-sm text-[rgba(17,20,27,.6)]">
              <div className="flex items-baseline justify-between">
                <span>Obligations mapped</span>
                <b className="text-[#11141B]">3 · $74,550</b>
              </div>
              <div className="flex items-baseline justify-between">
                <span>Current outflow</span>
                <b className="text-[#11141B]">$6,200 / wk</b>
              </div>
              <div className="flex items-baseline justify-between border-t border-dashed border-[rgba(17,20,27,.2)] pt-2">
                <span>One restructured payment</span>
                <b className="text-[#11141B]">$3,975 / wk</b>
              </div>
            </div>
          </div>

          {/* Right-side restructure card */}
          <div
            data-restructure
            className="absolute right-4 top-[58%] z-10 w-60 rounded-2xl border-[1.5px] border-[#49C5B6] bg-white p-5 shadow-[0_22px_48px_-18px_rgba(17,20,27,.25)] md:right-[6%] md:top-[34%] md:w-64"
          >
            <span className="mono block font-semibold text-[#49C5B6]">Restructure</span>
            <div className="mt-3 text-sm text-[rgba(17,20,27,.6)]">
              Was <s>$6,200 / wk</s>
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-[#11141B]">$3,975 / wk</div>
            <span className="mono mt-3 inline-block rounded-md bg-[#C1FF72] px-2.5 py-1.5 font-semibold text-[#11141B]">
              −36% every week
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
