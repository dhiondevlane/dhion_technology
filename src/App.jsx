import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import NotFound from './pages/NotFound'
import ParkingBay from './pages/products/ParkingBay'
import HomeDelivery from './pages/products/HomeDelivery'
import PrivacyPolicy from './pages/Privacy_Policy'
import TermsService from './pages/Terms_Service'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== '/contact') {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="parkingbay" element={<ParkingBay />} />
          <Route path="homedelivery" element={<HomeDelivery />} />
          <Route path="process" element={<Process />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsService />} />
          <Route path="contact" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
