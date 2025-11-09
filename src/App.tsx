import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { Assets } from './pages/Assets'
import { Stock } from './pages/Stock'
import { AssetDetails } from './pages/AssetDetails'
import { StockDetails } from './pages/StockDetails'
import { useStore } from './store/useStore'
import { Login } from './pages/Login'
import { ResetPassword } from './pages/ResetPassword'

function App() {
  const { isAuthenticated } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  const toggleSidebar = () => setSidebarOpen((s) => !s)

  React.useEffect(() => {
    if (sidebarOpen) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => document.documentElement.classList.remove('overflow-hidden')
  }, [sidebarOpen])

  return (
    <Router>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar overlays on mobile, static on desktop */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50">
            <div className="container mx-auto px-3 py-4 md:px-6 md:py-6 max-w-7xl">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/assets/:id" element={<AssetDetails />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/stock/:id" element={<StockDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
