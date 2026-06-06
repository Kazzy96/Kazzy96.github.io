import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'
import './MainLayout.css'

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <BottomNav />
    </>
  )
}
