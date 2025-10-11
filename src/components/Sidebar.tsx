import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'

export function Sidebar() {
  const location = useLocation()
  const { currentUser, logout } = useStore()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/assets', label: 'Assets', icon: '🖥️' },
    { path: '/stock', label: 'Stock', icon: '📦' },
  ]

  return (
    <div className="w-64 bg-surface border-r border-border h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">InventoryPro</h1>
        <p className="text-textSecondary text-sm mt-1">Asset & Stock Management</p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-textSecondary hover:bg-surface/80 hover:text-text'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {currentUser?.name.charAt(0)}
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
  )
}
