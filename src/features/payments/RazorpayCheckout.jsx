import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../../shared/hooks/useToast';

export function RazorpayCheckout({ amount, studentId, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { toast } = useToast();
  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }
      
      // Create order (call your backend)
      const orderResponse = await fetch('/api/v1/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency: 'INR',
          studentId,
          receipt: `receipt_${Date.now()}`
        })
      });
      
      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }
      
      const orderData = await orderResponse.json();
      
      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Dhanalakshmi Heavy Driving School',
        description: 'Course Fee Payment',
        image: '/logo.png',
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment on backend
          const verifyResponse = await fetch('/api/v1/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          
          if (verifyResponse.ok) {
            setPaymentStatus('success');
            toast({
              title: 'Payment Successful! 🎉',
              description: 'Your course fee has been paid successfully',
              variant: 'success'
            });
            onSuccess?.(response);
          } else {
            throw new Error('Payment verification failed');
          }
        },
        prefill: {
          name: studentId?.name || '',
          email: studentId?.email || '',
          contact: studentId?.phone || ''
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: function () {
            onCancel?.();
            toast({
              title: 'Payment Cancelled',
              description: 'You can complete payment anytime from your dashboard',
              variant: 'info'
            });
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      toast({
        title: 'Payment Failed',
        description: error.message || 'Please try again later',
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 max-w-md mx-auto"
    >
      {/* Status Messages */}
      {paymentStatus === 'success' && (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-accent-success mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
          <p className="text-text-secondary">Receipt has been sent to your email</p>
        </div>
      )}
      
      {paymentStatus === 'failed' && (
        <div className="text-center py-8">
          <AlertCircle className="w-16 h-16 text-accent-danger mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
          <p className="text-text-secondary mb-4">Please try again or contact support</p>
          <button onClick={handlePayment} className="btn-primary">
            Retry Payment
          </button>
        </div>
      )}
      
      {/* Payment Form */}
      {!paymentStatus && (
        <>
          <div className="text-center mb-6">
            <CreditCard className="w-12 h-12 text-accent-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Complete Payment</h3>
            <p className="text-text-secondary">Secure payment via Razorpay</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-4 bg-bg-card rounded-xl">
              <span className="text-text-secondary">Amount</span>
              <span className="text-2xl font-bold">₹{amount.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-accent-primary/5 rounded-lg">
              <Shield className="w-5 h-5 text-accent-primary flex-shrink-0" />
              <p className="text-sm text-text-secondary">
                Your payment is secured with 256-bit SSL encryption
              </p>
            </div>
          </div>
          
          <button
            onClick={handlePayment}
            disabled={loading}
            className="btn-primary w-full py-3 text-base"
          >
            {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString('en-IN')}`}
          </button>
          
          <p className="text-center text-xs text-text-muted mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </>
      )}
    </motion.div>
  );
}