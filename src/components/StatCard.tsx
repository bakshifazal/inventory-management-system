import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
}

export function StatCard({ title, value, icon, trend, color = 'primary' }: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary'
      case 'secondary':
        return 'bg-secondary/10 text-secondary'
      case 'accent':
        return 'bg-accent/10 text-accent'
      case 'success':
        return 'bg-success/10 text-success'
      case 'warning':
        return 'bg-warning/10 text-warning'
      case 'error':
        return 'bg-error/10 text-error'
      default:
        return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:shadow-lg transition-all animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-textSecondary text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-text mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-success' : 'text-error'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-textSecondary text-xs ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getColorClass()}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
