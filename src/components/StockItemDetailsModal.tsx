import React from 'react'
import { StockItem } from '../store/useStore'

interface StockItemDetailsModalProps {
  item: StockItem | null
  isOpen: boolean
  onClose: () => void
  onEdit: (item: StockItem) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export function StockItemDetailsModal({ item, isOpen, onClose, onEdit, onUpdateQuantity }: StockItemDetailsModalProps) {
  if (!item || !isOpen) return null

  const isLowStock = item.quantity <= item.minQuantity

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-text">{item.name}</h2>
              <p className="text-textSecondary">{item.category}</p>
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
              <h3 className="text-lg font-semibold text-text mb-4">Stock Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Current Quantity:</span>
                  <span className={`font-medium ${isLowStock ? 'text-warning' : 'text-text'}`}>
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Minimum Quantity:</span>
                  <span className="text-text font-medium">{item.minQuantity} {item.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Location:</span>
                  <span className="text-text font-medium">{item.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Supplier:</span>
                  <span className="text-text font-medium">{item.supplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Last Restocked:</span>
                  <span className="text-text font-medium">{item.lastRestocked}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Additional Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Created:</span>
                  <span className="text-text font-medium">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Last Updated:</span>
                  <span className="text-text font-medium">{new Date(item.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {item.notes && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-textSecondary mb-2">Notes</h4>
                  <p className="text-text bg-surface/50 p-3 rounded-lg border border-border">
                    {item.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {isLowStock && (
            <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-xl">
              <h4 className="text-warning font-medium mb-2">⚠️ Low Stock Alert</h4>
              <p className="text-textSecondary text-sm mb-3">
                This item is below the minimum quantity threshold. Consider restocking soon.
              </p>
              <button
                onClick={() => onUpdateQuantity(item.id, item.minQuantity * 2)}
                className="px-4 py-2 bg-warning/20 text-warning rounded-lg text-sm font-medium hover:bg-warning/30 transition-colors"
              >
                Restock to {item.minQuantity * 2} {item.unit}
              </button>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-surface border border-border rounded-xl text-textSecondary hover:text-text hover:border-textSecondary transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onEdit(item)
                onClose()
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              Edit Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
