import React from 'react'
import { format } from 'date-fns'
import { useStore } from '../store/useStore'

export function Header() {
  const { currentUser } = useStore()
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy')

  return (
    <header className="bg-surface border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Welcome back, {currentUser?.name.split(' ')[0]}!</h1>
          <p className="text-textSecondary mt-1">{currentDate}</p>
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
