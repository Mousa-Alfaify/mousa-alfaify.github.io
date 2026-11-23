import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Philosophy } from './components/Philosophy'
import { SelectedWork } from './components/SelectedWork'
import { Experience } from './components/Experience'
import { CapabilityMap } from './components/CapabilityMap'
import { Credentials } from './components/Credentials'
import { Story } from './components/Story'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Impact />
        <Philosophy />
        <SelectedWork />
        <Experience />
        <CapabilityMap />
        <Credentials />
        <Story />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
