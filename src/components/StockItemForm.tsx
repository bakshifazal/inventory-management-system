import React, { useState } from 'react'
import { StockItem } from '../store/useStore'

interface StockItemFormProps {
  initialData?: StockItem
  onSubmit: (data: Omit<StockItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  isLoading?: boolean
}

export function StockItemForm({ initialData, onSubmit, onCancel, isLoading = false }: StockItemFormProps) {
  const [formData, setFormData] = useState<Omit<StockItem, 'id' | 'createdAt' | 'updatedAt'>>({
    name: initialData?.name || '',
    category: initialData?.category || '',
    quantity: initialData?.quantity || 0,
    minQuantity: initialData?.minQuantity || 0,
    unit: initialData?.unit || 'units',
    location: initialData?.location || '',
    supplier: initialData?.supplier || '',
    lastRestocked: initialData?.lastRestocked || '',
    notes: initialData?.notes || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'quantity' || name === 'minQuantity' ? parseInt(value) || 0 : value 
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-textSecondary mb-2">
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-textSecondary mb-2">
            Category *
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-textSecondary mb-2">
            Quantity *
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="minQuantity" className="block text-sm font-medium text-textSecondary mb-2">
            Minimum Quantity *
          </label>
          <input
            type="number"
            id="minQuantity"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-textSecondary mb-2">
            Unit *
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="units">Units</option>
            <option value="pairs">Pairs</option>
            <option value="boxes">Boxes</option>
            <option value="cartons">Cartons</option>
            <option value="meters">Meters</option>
            <option value="liters">Liters</option>
            <option value="kg">Kilograms</option>
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-textSecondary mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-textSecondary mb-2">
            Supplier *
          </label>
          <input
            type="text"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="lastRestocked" className="block text-sm font-medium text-textSecondary mb-2">
            Last Restocked *
          </label>
          <input
            type="date"
            id="lastRestocked"
            name="lastRestocked"
            value={formData.lastRestocked}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-textSecondary mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-surface border border-border rounded-xl text-textSecondary hover:text-text hover:border-textSecondary transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  )
}
