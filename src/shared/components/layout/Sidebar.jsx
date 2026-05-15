import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, Calendar, 
  Settings, LogOut, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useAuth } from '../../../core/providers/AuthProvider';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/my-dashboard', label: 'My Dashboard', icon: LayoutDashboard, roles: ['STUDENT'] },
  { to: '/students', label: 'Students', icon: Users, roles: ['ADMIN', 'SUPER_ADMIN'] },
  { to: '/attendance', label: 'Attendance', icon: Calendar, roles: ['ADMIN', 'INSTRUCTOR'] },
  { to: '/payments', label: 'Payments', icon: CreditCard, roles: ['ADMIN', 'STUDENT'] },
  { to: '/settings', label: 'Settings', icon: Settings, roles: ['ADMIN', 'STUDENT'] },
];

export function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  // Filter nav items by role
  const filteredNavItems = navItems.filter(item => 
    !item.roles || item.roles.includes(user?.role)
  );
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onToggle?.(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-bg-secondary border-r border-border-primary 
                   flex flex-col transform transition-transform duration-300 lg:transform-none ${
                     isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                   }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-primary">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">DH</span>
            </div>
            <span className="font-bold font-display text-lg hidden sm:block">Dhanalakshmi DS</span>
          </Link>
          <button 
            onClick={() => onToggle?.(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {filteredNavItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => onToggle?.(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent-primary/10 text-accent-primary font-medium' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-accent-primary' : ''}`} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border-primary space-y-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-text-muted truncate capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-accent-danger hover:bg-accent-danger/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;