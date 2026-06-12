import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STEPS = [
  {
    tag: '[01 · TWO MINUTES]',
    title: 'Create your account',
    body: 'Tell us about your business. Name, basics, done — no documents needed to start.',
    art: '/step-1.webp',
    label: '[CREATE ACCOUNT]',
  },
  {
    tag: '[02 · SECURE CONNECTION]',
    title: 'Connect your bank accounts',
    body: 'Link your accounts through a secure, read-only connection so we can see your real payments and cash flow.',
    art: '/step-2.webp',
    label: '[CONNECT BANK ACCOUNTS]',
  },
  {
    tag: '[03 · YOU CHOOSE]',
    title: 'Select your obligations',
    body: 'We surface every payment leaving your account. You pick which ones you want restructured.',
    art: '/step-3.webp',
    label: '[SELECT OBLIGATIONS]',
  },
  {
    tag: '[04 · ABOUT A DAY]',
    title: 'Get relief',
    body: 'Your daily payments stop, and one lower payment takes their place — typically 30% less than before.',
    art: '/step-4.webp',
    label: '[GET RELIEF]',
  },
]

export default function Steps() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const rows = gsap.utils.toArray<HTMLElement>('[data-step-row]')
      const arts = gsap.utils.toArray<HTMLElement>('[data-step-art]')
      const labels = gsap.utils.toArray<HTMLElement>('[data-step-label]')
      const dots = gsap.utils.toArray<HTMLElement>('[data-step-dot]')

      if (prefersReduced) {
        gsap.set(rows, { opacity: 1 })
        gsap.set(arts[0], { opacity: 1 })
        gsap.set(labels[0], { opacity: 1 })
        return
      }

      /* Initial state: step 0 active */
      gsap.set(rows, { opacity: 0.32 })
      gsap.set(rows[0], { opacity: 1 })
      gsap.set(arts, { opacity: 0, scale: 0.96, yPercent: 4 })
      gsap.set(arts[0], { opacity: 1, scale: 1, yPercent: 0 })
      gsap.set(labels, { opacity: 0, y: 8 })
      gsap.set(labels[0], { opacity: 1, y: 0 })
      gsap.set(dots, { scaleX: 0 })
      gsap.set(dots[0], { scaleX: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      /* Each step owns 1 timeline unit; transitions happen at unit boundaries. */
      for (let i = 1; i < STEPS.length; i++) {
        const at = i

        tl.to(rows[i - 1], { opacity: 0.32, duration: 0.35, ease: 'none' }, at)
          .to(rows[i], { opacity: 1, duration: 0.35, ease: 'none' }, at)
          .to(arts[i - 1], { opacity: 0, scale: 0.96, yPercent: -4, duration: 0.35, ease: 'none' }, at)
          .to(arts[i], { opacity: 1, scale: 1, yPercent: 0, duration: 0.35, ease: 'none' }, at)
          .to(labels[i - 1], { opacity: 0, y: -8, duration: 0.25, ease: 'none' }, at)
          .to(labels[i], { opacity: 1, y: 0, duration: 0.25, ease: 'none' }, at + 0.1)
          .to(dots[i], { scaleX: 1, duration: 0.3, ease: 'none' }, at)
      }

      /* Pad the end so the last step holds for its full unit before unpinning. */
      tl.to({}, { duration: 1 })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} id="steps" className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-white px-6 pt-[calc(64px+2vh)] pb-[3vh] md:px-[6%] md:pt-[calc(72px+4vh)] md:pb-[5vh]">
        <h2 className="mx-auto max-w-[18ch] text-center text-[clamp(24px,4.4vw,56px)] leading-[1.05] tracking-tight text-[#11141B]">
          A simple path to a lower payment
        </h2>

        {/* Progress dots */}
        <div className="mx-auto mt-4 flex w-[min(320px,60%)] gap-2 md:mt-6" aria-hidden="true">
          {STEPS.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-[rgba(17,20,27,.12)]">
              <div data-step-dot className="h-full w-full origin-left rounded-full bg-[#49C5B6]" />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-[2.5vh] grid w-full max-w-[1080px] flex-1 grid-cols-1 items-center gap-3 md:mt-[4vh] md:grid-cols-[1fr_420px] md:gap-16">
          {/* Step list */}
          <div className="order-2 flex flex-col md:order-1">
            {STEPS.map((step, i) => (
              <div
                key={i}
                data-step-row
                className={`border-t border-dashed border-[rgba(17,20,27,.25)] px-1 py-[clamp(6px,1.2vh,12px)] md:py-[clamp(12px,2.4vh,26px)] ${
                  i === STEPS.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="mono tracking-[.14em] text-[rgba(17,20,27,.6)]">
                  <span className="text-[#11141B]">► </span>
                  {step.tag}
                </div>
                <h4 className="mt-1 mb-1 text-base font-semibold tracking-tight text-[#11141B] md:mt-2 md:mb-1.5 md:text-[clamp(17px,2vh,22px)]">
                  {step.title}
                </h4>
                <p className="max-w-[38ch] text-[13px] leading-snug text-[rgba(17,20,27,.6)] md:text-sm md:leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Artwork */}
          <div
            className="relative order-1 flex h-[16vh] items-center justify-center md:order-2 md:h-[52vh]"
            aria-hidden="true"
          >
            {STEPS.map((step, i) => (
              <img
                key={i}
                data-step-art
                src={step.art}
                alt=""
                className="absolute max-h-full max-w-[86%] will-change-transform"
              />
            ))}
            <div className="absolute inset-x-0 -bottom-6 hidden md:block">
              {STEPS.map((step, i) => (
                <span
                  key={i}
                  data-step-label
                  className="mono absolute left-1/2 -translate-x-1/2 whitespace-nowrap tracking-[.14em] text-[rgba(17,20,27,.6)]"
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
