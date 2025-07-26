"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Filter } from "lucide-react"

interface ProductFilterProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
}

interface FilterOptions {
  category: string[]
  priceRange: string
  size: string[]
  sortBy: string
}

export function ProductFilter({ isOpen, onClose, onApplyFilters }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: "",
    size: [],
    sortBy: "newest",
  })

  if (!isOpen) return null

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }))
  }

  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      size: prev.size.includes(size) ? prev.size.filter((s) => s !== size) : [...prev.size, size],
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    setFilters({
      category: [],
      priceRange: "",
      size: [],
      sortBy: "newest",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {["t-shirt", "hoodie"].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {[
                  { label: "Under €30", value: "0-30" },
                  { label: "€30 - €50", value: "30-50" },
                  { label: "€50 - €70", value: "50-70" },
                  { label: "Over €70", value: "70+" },
                ].map((range) => (
                  <label key={range.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: e.target.value }))}
                      className="border-gray-300"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-2 border rounded-lg text-sm transition-colors ${
                      filters.size.includes(size)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <Button variant="outline" onClick={handleClear} className="flex-1 bg-transparent">
              Clear All
            </Button>
            <Button onClick={handleApply} className="flex-1 bg-black hover:bg-gray-800">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
