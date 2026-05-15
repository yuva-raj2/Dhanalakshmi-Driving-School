import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle, Copy } from 'lucide-react';
import { formatCurrency, formatDate, formatPhone } from '../../core/utils/formatters';
import { APP } from '../../core/utils/constants';

export function ReceiptModal({ payment, onClose }) {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    // In production, this would trigger PDF generation
    alert('Receipt download would start here');
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  if (!payment) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-primary">
            <h3 className="text-xl font-bold">Payment Receipt</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Receipt Content */}
          <div className="p-6" id="receipt-content">
            {/* School Header */}
            <div className="text-center mb-6 pb-6 border-b border-border-primary">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-purple flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-white">DH</span>
              </div>
              <h1 className="text-xl font-bold font-display">{APP.NAME}</h1>
              <p className="text-sm text-text-muted">Official Payment Receipt</p>
            </div>
            
            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-text-muted">Receipt Number</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium">{payment.receiptNumber}</p>
                  <button
                    onClick={() => copyToClipboard(payment.receiptNumber)}
                    className="p-1 rounded hover:bg-surface-hover transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted">Date</p>
                <p className="font-medium">{formatDate(payment.paidAt)}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Payment ID</p>
                <p className="font-mono text-sm">{payment.razorpayPaymentId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-muted">Status</p>
                <span className={`badge ${
                  payment.status === 'SUCCESS' ? 'badge-success' : 'badge-warning'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
            
            {/* Student Info */}
            <div className="bg-bg-card rounded-xl p-4 mb-6">
              <h4 className="font-medium mb-3">Student Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-text-muted">Name</p>
                  <p className="font-medium">{payment.studentName}</p>
                </div>
                <div>
                  <p className="text-text-muted">Phone</p>
                  <p className="font-medium">{formatPhone(payment.studentPhone)}</p>
                </div>
                <div>
                  <p className="text-text-muted">Email</p>
                  <p className="font-medium">{payment.studentEmail}</p>
                </div>
                <div>
                  <p className="text-text-muted">Registration No.</p>
                  <p className="font-medium">{payment.studentRegNo}</p>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="bg-bg-card rounded-xl p-4 mb-6">
              <h4 className="font-medium mb-3">Payment Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Course</span>
                  <span className="font-medium">{payment.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Payment Method</span>
                  <span className="font-medium">{payment.method || 'Razorpay'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Transaction ID</span>
                  <span className="font-mono text-sm">{payment.transactionId}</span>
                </div>
                <div className="border-t border-border-primary pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Amount Paid</span>
                    <span className="text-2xl font-bold text-accent-primary">
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Success Message */}
            {payment.status === 'SUCCESS' && (
              <div className="flex items-center gap-3 p-4 bg-accent-success/10 rounded-xl text-accent-success">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Payment Successful</p>
                  <p className="text-sm">Your course enrollment is confirmed. Check your email for details.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 p-6 border-t border-border-primary">
            <button
              onClick={handleDownload}
              className="btn-secondary flex-1"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="btn-secondary flex-1"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
          
          {/* Footer */}
          <div className="px-6 pb-6 text-center text-xs text-text-muted">
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p className="mt-1">For support, contact {APP.SUPPORT_EMAIL}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ReceiptModal;