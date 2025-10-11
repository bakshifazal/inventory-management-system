import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { StatCard } from '../components/StatCard'
import { AssetCard } from '../components/AssetCard'
import { StockItemCard } from '../components/StockItemCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LoadingState, StatCardSkeleton, CardSkeleton } from '../components/LoadingState'
import { ChartSkeleton } from '../components/ChartSkeleton'
import { Skeleton } from '../components/Skeleton'

export function Dashboard() {
  const { 
    assets, 
    stockItems, 
    fetchAssets, 
    fetchStockItems,
    updateAsset,
    updateStockQuantity,
    loading
  } = useStore()

  const [prevStats, setPrevStats] = useState({
    totalAssets: 0,
    availableAssets: 0,
    assignedAssets: 0,
    maintenanceAssets: 0,
    totalStockItems: 0,
    lowStockItems: 0
  })

  // Calculate statistics using memoization for performance
  const stats = useMemo(() => {
    const totalAssets = assets.length
    const availableAssets = assets.filter(a => a.status === 'available').length
    const assignedAssets = assets.filter(a => a.status === 'assigned').length
    const maintenanceAssets = assets.filter(a => a.status === 'maintenance').length
    const totalStockItems = stockItems.length
    const lowStockItems = stockItems.filter(item => item.quantity <= item.minQuantity).length

    return {
      totalAssets,
      availableAssets,
      assignedAssets,
      maintenanceAssets,
      totalStockItems,
      lowStockItems
    }
  }, [assets, stockItems])

  // Calculate month-over-month trends
  const trends = useMemo(() => {
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return { value: 0, isPositive: true }
      const change = ((current - previous) / previous) * 100
      return {
        value: Math.abs(Math.round(change)),
        isPositive: change >= 0
      }
    }

    return {
      totalAssets: calculateTrend(stats.totalAssets, prevStats.totalAssets),
      availableAssets: calculateTrend(stats.availableAssets, prevStats.availableAssets),
      assignedAssets: calculateTrend(stats.assignedAssets, prevStats.assignedAssets),
      maintenanceAssets: calculateTrend(stats.maintenanceAssets, prevStats.maintenanceAssets),
      totalStockItems: calculateTrend(stats.totalStockItems, prevStats.totalStockItems),
      lowStockItems: calculateTrend(stats.lowStockItems, prevStats.lowStockItems)
    }
  }, [stats, prevStats])

  useEffect(() => {
    // Store current stats for trend calculation
    setPrevStats(stats)
  }, [])

  useEffect(() => {
    fetchAssets()
    fetchStockItems()
  }, [fetchAssets, fetchStockItems])

  // Chart data with memoization
  const chartData = useMemo(() => {
    const assetTypeData = [
      { name: 'Desktops', value: assets.filter(a => a.type === 'desktop').length },
      { name: 'Laptops', value: assets.filter(a => a.type === 'laptop').length },
      { name: 'Printers', value: assets.filter(a => a.type === 'printer').length },
      { name: 'Other', value: assets.filter(a => a.type === 'other').length },
    ].filter(item => item.value > 0) // Only show types with assets

    const stockCategoryData = stockItems.reduce((acc, item) => {
      const existing = acc.find(c => c.name === item.category)
      if (existing) {
        existing.value += item.quantity
      } else {
        acc.push({ name: item.category, value: item.quantity })
      }
      return acc
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value) // Sort by quantity descending

    return { assetTypeData, stockCategoryData }
  }, [assets, stockItems])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-text mb-2">Dashboard Overview</h2>
        <p className="text-textSecondary">Monitor your inventory and stock levels at a glance</p>
      </div>

      {/* Stats Grid */}
      <LoadingState 
        isLoading={loading}
        count={4}
        layout="grid"
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        SkeletonComponent={StatCardSkeleton}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Assets"
            value={stats.totalAssets}
            icon="🖥️"
            trend={trends.totalAssets}
            color="primary"
          />
          <StatCard
            title="Available Assets"
            value={stats.availableAssets}
            icon="✅"
            trend={trends.availableAssets}
            color="success"
          />
          <StatCard
            title="Assigned Assets"
            value={stats.assignedAssets}
            icon="👤"
            trend={trends.assignedAssets}
            color="secondary"
          />
          <StatCard
            title="Maintenance"
            value={stats.maintenanceAssets}
            icon="🔧"
            trend={trends.maintenanceAssets}
            color="warning"
          />
        </div>
      </LoadingState>

      <LoadingState
        isLoading={loading}
        count={2}
        layout="grid"
        className="grid-cols-1 lg:grid-cols-2"
        SkeletonComponent={StatCardSkeleton}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatCard
            title="Total Stock Items"
            value={stats.totalStockItems}
            icon="📦"
            trend={trends.totalStockItems}
            color="accent"
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStockItems}
            icon="⚠️"
            color={stats.lowStockItems > 0 ? 'warning' : 'success'}
            trend={trends.lowStockItems}
          />
        </div>
      </LoadingState>

      {/* Charts */}
            {/* Charts Grid */}
      <LoadingState
        isLoading={loading}
        count={2}
        layout="grid"
        className="grid-cols-1 lg:grid-cols-2 gap-6"
        SkeletonComponent={ChartSkeleton}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-xl">
            <h3 className="text-xl font-bold text-text mb-4">Assets by Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.assetTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-xl">
            <h3 className="text-xl font-bold text-text mb-4">Stock by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.stockCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </LoadingState>

      {/* Recent Assets */}
            {/* Recent Assets */}
      <LoadingState
        isLoading={loading}
        count={3}
        layout="flex"
        SkeletonComponent={CardSkeleton}
      >
        <div className="bg-surface p-6 rounded-xl">
          <h3 className="text-xl font-bold text-text mb-4">Recent Assets</h3>
          <div className="space-y-4">
            {assets.slice(0, 3).map(asset => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onEdit={(asset) => updateAsset(asset.id, asset)}
                onDelete={() => {}}
              />
            ))}
            <Link
              to="/assets"
              className="block text-center py-2 text-primary hover:text-primary/80 transition-colors"
            >
              View All Assets
            </Link>
          </div>
        </div>
      </LoadingState>

      {/* Low Stock Items */}
      <LoadingState
        isLoading={loading}
        count={3}
        layout="grid"
        className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        SkeletonComponent={CardSkeleton}
      >
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-text">Low Stock Items</h3>
            <a href="/stock" className="text-primary hover:underline text-sm font-medium">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockItems
              .filter(item => item.quantity <= item.minQuantity)
              .slice(0, 3)
              .map(item => (
                <StockItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onUpdateQuantity={updateStockQuantity}
                />
              ))}
            {stockItems.filter(item => item.quantity <= item.minQuantity).length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className="text-textSecondary">No low stock items. All items are sufficiently stocked.</p>
              </div>
            )}
          </div>
        </div>
      </LoadingState>
    </div>
  )
}
