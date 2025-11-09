import React from 'react'

interface AssetDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  asset?: any
}

export function AssetDetailsModal({ isOpen, onClose, asset }: AssetDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-lg transform rounded-lg bg-surface p-4 sm:p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-text">Asset Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-3xl">🖥️</span>
              <div>
                <h3 className="text-lg font-medium text-text">{asset?.name}</h3>
                <p className="text-sm text-textSecondary">{asset?.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-responsive">
                <h4 className="text-sm font-medium text-textSecondary mb-1">Status</h4>
                <p className="text-text">{asset?.status}</p>
              </div>
              <div className="card-responsive">
                <h4 className="text-sm font-medium text-textSecondary mb-1">Serial Number</h4>
                <p className="text-text">{asset?.serialNumber}</p>
              </div>
            </div>

            <div className="card-responsive">
              <h4 className="text-sm font-medium text-textSecondary mb-1">Assigned To</h4>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {asset?.assignedTo?.charAt(0)}
                </div>
                <div>
                  <p className="text-text font-medium">{asset?.assignedTo}</p>
                  <p className="text-xs text-textSecondary">{asset?.department}</p>
                </div>
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
                Edit Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}