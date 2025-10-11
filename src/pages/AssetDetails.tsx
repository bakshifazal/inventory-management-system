import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Asset } from '../store/useStore'
import { AssetForm } from '../components/AssetForm'

export function AssetDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { assets, fetchAssets, updateAsset, deleteAsset } = useStore()
  const [asset, setAsset] = useState<Asset | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  useEffect(() => {
    if (assets.length > 0 && id) {
      const foundAsset = assets.find(a => a.id === id)
      if (foundAsset) {
        setAsset(foundAsset)
      } else {
        navigate('/assets')
      }
    }
  }, [assets, id, navigate])

  const handleUpdateAsset = async (data: any) => {
    if (!asset) return
    
    setIsLoading(true)
    try {
      await updateAsset(asset.id, data)
      setAsset({ ...asset, ...data, updatedAt: new Date().toISOString() })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update asset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAsset = async () => {
    if (!asset) return
    
    if (!window.confirm('Are you sure you want to delete this asset?')) return
    
    setIsLoading(true)
    try {
      await deleteAsset(asset.id)
      navigate('/assets')
    } catch (error) {
      console.error('Failed to delete asset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!asset) {
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
            onClick={() => navigate('/assets')}
            className="text-primary hover:underline text-sm font-medium mb-2 flex items-center"
          >
            ← Back to Assets
          </button>
          <h2 className="text-3xl font-bold text-text">{asset.name}</h2>
          <p className="text-textSecondary">{asset.model}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary/20 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleDeleteAsset}
            className="px-6 py-3 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <h3 className="text-xl font-semibold text-text mb-6">Edit Asset</h3>
          <AssetForm
            initialData={asset}
            onSubmit={handleUpdateAsset}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-text mb-6">Asset Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    asset.status === 'available' ? 'bg-success/20 text-success' :
                    asset.status === 'assigned' ? 'bg-secondary/20 text-secondary' :
                    asset.status === 'maintenance' ? 'bg-warning/20 text-warning' :
                    'bg-error/20 text-error'
                  }`}>
                    {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Type:</span>
                  <span className="text-text font-medium">{asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Serial Number:</span>
                  <span className="text-text font-medium">{asset.serialNumber}</span>
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
              <h3 className="text-xl font-semibold text-text mb-6">Additional Details</h3>
              <div className="space-y-4">
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
                <div className="mt-8">
                  <h4 className="text-sm font-medium text-textSecondary mb-2">Notes</h4>
                  <p className="text-text bg-surface/50 p-4 rounded-lg border border-border">
                    {asset.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
