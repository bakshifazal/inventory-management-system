import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { StockItem } from '../store/useStore'
import { StockItemForm } from '../components/StockItemForm'

export function StockDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { stockItems, fetchStockItems, updateStockItem, deleteStockItem, updateStockQuantity } = useStore()
  const [item, setItem] = useState<StockItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [quantityUpdate, setQuantityUpdate] = useState<number | null>(null)

  useEffect(() => {
    fetchStockItems()
  }, [fetchStockItems])

  useEffect(() => {
    if (stockItems.length > 0 && id) {
      const foundItem = stockItems.find(i => i.id === id)
      if (foundItem) {
        setItem(foundItem)
      } else {
        navigate('/stock')
      }
    }
  }, [stockItems, id, navigate])

  const handleUpdateStockItem = async (data: any) => {
    if (!item) return
    
    setIsLoading(true)
    try {
      await updateStockItem(item.id, data)
      setItem({ ...item, ...data, updatedAt: new Date().toISOString() })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update stock item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteStockItem = async () => {
    if (!item) return
    
    if (!window.confirm('Are you sure you want to delete this stock item?')) return
    
    setIsLoading(true)
    try {
      await deleteStockItem(item.id)
      navigate('/stock')
    } catch (error) {
      console.error('Failed to delete stock item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateQuantity = async (quantity: number) => {
    if (!item) return
    
    setIsLoading(true)
    try {
      await updateStockQuantity(item.id, quantity)
      setItem({ ...item, quantity, updatedAt: new Date().toISOString() })
      setQuantityUpdate(null)
    } catch (error) {
      console.error('Failed to update stock quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isLowStock = item ? item.quantity <= item.minQuantity : false

  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-textSecondary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/stock')}
            className="text-primary hover:underline text-sm font-medium mb-2 flex items-center"
          >
            ← Back to Stock
          </button>
          <h2 className="text-3xl font-bold text-text">{item.name}</h2>
          <p className="text-textSecondary">{item.category}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleDeleteStockItem}
            className="px-6 py-3 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <h3 className="text-xl font-semibold text-text mb-6">Edit Stock Item</h3>
          <StockItemForm
            initialData={item}
            onSubmit={handleUpdateStockItem}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-text mb-6">Stock Information</h3>
                <div className="space-y-4">
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
                <h3 className="text-xl font-semibold text-text mb-6">Additional Details</h3>
                <div className="space-y-4">
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
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-textSecondary mb-2">Notes</h4>
                    <p className="text-text bg-surface/50 p-4 rounded-lg border border-border">
                      {item.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {isLowStock && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-warning mb-4">⚠️ Low Stock Alert</h3>
              <p className="text-textSecondary mb-4">
                This item is below the minimum quantity threshold. Consider restocking soon.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleUpdateQuantity(item.minQuantity * 2)}
                  className="px-4 py-2 bg-warning/20 text-warning rounded-lg text-sm font-medium hover:bg-warning/30 transition-colors"
                >
                  Restock to {item.minQuantity * 2} {item.unit}
                </button>
                <button
                  onClick={() => handleUpdateQuantity(item.minQuantity * 3)}
                  className="px-4 py-2 bg-warning/20 text-warning rounded-lg text-sm font-medium hover:bg-warning/30 transition-colors"
                >
                  Restock to {item.minQuantity * 3} {item.unit}
                </button>
                <button
                  onClick={() => setQuantityUpdate(item.quantity)}
                  className="px-4 py-2 bg-surface border border-border rounded-lg text-textSecondary hover:text-text hover:border-textSecondary transition-colors text-sm"
                >
                  Custom Quantity
                </button>
              </div>

              {quantityUpdate !== null && (
                <div className="mt-4 flex items-center space-x-3">
                  <input
                    type="number"
                    value={quantityUpdate}
                    onChange={(e) => setQuantityUpdate(parseInt(e.target.value) || 0)}
                    min="0"
                    className="px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/50 w-32"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(quantityUpdate)}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setQuantityUpdate(null)}
                    className="px-4 py-2 bg-surface border border-border rounded-lg text-textSecondary hover:text-text hover:border-textSecondary transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
