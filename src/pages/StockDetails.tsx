import React from 'react'
import { useParams } from 'react-router-dom'

export function StockDetails() {
  const { id } = useParams()

  return (
    <div className="space-responsive">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-responsive-xl font-bold text-text">Stock Details</h1>
          <p className="text-sm text-textSecondary mt-1">View and manage stock item</p>
        </div>
        <button className="button-responsive bg-primary text-white hover:bg-primary/90">
          Update Stock
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-responsive">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-4xl">📦</span>
              <div>
                <h2 className="text-xl font-bold text-text">USB-C Cables</h2>
                <p className="text-sm text-textSecondary">SKU: USB-{id}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card-responsive">
              <h3 className="text-lg font-bold text-text mb-4">Current Stock</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">145</p>
                <p className="text-sm text-textSecondary mt-1">units</p>
              </div>
            </div>
            <div className="card-responsive">
              <h3 className="text-lg font-bold text-text mb-4">Low Stock Alert</h3>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-500">50</p>
                <p className="text-sm text-textSecondary mt-1">minimum units</p>
              </div>
            </div>
          </div>

          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Stock History</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                <div>
                  <p className="text-text font-medium">Stock Added</p>
                  <p className="text-sm text-textSecondary">+50 units</p>
                </div>
                <span className="text-xs text-textSecondary">2023-11-08</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                <div>
                  <p className="text-text font-medium">Stock Removed</p>
                  <p className="text-sm text-textSecondary">-15 units</p>
                </div>
                <span className="text-xs text-textSecondary">2023-11-07</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="button-responsive w-full bg-green-500 text-white hover:bg-green-600">
                Add Stock
              </button>
              <button className="button-responsive w-full bg-yellow-500 text-white hover:bg-yellow-600">
                Remove Stock
              </button>
            </div>
          </div>

          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Stock Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-textSecondary">Status</span>
                <span className="text-green-500 font-medium">In Stock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Last Updated</span>
                <span className="text-text">2023-11-08</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Location</span>
                <span className="text-text">Warehouse A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}