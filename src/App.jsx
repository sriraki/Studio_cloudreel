import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import Studio from './Studio.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="flex h-dvh flex-col bg-gray-100 font-sans antialiased lg:flex-row lg:gap-4 lg:p-4">
      {/* Mobile top bar; the sidebar takes over from lg up */}
      <div className="flex items-center gap-3 bg-[#1f0d38] px-4 py-3 lg:hidden">
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="-m-1 p-1 text-white/80 hover:text-white">
          <Menu className="size-6" />
        </button>
        <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="CloudReel" className="h-5" />
      </div>

      {menuOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Studio />
    </div>
  )
}
