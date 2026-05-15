import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Plus, Edit, Trash2, Eye, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { formatCurrency, formatDate, formatStatus, formatPhone } from '../../core/utils/formatters';
import { Table } from '../../shared/components/ui/Table';
import { SearchFilters } from './SearchFilters';

export default function StudentList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    licenseType: 'all',
    dateRange: 'all',
  });
  
  // Fetch students
  const { data: students, isLoading } = useQuery({
    queryKey: ['students', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.search) params.append('q', filters.search);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.licenseType !== 'all') params.append('type', filters.licenseType);
      
      const response = await api.get(`/students?${params}`);
      return response.data;
    },
  });
  
  // Table columns
  const columns = [
    {
      header: 'Student',
      accessor: 'name',
      cell: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-medium">
            {value?.charAt(0) || '?'}
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-sm text-text-muted">{row.registrationNo}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: (value) => (
        <div>
          <p className="font-medium">{formatPhone(value)}</p>
          <p className="text-sm text-text-muted truncate max-w-[150px]">{value}</p>
        </div>
      ),
    },
    {
      header: 'Course',
      accessor: 'licenseType',
      cell: (value) => (
        <span className="badge badge-info">{value}</span>
      ),
    },
    {
      header: 'Enrolled',
      accessor: 'enrollmentDate',
      cell: (value) => formatDate(value, { month: 'short', day: 'numeric' }),
    },
    {
      header: 'Fees',
      accessor: 'fees',
      cell: (value) => (
        <span className="font-semibold">{formatCurrency(value)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        const { label, variant } = formatStatus(value);
        return <span className={`badge badge-${variant}`}>{label}</span>;
      },
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (value, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(`/students/${value}`)}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {/* Edit logic */}}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => {/* Delete logic */}}
            className="p-2 rounded-lg hover:bg-accent-danger/10 text-accent-danger transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Students</h1>
          <p className="text-text-secondary">Manage student enrollments and progress</p>
        </div>
        <button
          onClick={() => navigate('/students/new')}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>
      
      {/* Filters */}
      <SearchFilters
        filters={filters}
        onChange={setFilters}
        onExport={() => {/* Export logic */}}
      />
      
      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <Table
          columns={columns}
          data={students || []}
          emptyMessage="No students found"
          isLoading={isLoading}
          pagination={{
            currentPage: 1,
            totalPages: 5,
            totalItems: students?.length || 0,
          }}
        />
      </motion.div>
      
      {/* Quick Stats */}
      {students?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: students.length, color: 'text-accent-primary' },
            { label: 'Active', value: students.filter(s => s.status === 'ACTIVE').length, color: 'text-accent-success' },
            { label: 'Completed', value: students.filter(s => s.status === 'COMPLETED').length, color: 'text-accent-success' },
            { label: 'Pending Fees', value: `₹${students.filter(s => s.paymentStatus === 'PENDING').reduce((sum, s) => sum + (s.fees || 0), 0)}`, color: 'text-accent-warning' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}