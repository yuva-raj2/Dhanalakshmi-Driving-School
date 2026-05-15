import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Download, Eye, FileText } from 'lucide-react';
import { useAuth } from '../../core/providers/AuthProvider';
import api from '../../lib/axios';
import { formatCurrency, formatDate, formatStatus } from '../../core/utils/formatters';
import { Table } from '../../shared/components/ui/Table';
import { ReceiptModal } from './ReceiptModal';

export default function PaymentHistory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Fetch payments
  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      const response = await api.get(`/payments/student/${user?.id}`);
      return response.data;
    },
    enabled: !!user?.id,
  });
  
  // Filter payments
  const filteredPayments = React.useMemo(() => {
    if (!payments) return [];
    
    return payments.filter(payment => {
      const matchesSearch = 
        payment.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.course?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, statusFilter]);
  
  // Table columns
  const columns = [
    {
      header: 'Receipt #',
      accessor: 'receiptNumber',
      cell: (value) => <span className="font-mono text-sm">{value}</span>,
    },
    {
      header: 'Course',
      accessor: 'course',
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (value) => <span className="font-semibold">{formatCurrency(value)}</span>,
    },
    {
      header: 'Date',
      accessor: 'paidAt',
      cell: (value) => formatDate(value, { month: 'short', day: 'numeric', year: 'numeric' }),
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
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPayment(row);
              setShowReceipt(true);
            }}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            title="View Receipt"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => {/* Download logic */}}
            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];
  
  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="space-y-4">
          <div className="h-10 bg-bg-tertiary rounded-lg skeleton" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-bg-tertiary rounded-lg skeleton" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">Payment History</h1>
          <p className="text-text-secondary">View and manage your course payments</p>
        </div>
        <button className="btn-primary">
          <FileText className="w-4 h-4" />
          Make Payment
        </button>
      </div>
      
      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search by receipt or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select-field w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="SUCCESS">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
          
          {/* Export */}
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="glass-card overflow-hidden">
        <Table
          columns={columns}
          data={filteredPayments}
          emptyMessage="No payments found"
          isLoading={isLoading}
        />
      </div>
      
      {/* Summary */}
      {payments?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="font-medium mb-4">Payment Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-text-muted">Total Paid</p>
              <p className="text-xl font-bold text-accent-success">
                {formatCurrency(payments.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Pending</p>
              <p className="text-xl font-bold text-accent-warning">
                {formatCurrency(payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Transactions</p>
              <p className="text-xl font-bold">{payments.length}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Success Rate</p>
              <p className="text-xl font-bold text-accent-success">
                {Math.round((payments.filter(p => p.status === 'SUCCESS').length / payments.length) * 100)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Receipt Modal */}
      {showReceipt && selectedPayment && (
        <ReceiptModal
          payment={selectedPayment}
          onClose={() => {
            setShowReceipt(false);
            setSelectedPayment(null);
          }}
        />
      )}
    </div>
  );
}