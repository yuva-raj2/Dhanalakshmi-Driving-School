import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const variants = {
  success: 'bg-accent-success/10 border-accent-success text-accent-success',
  error: 'bg-accent-danger/10 border-accent-danger text-accent-danger',
  warning: 'bg-accent-warning/10 border-accent-warning text-accent-warning',
  info: 'bg-accent-primary/10 border-accent-primary text-accent-primary',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      duration: 5000,
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove
    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
    
    return id;
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  const toast = useCallback((options) => {
    return addToast(options);
  }, [addToast]);
  
  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.variant] || icons.info;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20 }}
                className={`glass-panel border-l-4 ${variants[t.variant]} p-4`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    {t.title && (
                      <p className="font-medium mb-0.5">{t.title}</p>
                    )}
                    {t.description && (
                      <p className="text-sm opacity-90">{t.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeToast(t.id)}
                    className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastProvider;