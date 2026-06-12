import Rail from './components/Rail'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Feed from './components/Feed'
import StatementScroll from './components/StatementScroll'
import Steps from './components/Steps'
import Numbers from './components/Numbers'
import Savings from './components/Savings'
import Compare from './components/Compare'
import Owners from './components/Owners'
import Faq from './components/Faq'
import ApplyCta from './components/ApplyCta'
import Footer from './components/Footer'
import ApplyOrb from './components/ApplyOrb'
import { useBorrowerAnimations } from './hooks/useBorrowerAnimations'

export default function App() {
  useBorrowerAnimations()

  return (
    <>
      <Rail />
      <Nav />
      <Hero />
      <Feed />
      <StatementScroll />
      <Steps />
      <Numbers />
      <Savings />
      <Compare />
      <Owners />
      <Faq />
      <ApplyCta />
      <Footer />
      <ApplyOrb />
    </>
  )
}
