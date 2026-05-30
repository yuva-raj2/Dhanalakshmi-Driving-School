import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * AppLayout — authenticated app shell (Sidebar + Header + Main).
 * Full implementation delivered in Phase 2.
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg-primary)' }}>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}