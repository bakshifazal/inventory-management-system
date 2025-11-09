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
    <header className="bg-surface border-b border-border p-3 sm:p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="p-1.5 sm:p-2 rounded-lg bg-surface border border-border md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
            onClick={onToggleSidebar}
            aria-expanded={sidebarOpen}
            aria-label="Toggle sidebar"
          >
            <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text truncate">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary mt-0.5 sm:mt-1 hidden sm:block">
              {currentDate}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-surface border border-border hover:bg-surface/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
            <span className="text-xl">🔔</span>
          </button>
          <button className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-surface border border-border hover:bg-surface/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </div>
    </header>
  )
}
