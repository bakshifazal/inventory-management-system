import React from 'react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const stats = [
    { label: 'Total Assets', value: '245', change: '+12.5%', icon: '🖥️' },
    { label: 'Stock Items', value: '1,234', change: '+3.2%', icon: '📦' },
    { label: 'Low Stock', value: '15', change: '-2.5%', icon: '⚠️' },
    { label: 'On Order', value: '28', change: '+15.8%', icon: '🚚' },
  ]

  return (
    <div className="space-responsive">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card-responsive flex items-center justify-between bg-surface hover:bg-surface/80 transition-colors"
          >
            <div>
              <p className="text-sm text-textSecondary">{stat.label}</p>
              <h3 className="text-responsive-xl font-bold text-text mt-1">
                {stat.value}
              </h3>
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl">{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card-responsive">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-responsive-xl font-bold text-text">Recent Activity</h2>
          <Link
            to="/assets"
            className="button-responsive bg-primary/10 text-primary hover:bg-primary/20"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {/* Activity items here */}
          <div className="flex items-start space-x-4 p-3 sm:p-4 rounded-lg bg-surface/50">
            <span className="text-xl sm:text-2xl">🖥️</span>
            <div className="flex-1 min-w-0">
              <p className="text-responsive-base font-medium text-text truncate">
                New Laptop Added
              </p>
              <p className="text-sm text-textSecondary">MacBook Pro M2</p>
            </div>
            <span className="text-xs text-textSecondary whitespace-nowrap">
              2 hours ago
            </span>
          </div>
          {/* More activity items... */}
        </div>
      </div>
    </div>
  )
}