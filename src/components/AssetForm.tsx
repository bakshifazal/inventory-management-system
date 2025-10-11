import React, { useState } from 'react'
import { Asset } from '../store/useStore'

interface AssetFormProps {
  initialData?: Asset
  onSubmit: (data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
  isLoading?: boolean
}

export function AssetForm({ initialData, onSubmit, onCancel, isLoading = false }: AssetFormProps) {
  const [formData, setFormData] = useState<Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>>({
    name: initialData?.name || '',
    type: initialData?.type || 'desktop',
    serialNumber: initialData?.serialNumber || '',
    model: initialData?.model || '',
    status: initialData?.status || 'available',
    assignedTo: initialData?.assignedTo || '',
    purchaseDate: initialData?.purchaseDate || '',
    warrantyExpiry: initialData?.warrantyExpiry || '',
    location: initialData?.location || '',
    notes: initialData?.notes || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
            Asset Name *
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
          <label htmlFor="type" className="block text-sm font-medium text-textSecondary mb-2">
            Asset Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="desktop">Desktop</option>
            <option value="laptop">Laptop</option>
            <option value="printer">Printer</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="serialNumber" className="block text-sm font-medium text-textSecondary mb-2">
            Serial Number *
          </label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-textSecondary mb-2">
            Model *
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-textSecondary mb-2">
            Status *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="available">Available</option>
            <option value="assigned">Assigned</option>
            <option value="maintenance">Maintenance</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-textSecondary mb-2">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-textSecondary mb-2">
            Purchase Date *
          </label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label htmlFor="warrantyExpiry" className="block text-sm font-medium text-textSecondary mb-2">
            Warranty Expiry *
          </label>
          <input
            type="date"
            id="warrantyExpiry"
            name="warrantyExpiry"
            value={formData.warrantyExpiry}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
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
          {isLoading ? 'Saving...' : initialData ? 'Update Asset' : 'Add Asset'}
        </button>
      </div>
    </form>
  )
}
