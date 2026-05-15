import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import api from '../../lib/axios';
import { useToast } from '../../shared/components/ui/Toast';
import { validateEmail } from '../../core/utils/validators';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: { email: '' }
  });
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSent(true);
      toast({
        title: 'Email Sent! ✉️',
        description: 'Check your inbox for password reset instructions',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to send reset email',
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 max-w-md w-full text-center"
        >
          <Mail className="w-16 h-16 text-accent-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
          <p className="text-text-secondary mb-6">
            We've sent password reset instructions to your email address.
          </p>
          <button onClick={() => navigate('/login')} className="btn-primary w-full">
            Back to Login
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        {/* Back Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
        
        {/* Forgot Password Card */}
        <div className="glass-panel p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-accent-primary" />
            </div>
            <h1 className="text-2xl font-bold font-display mb-2">Forgot Password?</h1>
            <p className="text-text-secondary">
              Enter your email and we'll send you reset instructions
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="input-label">Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (v) => validateEmail(v)
                })}
                type="email"
                className={`input-field ${errors.email ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="admin@drivingschool.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          {/* Help Text */}
          <p className="text-center text-sm text-text-muted mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-accent-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}