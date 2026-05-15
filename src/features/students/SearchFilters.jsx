import React from 'react';
import { Search, Filter, X, Download } from 'lucide-react';

export function SearchFilters({ filters, onChange, onExport }) {
  const handleChange = (key, value) => {
    onChange(prev => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    onChange({
      search: '',
      status: 'all',
      licenseType: 'all',
      dateRange: 'all',
    });
  };
  
  const hasActiveFilters = filters.search || filters.status !== 'all' || filters.licenseType !== 'all';
  
  return (
    <div className="glass-card p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name, registration number, or phone..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-field pl-12"
          />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="select-field"
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="COMPLETED">Completed</option>
          </select>
          
          {/* License Type Filter */}
          <select
            value={filters.licenseType}
            onChange={(e) => handleChange('licenseType', e.target.value)}
            className="select-field"
          >
            <option value="all">All License Types</option>
            <option value="LMV">LMV</option>
            <option value="HMV">HMV</option>
            <option value="TRUCK">Truck</option>
            <option value="BUS">Bus</option>
          </select>
          
          {/* Date Range */}
          <select
            value={filters.dateRange}
            onChange={(e) => handleChange('dateRange', e.target.value)}
            className="select-field"
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="btn-ghost flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
          
          {/* Export */}
          <button
            onClick={onExport}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
      
      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border-primary">
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm">
              Search: {filters.search}
              <button
                onClick={() => handleChange('search', '')}
                className="hover:text-accent-danger"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.status !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-success/10 text-accent-success text-sm">
              Status: {filters.status}
              <button
                onClick={() => handleChange('status', 'all')}
                className="hover:text-accent-danger"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.licenseType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-warning/10 text-accent-warning text-sm">
              Type: {filters.licenseType}
              <button
                onClick={() => handleChange('licenseType', 'all')}
                className="hover:text-accent-danger"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchFilters;