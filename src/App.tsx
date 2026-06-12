import { useCallback } from 'react'
import Rail from './components/Rail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Feed from './components/Feed'
import DarkStatement from './components/DarkStatement'
import LightStatement from './components/LightStatement'
import Process from './components/Process'
import Steps from './components/Steps'
import Numbers from './components/Numbers'
import Savings from './components/Savings'
import Compare from './components/Compare'
import Owners from './components/Owners'
import Faq from './components/Faq'
import Apply from './components/Apply'
import Footer from './components/Footer'
import ApplyOrb from './components/ApplyOrb'
import { useBorrowerAnimations } from './hooks/useBorrowerAnimations'

function goApply() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('apply')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
  setTimeout(
    () => {
      document.getElementById('f-biz')?.focus({ preventScroll: true })
    },
    prefersReduced ? 0 : 700,
  )
}

export default function App() {
  const handleApplyClick = useCallback(() => {
    goApply()
  }, [])

  useBorrowerAnimations()

  return (
    <>
      <Rail />
      <Nav />
      <Hero onApplyClick={handleApplyClick} />
      <Feed />
      <DarkStatement />
      <LightStatement />
      <Process />
      <Steps />
      <Numbers />
      <Savings />
      <Compare />
      <Owners />
      <Faq />
      <Apply />
      <Footer />
      <ApplyOrb onClick={handleApplyClick} />
    </>
  )
}
