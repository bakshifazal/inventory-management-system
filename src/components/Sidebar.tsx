import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ open = false, onClose }) => {
  const location = useLocation()
  const { currentUser, logout } = useStore()
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/assets', label: 'Assets', icon: '🖥️' },
    { path: '/stock', label: 'Stock', icon: '📦' },
  ]

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <div
        className={`fixed z-40 top-0 left-0 h-full transform transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } w-[280px] max-w-[90vw] bg-surface border-r border-border flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <div>
            <h1 className="text-xl font-bold text-primary">InventoryPro</h1>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 rounded-md hover:bg-background/50 active:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary">InventoryPro</h1>
          <p className="text-textSecondary text-sm mt-1">Asset & Stock Management</p>
        </div>

        <nav className="flex-1 px-3 md:px-4 overflow-y-auto">
          <ul className="space-y-1 md:space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 rounded-lg md:rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-textSecondary hover:bg-surface/80 hover:text-text'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose?.();
                    }
                  }}
                >
                  <span className="text-lg md:text-xl mr-3">{item.icon}</span>
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {currentUser?.name?.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-text">{currentUser?.name}</p>
              <p className="text-xs text-textSecondary">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-surface border border-border rounded-xl text-textSecondary hover:text-text hover:border-textSecondary transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
