import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * PublicLayout — wrapper for unauthenticated pages.
 * Full implementation (Navbar, Footer) delivered in Phase 2.
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-mesh" style={{ background: 'var(--color-bg-primary)' }}>
      <Outlet />
    </div>
  );
}