import React from 'react'

interface StockItemDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  item?: any
}

export function StockItemDetailsModal({ isOpen, onClose, item }: StockItemDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-lg transform rounded-lg bg-surface p-4 sm:p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-text">Stock Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-3xl">📦</span>
              <div>
                <h3 className="text-lg font-medium text-text">{item?.name}</h3>
                <p className="text-sm text-textSecondary">SKU: {item?.sku}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-responsive">
                <h4 className="text-sm font-medium text-textSecondary mb-1">Current Stock</h4>
                <p className="text-xl font-bold text-text">{item?.quantity}</p>
              </div>
              <div className="card-responsive">
                <h4 className="text-sm font-medium text-textSecondary mb-1">Minimum Stock</h4>
                <p className="text-xl font-bold text-text">{item?.minQuantity}</p>
              </div>
            </div>

            <div className="card-responsive">
              <h4 className="text-sm font-medium text-textSecondary mb-1">Recent Activity</h4>
              <div className="space-y-2 mt-2">
                {item?.recentActivity?.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-text">{activity.action}</span>
                    <span className="text-textSecondary">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={onClose}
                className="button-responsive flex-1 bg-surface border border-border hover:bg-surface/80"
              >
                Close
              </button>
              <button
                className="button-responsive flex-1 bg-primary text-white hover:bg-primary/90"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}