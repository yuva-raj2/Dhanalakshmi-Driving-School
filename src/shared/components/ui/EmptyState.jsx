import React from 'react';
import { motion } from 'framer-motion';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-text-muted" />
        </div>
      )}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-text-muted mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </motion.div>
  );
}

export default EmptyState;