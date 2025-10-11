import React from 'react'
import { Link } from 'react-router-dom'
import { StockItem } from '../store/useStore'

interface StockItemCardProps {
  item: StockItem
  onEdit: (item: StockItem) => void
  onDelete: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export function StockItemCard({ item, onEdit, onDelete, onUpdateQuantity }: StockItemCardProps) {
  const isLowStock = item.quantity <= item.minQuantity

  return (
    <div className="bg-surface border border-border rounded-xl p-5 hover:shadow-lg transition-all animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-text">{item.name}</h3>
          <p className="text-textSecondary text-sm">{item.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isLowStock ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
        }`}>
          {isLowStock ? 'Low Stock' : 'In Stock'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Quantity:</span>
          <span className={`font-medium ${isLowStock ? 'text-warning' : 'text-text'}`}>
            {item.quantity} {item.unit}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Min Quantity:</span>
          <span className="text-text font-medium">{item.minQuantity} {item.unit}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Location:</span>
          <span className="text-text font-medium">{item.location}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Supplier:</span>
          <span className="text-text font-medium">{item.supplier}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Last Restocked:</span>
          <span className="text-text font-medium">{item.lastRestocked}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/stock/${item.id}`}
          className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-xl text-center text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          View Details
        </Link>
        <button
          onClick={() => onEdit(item)}
          className="py-2 px-4 bg-secondary/10 text-secondary rounded-xl text-sm font-medium hover:bg-secondary/20 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="py-2 px-4 bg-error/10 text-error rounded-xl text-sm font-medium hover:bg-error/20 transition-colors"
        >
          Delete
        </button>
      </div>

      {isLowStock && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-xl">
          <p className="text-warning text-sm font-medium">⚠️ Low stock alert!</p>
          <button
            onClick={() => onUpdateQuantity(item.id, item.minQuantity * 2)}
            className="mt-2 w-full py-1 px-3 bg-warning/20 text-warning rounded-lg text-xs font-medium hover:bg-warning/30 transition-colors"
          >
            Restock to {item.minQuantity * 2} {item.unit}
          </button>
        </div>
      )}
    </div>
  )
}
