import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings } from 'lucide-react';
import { useAuth } from '../../../core/providers/AuthProvider';

export function Header({ onMenuToggle }) {
  const { user } = useAuth();
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-bg-secondary/50 backdrop-blur-heavy border-b border-border-primary px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30"
    >
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Search */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search students, payments, courses..."
            className="w-full pl-12 pr-4 py-2.5 bg-bg-card border border-border-primary rounded-xl 
                     text-text-primary placeholder-text-muted 
                     focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary 
                     transition-all duration-200"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface-hover transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-danger rounded-full" />
        </button>
        
        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-surface-hover transition-colors" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>
        
        {/* User Avatar */}
        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-border-primary">
          <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-text-muted capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;