import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function drawContours() {
  const c = document.getElementById('contours') as HTMLCanvasElement | null
  if (!c) return
  const ctx = c.getContext('2d')
  if (!ctx || !c.parentElement) return

  const rect = c.parentElement.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.width = rect.width * dpr
  c.height = rect.height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const cx = rect.width * 0.82
  const cy = rect.height * 0.2
  const rings = 26
  const SEG = 140

  for (let r = 0; r < rings; r++) {
    const base = 50 + r * 34
    ctx.beginPath()
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2
      const wob =
        Math.sin(a * 3 + r * 0.9) * (7 + r * 1.6) + Math.sin(a * 7 + r * 1.7) * (4 + r * 0.7)
      const rad = base + wob
      const x = cx + Math.cos(a) * rad
      const y = cy + Math.sin(a) * rad * 0.85
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = `rgba(143,169,247,${0.16 - r * 0.0045})`
    ctx.lineWidth = 1
    ctx.stroke()
  }
}

export function useBorrowerAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const ctx = gsap.context(() => {
      const track = document.getElementById('ticker-track')
      if (track && !prefersReduced) {
        gsap.to(track, { x: -track.scrollWidth / 3, duration: 44, ease: 'none', repeat: -1 })
      }

      if (!prefersReduced) {
        gsap.to('#headline .line > span', {
          y: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.15,
        })
        gsap.from('.hero-eyebrow, .hero-sub, .hero-cta, .hero-note', {
          opacity: 0,
          y: 16,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.08,
          delay: 0.55,
        })
        gsap.from('.tag-box, .pay-card', {
          opacity: 0,
          y: 26,
          scale: 0.97,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.8,
        })
        document.querySelectorAll('.float').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 9 : -9,
            duration: 2.8 + i * 0.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.8,
          })
        })
        const coin = document.getElementById('coin')
        if (coin) {
          gsap.from(coin, { opacity: 0, y: 34, scale: 0.97, duration: 1.3, ease: 'power3.out', delay: 0.45 })
          gsap.to(coin, { y: 14, duration: 4.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.9 })
          gsap.to(coin, { rotation: 1.2, duration: 6.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.9 })
        }
      } else {
        document.querySelectorAll('#headline .line > span').forEach((el) => {
          ;(el as HTMLElement).style.transform = 'none'
        })
      }

      if (!prefersReduced) {
        document.querySelectorAll('.reveal').forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          })
        })
      } else {
        document.querySelectorAll('.reveal').forEach((el) => {
          const node = el as HTMLElement
          node.style.opacity = '1'
          node.style.transform = 'none'
        })
      }

      if (!prefersReduced) {
        ;['#rows-before .frow', '#rows-after .frow'].forEach((sel, idx) => {
          gsap.from(sel, {
            opacity: 0,
            x: idx === 0 ? -14 : 14,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: sel.split(' ')[0], start: 'top 78%' },
          })
        })
      }

      const stmt = document.getElementById('stmtText')
      if (stmt && !prefersReduced) {
        const text = stmt.textContent || ''
        const acidFrom = text.indexOf('but most')
        stmt.innerHTML = text
          .split(' ')
          .map((w, i, arr) => {
            const pos = arr.slice(0, i).join(' ').length
            const acid = pos >= acidFrom - 1
            return `<span class="w" style="${acid ? 'color:var(--spring)' : ''}">${w}</span>`
          })
          .join(' ')
        gsap.to(stmt.querySelectorAll('.w'), {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: '#statement', start: 'top 65%', end: 'center 45%', scrub: true },
        })
        document.querySelectorAll('#statement .fchip').forEach((c, i) => {
          gsap.fromTo(
            c,
            { y: 40 + i * 14 },
            {
              y: -(40 + i * 10),
              ease: 'none',
              scrollTrigger: { trigger: '#statement', start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      }

      if (!prefersReduced) {
        const isMobile = window.matchMedia('(max-width:860px)').matches
        gsap.from('#tl-fill', {
          scaleX: isMobile ? 1 : 0,
          scaleY: isMobile ? 0 : 1,
          duration: 1.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.tl', start: 'top 75%' },
        })
        gsap.from('.tl-stop', {
          opacity: 0,
          y: 18,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.28,
          scrollTrigger: { trigger: '.tl', start: 'top 75%' },
        })
      }

      ScrollTrigger.create({
        trigger: '#numbers',
        start: 'top 72px',
        end: 'bottom 72px',
        onToggle: (self) => {
          document.getElementById('nav')?.classList.toggle('is-dark', self.isActive)
        },
      })

      document.querySelectorAll('.count').forEach((el) => {
        const node = el as HTMLElement
        const target = parseFloat(node.dataset.target || '0')
        const dec = parseInt(node.dataset.decimals || '0', 10) || 0
        const setFinal = () => {
          node.textContent = target.toLocaleString('en-US', {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          })
        }
        if (!prefersReduced) {
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onUpdate: () => {
              node.textContent = obj.v.toLocaleString('en-US', {
                minimumFractionDigits: dec,
                maximumFractionDigits: dec,
              })
            },
            onComplete: setFinal,
          })
        } else {
          setFinal()
        }
      })

      const steps = gsap.utils.toArray<HTMLElement>('.path-step')
      const arts = gsap.utils.toArray<HTMLImageElement>('.step-art img')
      const tag = document.getElementById('artTag')
      const labels = ['[CREATE ACCOUNT]', '[CONNECT BANK ACCOUNTS]', '[SELECT OBLIGATIONS]', '[GET RELIEF]']
      const activate = (i: number) => {
        steps.forEach((s, j) => s.classList.toggle('active', j === i))
        arts.forEach((a, j) => a.classList.toggle('show', j === i))
        if (tag) tag.textContent = labels[i]
      }
      if (!prefersReduced) {
        steps.forEach((s, i) => {
          ScrollTrigger.create({
            trigger: s,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => activate(i),
            onEnterBack: () => activate(i),
          })
        })
      }
    })

    const orb = document.getElementById('orb')
    let qx: gsap.QuickToFunc | undefined
    let qy: gsap.QuickToFunc | undefined
    let qs: gsap.QuickToFunc | undefined

    const onPointerMove = (e: PointerEvent) => {
      if (!orb || !qx || !qy || !qs) return
      const r = orb.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      const radius = 180
      if (dist < radius) {
        const pull = (1 - dist / radius) * 0.35
        qx(dx * pull)
        qy(dy * pull)
        qs(1.06)
      } else {
        qx(0)
        qy(0)
        qs(1)
      }
    }

    if (!prefersReduced && fineMouse && orb) {
      qx = gsap.quickTo(orb, 'x', { duration: 0.4, ease: 'power3.out' })
      qy = gsap.quickTo(orb, 'y', { duration: 0.4, ease: 'power3.out' })
      qs = gsap.quickTo(orb, 'scale', { duration: 0.35, ease: 'power2.out' })
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    drawContours()
    window.addEventListener('resize', drawContours)

    return () => {
      ctx.revert()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', drawContours)
    }
  }, [])
}
