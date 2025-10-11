import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { AssetCard } from '../components/AssetCard'
import { AssetForm } from '../components/AssetForm'
import { SearchBar } from '../components/SearchBar'
import { FilterDropdown } from '../components/FilterDropdown'
import { AssetDetailsModal } from '../components/AssetDetailsModal'
import { LoadingState } from '../components/LoadingState'
import { Skeleton } from '../components/Skeleton'

export function Assets() {
  const { 
    assets, 
    fetchAssets, 
    addAsset, 
    updateAsset, 
    deleteAsset 
  } = useStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAsset, setEditingAsset] = useState<any>(null)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleAddAsset = async (data: any) => {
    setIsLoading(true)
    try {
      await addAsset(data)
      setShowAddForm(false)
    } catch (error) {
      console.error('Failed to add asset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAsset = async (data: any) => {
    if (!editingAsset) return
    
    setIsLoading(true)
    try {
      await updateAsset(editingAsset.id, data)
      setEditingAsset(null)
    } catch (error) {
      console.error('Failed to update asset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAsset = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return
    
    setIsLoading(true)
    try {
      await deleteAsset(id)
    } catch (error) {
      console.error('Failed to delete asset:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (asset.assignedTo && asset.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = typeFilter === 'all' || asset.type === typeFilter
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const typeOptions = [
    { value: 'desktop', label: 'Desktop' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'printer', label: 'Printer' },
    { value: 'other', label: 'Other' }
  ]

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'retired', label: 'Retired' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text">Assets</h2>
          <p className="text-textSecondary">Manage your hardware inventory</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">+</span> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <SearchBar onSearch={handleSearch} placeholder="Search assets by name, serial, model, or assigned to..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FilterDropdown
            options={typeOptions}
            value={typeFilter}
            onChange={setTypeFilter}
            label="Type"
          />
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            label="Status"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text">Add New Asset</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 rounded-xl hover:bg-surface/80 transition-colors"
            >
              ✕
            </button>
          </div>
          <AssetForm
            onSubmit={handleAddAsset}
            onCancel={() => setShowAddForm(false)}
            isLoading={isLoading}
          />
        </div>
      )}

      {editingAsset && (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text">Edit Asset</h3>
            <button
              onClick={() => setEditingAsset(null)}
              className="p-2 rounded-xl hover:bg-surface/80 transition-colors"
            >
              ✕
            </button>
          </div>
          <AssetForm
            initialData={editingAsset}
            onSubmit={handleUpdateAsset}
            onCancel={() => setEditingAsset(null)}
            isLoading={isLoading}
          />
        </div>
      )}

      <LoadingState 
        isLoading={isLoading} 
        count={6}
        SkeletonComponent={() => (
          <div className="bg-surface p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-24 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24 rounded-xl" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onEdit={setEditingAsset}
              onDelete={handleDeleteAsset}
            />
          ))}
          {filteredAssets.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-textSecondary">No assets found matching your criteria.</p>
            </div>
          )}
        </div>
      </LoadingState>

      <AssetDetailsModal
        asset={selectedAsset}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onEdit={setEditingAsset}
      />
    </div>
  )
}
