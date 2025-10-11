import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { StockItemCard } from '../components/StockItemCard'
import { StockItemForm } from '../components/StockItemForm'
import { SearchBar } from '../components/SearchBar'
import { FilterDropdown } from '../components/FilterDropdown'
import { StockItemDetailsModal } from '../components/StockItemDetailsModal'
import { LoadingState } from '../components/LoadingState'
import { Skeleton } from '../components/Skeleton'

export function Stock() {
  const { 
    stockItems, 
    fetchStockItems, 
    addStockItem, 
    updateStockItem, 
    deleteStockItem,
    updateStockQuantity
  } = useStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [stockLevelFilter, setStockLevelFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchStockItems()
  }, [fetchStockItems])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleAddStockItem = async (data: any) => {
    setIsLoading(true)
    try {
      await addStockItem(data)
      setShowAddForm(false)
    } catch (error) {
      console.error('Failed to add stock item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStockItem = async (data: any) => {
    if (!editingItem) return
    
    setIsLoading(true)
    try {
      await updateStockItem(editingItem.id, data)
      setEditingItem(null)
    } catch (error) {
      console.error('Failed to update stock item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteStockItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this stock item?')) return
    
    setIsLoading(true)
    try {
      await deleteStockItem(id)
    } catch (error) {
      console.error('Failed to delete stock item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    setIsLoading(true)
    try {
      await updateStockQuantity(id, quantity)
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, quantity })
      }
    } catch (error) {
      console.error('Failed to update stock quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStockItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesStockLevel = stockLevelFilter === 'all' || 
                             (stockLevelFilter === 'low' && item.quantity <= item.minQuantity) ||
                             (stockLevelFilter === 'adequate' && item.quantity > item.minQuantity)
    
    return matchesSearch && matchesCategory && matchesStockLevel
  })

  const categoryOptions = [
    ...Array.from(new Set(stockItems.map(item => item.category))).map(category => ({
      value: category,
      label: category
    }))
  ]

  const stockLevelOptions = [
    { value: 'low', label: 'Low Stock' },
    { value: 'adequate', label: 'Adequate Stock' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text">Stock</h2>
          <p className="text-textSecondary">Manage your inventory and supplies</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">+</span> Add Stock Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <SearchBar onSearch={handleSearch} placeholder="Search stock by name, category, or supplier..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FilterDropdown
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            label="Category"
          />
          <FilterDropdown
            options={stockLevelOptions}
            value={stockLevelFilter}
            onChange={setStockLevelFilter}
            label="Stock Level"
          />
        </div>
      </div>

      {showAddForm && (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text">Add New Stock Item</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 rounded-xl hover:bg-surface/80 transition-colors"
            >
              ✕
            </button>
          </div>
          <StockItemForm
            onSubmit={handleAddStockItem}
            onCancel={() => setShowAddForm(false)}
            isLoading={isLoading}
          />
        </div>
      )}

      {editingItem && (
        <div className="bg-surface border border-border rounded-xl p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text">Edit Stock Item</h3>
            <button
              onClick={() => setEditingItem(null)}
              className="p-2 rounded-xl hover:bg-surface/80 transition-colors"
            >
              ✕
            </button>
          </div>
          <StockItemForm
            initialData={editingItem}
            onSubmit={handleUpdateStockItem}
            onCancel={() => setEditingItem(null)}
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
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStockItems.map(item => (
            <StockItemCard
              key={item.id}
              item={item}
              onEdit={setEditingItem}
              onDelete={handleDeleteStockItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          {filteredStockItems.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-textSecondary">No stock items found matching your criteria.</p>
            </div>
          )}
        </div>
      </LoadingState>

      <StockItemDetailsModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onEdit={setEditingItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  )
}
