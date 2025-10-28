import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import PendingApprovals from './components/PendingApprovals';
import PlatformAnalytics from './components/PlatformAnalytics';
import CharityManagement from './components/CharityManagement';
import TransactionOversight from './components/TransactionOversight';
import SystemConfiguration from './components/SystemConfiguration';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationSections = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      description: 'Platform analytics and key metrics'
    },
    {
      id: 'approvals',
      label: 'Pending Approvals',
      icon: 'FileCheck',
      description: 'Review charity applications',
      badge: 3
    },
    {
      id: 'charities',
      label: 'Charity Management',
      icon: 'Building2',
      description: 'Manage registered organizations'
    },
    {
      id: 'transactions',
      label: 'Transaction Oversight',
      icon: 'Activity',
      description: 'Monitor all platform transactions'
    },
    {
      id: 'configuration',
      label: 'System Configuration',
      icon: 'Settings',
      description: 'Platform settings and configuration'
    }
  ];

  const quickStats = [
    {
      label: 'Total Donated',
      value: '1,247,850 ALGO',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-primary'
    },
    {
      label: 'Active Charities',
      value: '42',
      change: '+3 this week',
      changeType: 'positive',
      icon: 'Building2',
      color: 'text-secondary'
    },
    {
      label: 'Pending Approvals',
      value: '3',
      change: 'Requires attention',
      changeType: 'warning',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Fraud Alerts',
      value: '2',
      change: 'High priority',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'text-error'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'charity_approved',
      message: 'Clean Water Initiative approved and activated',
      timestamp: '2025-10-28 06:30:00',
      severity: 'success'
    },
    {
      id: 2,
      type: 'fraud_detected',
      message: 'Suspicious transaction pattern detected for Green Earth Conservation',
      timestamp: '2025-10-28 05:45:00',
      severity: 'error'
    },
    {
      id: 3,
      type: 'large_donation',
      message: 'Large donation of 25,000 ALGO received by Education for All Foundation',
      timestamp: '2025-10-28 04:20:00',
      severity: 'info'
    },
    {
      id: 4,
      type: 'charity_registered',
      message: 'New charity application received from Animal Rescue Network',
      timestamp: '2025-10-28 03:15:00',
      severity: 'info'
    },
    {
      id: 5,
      type: 'withdrawal_completed',
      message: 'Medical Aid International completed withdrawal of 15,000 ALGO',
      timestamp: '2025-10-28 02:10:00',
      severity: 'success'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats?.map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name={stat?.icon} size={24} className={stat?.color} />
                    <span className="text-sm font-medium text-muted-foreground">{stat?.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                  <div className={`text-sm ${getChangeColor(stat?.changeType)}`}>{stat?.change}</div>
                </div>
              ))}
            </div>
            {/* Recent Activities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
                <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className={`p-2 rounded-full border ${getSeverityColor(activity?.severity)}`}>
                      <Icon name={getSeverityIcon(activity?.severity)} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity?.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp)?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveSection('approvals')}
                  className="p-4 text-left bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  <Icon name="FileCheck" size={24} className="text-warning mb-2" />
                  <h4 className="font-medium text-foreground">Review Approvals</h4>
                  <p className="text-sm text-muted-foreground">3 pending applications</p>
                </button>

                <button
                  onClick={() => setActiveSection('transactions')}
                  className="p-4 text-left bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  <Icon name="Activity" size={24} className="text-primary mb-2" />
                  <h4 className="font-medium text-foreground">Monitor Transactions</h4>
                  <p className="text-sm text-muted-foreground">Real-time oversight</p>
                </button>

                <button
                  onClick={() => setActiveSection('charities')}
                  className="p-4 text-left bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  <Icon name="Building2" size={24} className="text-secondary mb-2" />
                  <h4 className="font-medium text-foreground">Manage Charities</h4>
                  <p className="text-sm text-muted-foreground">42 active organizations</p>
                </button>

                <button
                  onClick={() => setActiveSection('configuration')}
                  className="p-4 text-left bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
                >
                  <Icon name="Settings" size={24} className="text-accent mb-2" />
                  <h4 className="font-medium text-foreground">System Settings</h4>
                  <p className="text-sm text-muted-foreground">Platform configuration</p>
                </button>
              </div>
            </div>
          </div>
        );
      case 'approvals':
        return <PendingApprovals />;
      case 'charities':
        return <CharityManagement />;
      case 'transactions':
        return <TransactionOversight />;
      case 'configuration':
        return <SystemConfiguration />;
      default:
        return <PlatformAnalytics />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-card lg:border-r lg:border-border">
            <div className="flex-1 flex flex-col min-h-0 pt-6">
              <div className="px-4 mb-6">
                <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
                <p className="text-sm text-muted-foreground">Platform Management</p>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                      activeSection === section?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={section?.icon} size={18} />
                      <span>{section?.label}</span>
                    </div>
                    {section?.badge && (
                      <span className="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full">
                        {section?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:pl-64 flex flex-col flex-1">
            <main className="flex-1">
              <div className="px-4 lg:px-8 py-6">
                <Breadcrumb />

                {/* Mobile Navigation */}
                <div className="lg:hidden mb-6">
                  <select
                    value={activeSection}
                    onChange={(e) => setActiveSection(e?.target?.value)}
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {navigationSections?.map((section) => (
                      <option key={section?.id} value={section?.id}>
                        {section?.label}
                        {section?.badge ? ` (${section?.badge})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
