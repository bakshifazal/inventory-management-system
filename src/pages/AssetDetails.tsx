import React from 'react'
import { useParams } from 'react-router-dom'

export function AssetDetails() {
  const { id } = useParams()

  return (
    <div className="space-responsive">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-responsive-xl font-bold text-text">Asset Details</h1>
          <p className="text-sm text-textSecondary mt-1">View and manage asset information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-responsive">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-4xl">🖥️</span>
              <div>
                <h2 className="text-xl font-bold text-text">MacBook Pro M2</h2>
                <p className="text-sm text-textSecondary">Serial: MP2023-{id}</p>
              </div>
            </div>
          </div>

          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Specifications</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-textSecondary">Model</span>
                <span className="text-text font-medium">MacBook Pro 14"</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-textSecondary">CPU</span>
                <span className="text-text font-medium">Apple M2 Pro</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-textSecondary">Memory</span>
                <span className="text-text font-medium">32GB</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-textSecondary">Storage</span>
                <span className="text-text font-medium">1TB SSD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Assignment</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div>
                  <p className="text-text font-medium">John Doe</p>
                  <p className="text-xs text-textSecondary">Engineering</p>
                </div>
              </div>
              <button className="button-responsive w-full bg-surface border border-border hover:bg-surface/80">
                Reassign
              </button>
            </div>
          </div>

          <div className="card-responsive">
            <h3 className="text-lg font-bold text-text mb-4">Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-textSecondary">Condition</span>
                <span className="text-green-500 font-medium">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Last Maintenance</span>
                <span className="text-text">2023-10-15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}