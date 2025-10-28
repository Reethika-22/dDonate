import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();

  const pathMap = {
    '/landing-page': { label: 'Discover Causes', parent: null },
    '/cause-details': { label: 'Cause Details', parent: '/landing-page' },
    '/charity-dashboard': { label: 'Charity Portal', parent: null },
    '/admin-panel': { label: 'Admin Center', parent: null },
    '/wallet-integration': { label: 'Wallet Integration', parent: null }
  };

  const currentPath = pathMap?.[location?.pathname];

  if (!currentPath) return null;

  const breadcrumbs = [];

  if (currentPath?.parent) {
    const parentPath = pathMap?.[currentPath?.parent];
    breadcrumbs?.push({
      label: parentPath?.label,
      path: currentPath?.parent,
      isActive: false
    });
  }

  breadcrumbs?.push({
    label: currentPath?.label,
    path: location?.pathname,
    isActive: true
  });

  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {crumb?.isActive ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground transition-smooth"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
