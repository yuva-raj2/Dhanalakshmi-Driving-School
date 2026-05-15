import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-accent-primary hover:bg-accent-primaryHover text-white shadow-lg shadow-accent-primary/25 focus:ring-accent-primary',
    secondary: 'bg-bg-tertiary hover:bg-border-primary text-text-primary border border-border-primary focus:ring-border-primary',
    outline: 'border border-accent-primary text-accent-primary hover:bg-accent-primary/10 focus:ring-accent-primary',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover focus:ring-border-primary',
    danger: 'bg-accent-danger hover:bg-red-600 text-white shadow-lg shadow-accent-danger/25 focus:ring-accent-danger',
    success: 'bg-accent-success hover:bg-green-600 text-white shadow-lg shadow-accent-success/25 focus:ring-accent-success',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };
  
  const classes = twMerge(
    clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )
  );
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
}

export default Button;