import React from 'react'
import { Asset } from '../store/useStore'

interface AssetDetailsModalProps {
  asset: Asset | null
  isOpen: boolean
  onClose: () => void
  onEdit: (asset: Asset) => void
}

export function AssetDetailsModal({ asset, isOpen, onClose, onEdit }: AssetDetailsModalProps) {
  if (!asset || !isOpen) return null

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'available':
        return 'bg-success/20 text-success'
      case 'assigned':
        return 'bg-secondary/20 text-secondary'
      case 'maintenance':
        return 'bg-warning/20 text-warning'
      case 'retired':
        return 'bg-error/20 text-error'
      default:
        return 'bg-textSecondary/20 text-textSecondary'
    }
  }

  const getTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'desktop':
        return '🖥️'
      case 'laptop':
        return '💻'
      case 'printer':
        return '🖨️'
      default:
        return '📦'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl mr-4">
                {getTypeIcon(asset.type)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text">{asset.name}</h2>
                <p className="text-textSecondary">{asset.model}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-surface/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Asset Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Serial Number:</span>
                  <span className="text-text font-medium">{asset.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Type:</span>
                  <span className="text-text font-medium">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Location:</span>
                  <span className="text-text font-medium">{asset.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Purchase Date:</span>
                  <span className="text-text font-medium">{asset.purchaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Warranty Expiry:</span>
                  <span className="text-text font-medium">{asset.warrantyExpiry}</span>
                </div>
                {asset.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-textSecondary">Assigned To:</span>
                    <span className="text-text font-medium">{asset.assignedTo}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Additional Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Created:</span>
                  <span className="text-text font-medium">{new Date(asset.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Last Updated:</span>
                  <span className="text-text font-medium">{new Date(asset.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {asset.notes && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-textSecondary mb-2">Notes</h4>
                  <p className="text-text bg-surface/50 p-3 rounded-lg border border-border">
                    {asset.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-surface border border-border rounded-xl text-textSecondary hover:text-text hover:border-textSecondary transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEdit(asset)
                onClose()
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              Edit Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
