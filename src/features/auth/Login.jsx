import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../store/authStore';
import { useToast } from '../../shared/components/ui/Toast';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      
      if (result.success) {
        toast({
          title: 'Welcome back! 👋',
          description: 'Successfully signed in to your account',
          variant: 'success'
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Sign in failed',
          description: result.error || 'Please check your credentials',
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
        className="relative w-full max-w-md"
      >
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        {/* Login Card */}
        <div className="glass-panel p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-purple flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">DH</span>
            </div>
            <h1 className="text-2xl font-bold font-display mb-2">Welcome Back</h1>
            <p className="text-text-secondary">Sign in to your Dhanalakshmi account</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="input-label">Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className={`input-field ${errors.email ? 'border-accent-danger focus:ring-accent-danger/50' : ''}`}
                placeholder="admin@drivingschool.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-accent-danger">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label className="input-label">Password</label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
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
              {errors.password && (
                <p className="text-sm text-accent-danger">{errors.password.message}</p>
              )}
            </div>
            
            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('remember')}
                  type="checkbox"
                  className="w-4 h-4 rounded border-border-primary bg-bg-card text-accent-primary focus:ring-accent-primary/50"
                  disabled={isLoading}
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent-primary hover:text-accent-primaryHover transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isValid}
              className="btn-primary w-full py-3 text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="divider" />
          
          {/* Register Link */}
          <p className="text-center text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-primary hover:text-accent-primaryHover font-medium">
              Create account
            </Link>
          </p>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-text-muted mt-6">
          © 2024 Dhanalakshmi Heavy Driving School. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}