import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Table({
  columns,
  data = [],
  emptyMessage = 'No data available',
  isLoading = false,
  pagination = null,
  onPageChange,
}) {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-primary">
              {columns.map((col, i) => (
                <th key={i} className="text-left py-3 px-4">
                  <div className="h-4 bg-bg-tertiary rounded skeleton" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, row) => (
              <tr key={row} className="border-b border-border-primary/50">
                {columns.map((_, col) => (
                  <td key={col} className="py-3 px-4">
                    <div className="h-4 bg-bg-tertiary rounded skeleton" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-primary">
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 text-sm font-medium text-text-secondary"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <motion.tr
              key={row.id || rowIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rowIndex * 0.03 }}
              className="border-b border-border-primary/50 hover:bg-surface-hover/50 transition-colors"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-4 px-4 text-sm">
                  {col.cell
                    ? col.cell(row[col.accessor], row)
                    : row[col.accessor]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between py-4 px-4 border-t border-border-primary">
          <p className="text-sm text-text-muted">
            Showing {(pagination.currentPage - 1) * 10 + 1} to{' '}
            {Math.min(pagination.currentPage * 10, pagination.totalItems)} of{' '}
            {pagination.totalItems} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-lg hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange?.(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  pagination.currentPage === i + 1
                    ? 'bg-accent-primary text-white'
                    : 'hover:bg-surface-hover'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 rounded-lg hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;