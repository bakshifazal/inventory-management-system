import React, { useState } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterDropdownProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  label: string
}

export function FilterDropdown({ options, value, onChange, label }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    closeDropdown()
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span>{label}: {options.find(opt => opt.value === value)?.label || 'All'}</span>
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-surface border border-border rounded-xl shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-text"
              onClick={() => handleOptionClick('all')}
            >
              All
            </li>
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 hover:bg-primary/10 cursor-pointer ${
                  value === option.value ? 'bg-primary/10 text-primary' : 'text-text'
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
