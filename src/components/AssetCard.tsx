import React from 'react'
import { Link } from 'react-router-dom'
import { Asset } from '../store/useStore'

interface AssetCardProps {
  asset: Asset
  onEdit: (asset: Asset) => void
  onDelete: (id: string) => void
}

export function AssetCard({ asset, onEdit, onDelete }: AssetCardProps) {
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
    <div className="bg-surface border border-border rounded-xl p-5 hover:shadow-lg transition-all animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mr-4">
            {getTypeIcon(asset.type)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-text">{asset.name}</h3>
            <p className="text-textSecondary text-sm">{asset.model}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Serial:</span>
          <span className="text-text font-medium">{asset.serialNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Location:</span>
          <span className="text-text font-medium">{asset.location}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-textSecondary">Warranty:</span>
          <span className="text-text font-medium">{asset.warrantyExpiry}</span>
        </div>
        {asset.assignedTo && (
          <div className="flex justify-between text-sm">
            <span className="text-textSecondary">Assigned to:</span>
            <span className="text-text font-medium">{asset.assignedTo}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/assets/${asset.id}`}
          className="flex-1 py-2 px-4 bg-primary/10 text-primary rounded-xl text-center text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          View Details
        </Link>
        <button
          onClick={() => onEdit(asset)}
          className="py-2 px-4 bg-secondary/10 text-secondary rounded-xl text-sm font-medium hover:bg-secondary/20 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(asset.id)}
          className="py-2 px-4 bg-error/10 text-error rounded-xl text-sm font-medium hover:bg-error/20 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
