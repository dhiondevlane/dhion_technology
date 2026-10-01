import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ContactPopup from './ContactPopup'

export default function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactPopup />
    </div>
  )
}
