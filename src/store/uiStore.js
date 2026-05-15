import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Sidebar state
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  // Mobile menu state
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  
  // Toast state (if not using ToastProvider)
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: Date.now(), ...toast }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),
  
  // Loading state
  globalLoading: false,
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));

export default useUIStore;