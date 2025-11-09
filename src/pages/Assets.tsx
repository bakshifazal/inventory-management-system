import React from 'react'
import { Link } from 'react-router-dom'

export function Assets() {
  const assets = [
    {
      id: '1',
      name: 'MacBook Pro M2',
      type: 'Laptop',
      status: 'Active',
      assignedTo: 'John Doe',
      lastUpdated: '2023-11-08',
    },
    // ... more assets
  ]

  return (
    <div className="space-responsive">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-responsive-xl font-bold text-text">Assets</h1>
          <p className="text-sm text-textSecondary mt-1">Manage your organization's assets</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="search"
            placeholder="Search assets..."
            className="input-responsive"
          />
          <button
            className="button-responsive bg-primary text-white hover:bg-primary/90"
          >
            Add Asset
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid-responsive">
        {assets.map((asset) => (
          <Link
            key={asset.id}
            to={`/assets/${asset.id}`}
            className="card-responsive hover:bg-surface/80 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🖥️</span>
                <div>
                  <h3 className="text-responsive-base font-medium text-text">
                    {asset.name}
                  </h3>
                  <p className="text-sm text-textSecondary">{asset.type}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                asset.status === 'Active' 
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {asset.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Assigned to</span>
                <span className="text-text font-medium">{asset.assignedTo}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Last updated</span>
                <span className="text-text">{asset.lastUpdated}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}