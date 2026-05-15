import React, { useState } from 'react';  // ✅ React must be imported
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../core/providers/AuthProvider';
import { useToast } from '../../shared/components/ui/Toast';
import { validateEmail, validatePhone, validatePassword, validateName } from '../../core/utils/validators';
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      licenseType: 'LMV',
      agreeTerms: false,
    }
  });
  
  const password = watch('password');
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerUser({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        licenseType: data.licenseType,
        role: 'STUDENT',
      });
      
      if (result.success) {
        setRegistered(true);
        toast({
          title: 'Registration Successful! 🎉',
          description: 'Please check your email to verify your account',
          variant: 'success'
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: result.error || 'Please try again',
          variant: 'error'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-accent-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to Dhanalakshmi!</h2>
          <p className="text-text-secondary mb-6">
            Your account has been created. Please verify your email to get started.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="btn-primary flex-1">
              Go to Login
            </button>
            <Link to="/" className="btn-secondary flex-1">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg"
      >
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        {/* Register Card */}
        <div className="glass-panel p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-display mb-2">Create Account</h1>
            <p className="text-text-secondary">Join Dhanalakshmi Heavy Driving School</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="input-label">Full Name *</label>
              <input
                {...register('fullName', {
                  required: 'Full name is required',
                  validate: (v) => validateName(v)
                })}
                className={`input-field ${errors.fullName ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="John Doe"
                disabled={isLoading}
              />
              {errors.fullName && <p className="text-sm text-accent-danger">{errors.fullName.message}</p>}
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="input-label">Email Address *</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (v) => validateEmail(v)
                })}
                type="email"
                className={`input-field ${errors.email ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="john@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-accent-danger">{errors.email.message}</p>}
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <label className="input-label">Phone Number *</label>
              <input
                {...register('phone', {
                  required: 'Phone is required',
                  validate: (v) => validatePhone(v)
                })}
                type="tel"
                className={`input-field ${errors.phone ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="+91 9443822462"
                disabled={isLoading}
              />
              {errors.phone && <p className="text-sm text-accent-danger">{errors.phone.message}</p>}
            </div>
            
            {/* License Type */}
            <div className="space-y-2">
              <label className="input-label">License Type *</label>
              <select
                {...register('licenseType', { required: 'License type is required' })}
                className="select-field"
                disabled={isLoading}
              >
                <option value="LMV">Light Motor Vehicle (LMV)</option>
                <option value="HMV">Heavy Motor Vehicle (HMV)</option>
                <option value="TRUCK">Truck</option>
                <option value="BUS">Bus</option>
                <option value="TRACTOR">Tractor</option>
              </select>
              {errors.licenseType && <p className="text-sm text-accent-danger">{errors.licenseType.message}</p>}
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <label className="input-label">Password *</label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    validate: (v) => validatePassword(v)
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field pr-12 ${errors.password ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-accent-danger">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="input-label">Confirm Password *</label>
              <div className="relative">
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (v) => v === password || 'Passwords do not match'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`input-field pr-12 ${errors.confirmPassword ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-accent-danger">{errors.confirmPassword.message}</p>}
            </div>
            
            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                {...register('agreeTerms', { required: 'You must agree to the terms' })}
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-border-primary bg-bg-card text-accent-primary focus:ring-accent-primary/50"
                disabled={isLoading}
              />
              <label className="text-sm text-text-secondary">
                I agree to the <a href="/terms" className="text-accent-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-accent-primary hover:underline">Privacy Policy</a> *
              </label>
            </div>
            {errors.agreeTerms && <p className="text-sm text-accent-danger">{errors.agreeTerms.message}</p>}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="btn-primary w-full py-3 text-base mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="divider" />
          
          {/* Login Link */}
          <p className="text-center text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-primary hover:text-accent-primaryHover font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
export default Register;