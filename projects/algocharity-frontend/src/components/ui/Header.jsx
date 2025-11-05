import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Discover Causes',
      path: '/landing-page',
      icon: 'Heart',
      description: 'Browse and explore charitable causes'
    },
    {
      label: 'Charity Portal',
      path: '/charity-dashboard',
      icon: 'Building2',
      description: 'Manage your charitable organization'
    },
    {
      label: 'Admin Center',
      path: '/admin-panel',
      icon: 'Shield',
      description: 'Platform administration and oversight'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path ||
      (path === '/landing-page' && location?.pathname === '/cause-details');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/landing-page" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Heart" size={20} color="white" />
          </div>
          <span className="text-xl font-bold text-foreground">TrustGive</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <div>
                  <div>{item?.label}</div>
                  <div className="text-xs opacity-70">{item?.description}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
