import React from 'react'
interface HeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}
import { format } from 'date-fns'
import { useStore } from '../store/useStore'

export function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  const { currentUser } = useStore()
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy')

  return (
    <header className="bg-surface border-b border-border p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-lg bg-surface border border-border lg:hidden"
            onClick={onToggleSidebar}
            aria-expanded={sidebarOpen}
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-text">Welcome back, {currentUser?.name.split(' ')[0]}!</h1>
            <p className="text-textSecondary mt-1">{currentDate}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl bg-surface border border-border hover:bg-surface/80 transition-colors">
            <span className="text-xl">🔔</span>
          </button>
          <button className="p-2 rounded-xl bg-surface border border-border hover:bg-surface/80 transition-colors">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </div>
    </header>
  )
}
