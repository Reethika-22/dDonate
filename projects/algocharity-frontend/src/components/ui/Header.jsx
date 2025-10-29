import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState('0.00');
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

  const handleWalletConnect = () => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletBalance('0.00');
    } else {
      setIsWalletConnected(true);
      setWalletBalance('125.50');
    }
  };

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
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Wallet Status & Actions */}
        <div className="flex items-center space-x-3">
          {/* Wallet Status Indicator - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isWalletConnected ? (
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-mono text-success">{walletBalance} ALGO</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-sm text-muted-foreground">Wallet Disconnected</span>
              </div>
            )}

            <Button
              variant={isWalletConnected ? "outline" : "default"}
              size="sm"
              onClick={handleWalletConnect}
              iconName={isWalletConnected ? "Unlink" : "Wallet"}
              iconPosition="left"
            >
              {isWalletConnected ? 'Disconnect' : 'Connect Wallet'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${isActivePath(item?.path)
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

            {/* Mobile Wallet Section */}
            <div className="pt-4 mt-4 border-t border-border">
              {isWalletConnected ? (
                <div className="flex items-center justify-between px-4 py-3 bg-success/10 border border-success/20 rounded-lg mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-success">Connected</span>
                  </div>
                  <span className="text-sm font-mono text-success">{walletBalance} ALGO</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-3 bg-muted rounded-lg mb-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Wallet Disconnected</span>
                </div>
              )}

              <Button
                variant={isWalletConnected ? "outline" : "default"}
                fullWidth
                onClick={handleWalletConnect}
                iconName={isWalletConnected ? "Unlink" : "Wallet"}
                iconPosition="left"
              >
                {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
