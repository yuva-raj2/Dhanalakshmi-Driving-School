import React from 'react';
import { motion } from 'framer-motion';

export default function PageLoader({ message = 'Loading…' }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: 'var(--color-bg-primary)' }}
      role="status"
      aria-label={message}
    >
      {/* Animated logo/spinner */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#2563EB',
            borderRightColor: '#7C3AED',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.div
            className="w-6 h-6 rounded-full"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Text */}
      <motion.p
        className="text-sm text-slate-400 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {message}
      </motion.p>

      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{message}</span>
    </div>
  );
}