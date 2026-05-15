import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb({ items = [] }) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if not provided
  const autoItems = React.useMemo(() => {
    if (items.length > 0) return items;
    
    const paths = location.pathname.split('/').filter(Boolean);
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href: index === paths.length - 1 ? null : href,
      };
    });
  }, [items, location.pathname]);
  
  return (
    <nav className="flex items-center gap-2 text-sm text-text-muted">
      <Link to="/" className="flex items-center gap-1 hover:text-text-primary transition-colors">
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      {autoItems.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-text-primary transition-colors truncate max-w-[150px]"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary truncate max-w-[150px]">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumb;