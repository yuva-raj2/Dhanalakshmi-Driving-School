import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({
  children,
  className,
  hover = false,
  padding = 'p-6',
  ...props
}) {
  const classes = twMerge(
    clsx(
      'glass-panel',
      padding,
      hover && 'hover:bg-surface-hover transition-all duration-300 cursor-pointer',
      className
    )
  );
  
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx('pb-4 border-b border-border-primary', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={clsx('text-lg font-semibold', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={clsx('text-sm text-text-muted', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('pt-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={clsx('pt-4 mt-4 border-t border-border-primary flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;