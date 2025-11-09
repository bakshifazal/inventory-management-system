import React from 'react'
import { Link } from 'react-router-dom'

export function Stock() {
  const stockItems = [
    {
      id: '1',
      name: 'USB-C Cables',
      quantity: 145,
      minQuantity: 50,
      status: 'In Stock',
      lastOrdered: '2023-11-01',
    },
    // ... more stock items
  ]

  return (
    <div className="space-responsive">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-responsive-xl font-bold text-text">Stock Inventory</h1>
          <p className="text-sm text-textSecondary mt-1">Manage your stock items and inventory</p>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="search"
            placeholder="Search stock..."
            className="input-responsive"
          />
          <button
            className="button-responsive bg-primary text-white hover:bg-primary/90"
          >
            Add Stock Item
          </button>
        </div>
      </div>

      {/* Stock Items Grid */}
      <div className="grid-responsive">
        {stockItems.map((item) => (
          <Link
            key={item.id}
            to={`/stock/${item.id}`}
            className="card-responsive hover:bg-surface/80 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📦</span>
                <div>
                  <h3 className="text-responsive-base font-medium text-text">
                    {item.name}
                  </h3>
                  <p className="text-sm text-textSecondary">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                item.quantity > item.minQuantity
                  ? 'bg-green-500/10 text-green-500'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {item.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Min. Quantity</span>
                <span className="text-text font-medium">{item.minQuantity}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-textSecondary">Last ordered</span>
                <span className="text-text">{item.lastOrdered}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}