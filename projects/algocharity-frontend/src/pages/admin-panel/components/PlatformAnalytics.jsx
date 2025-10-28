import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PlatformAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  const timeframeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const platformStats = {
    totalDonated: 1247850,
    activeCauses: 42,
    totalTransactions: 3456,
    averageDonation: 361,
    newCharities: 8,
    fraudAlerts: 2
  };

  const donationTrends = [
    { date: '2025-10-22', donations: 12500, transactions: 45 },
    { date: '2025-10-23', donations: 18750, transactions: 62 },
    { date: '2025-10-24', donations: 22100, transactions: 78 },
    { date: '2025-10-25', donations: 15600, transactions: 54 },
    { date: '2025-10-26', donations: 28900, transactions: 89 },
    { date: '2025-10-27', donations: 31200, transactions: 95 },
    { date: '2025-10-28', donations: 24800, transactions: 71 }
  ];

  const categoryDistribution = [
    { name: 'Education', value: 35, color: '#1E40AF' },
    { name: 'Healthcare', value: 28, color: '#059669' },
    { name: 'Environment', value: 18, color: '#F59E0B' },
    { name: 'Disaster Relief', value: 12, color: '#EF4444' },
    { name: 'Animal Welfare', value: 7, color: '#8B5CF6' }
  ];

  const topPerformingCauses = [
    {
      id: 1,
      name: "Clean Water Initiative",
      raised: 45600,
      goal: 50000,
      donors: 234,
      progress: 91.2
    },
    {
      id: 2,
      name: "Education for All Foundation",
      raised: 38900,
      goal: 75000,
      donors: 189,
      progress: 51.9
    },
    {
      id: 3,
      name: "Medical Equipment Fund",
      raised: 67800,
      goal: 80000,
      donors: 312,
      progress: 84.8
    },
    {
      id: 4,
      name: "Disaster Relief Support",
      raised: 23400,
      goal: 40000,
      donors: 156,
      progress: 58.5
    }
  ];

  const fraudAlerts = [
    {
      id: 1,
      type: "Suspicious Transaction Pattern",
      charity: "Green Earth Conservation",
      severity: "medium",
      timestamp: "2025-10-28 06:45:00",
      description: "Multiple large donations from same wallet address within short timeframe"
    },
    {
      id: 2,
      type: "Document Verification Issue",
      charity: "Hope Foundation",
      severity: "high",
      timestamp: "2025-10-27 14:30:00",
      description: "Inconsistencies found in submitted financial documentation"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Platform Analytics</h2>
          <p className="text-muted-foreground mt-1">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          {timeframeOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSelectedTimeframe(option?.value)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                selectedTimeframe === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Donated</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {platformStats?.totalDonated?.toLocaleString()} ALGO
          </div>
          <div className="text-xs text-success mt-1">+12.5% from last period</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={20} className="text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">Active Causes</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{platformStats?.activeCauses}</div>
          <div className="text-xs text-success mt-1">+3 new this week</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={20} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Transactions</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {platformStats?.totalTransactions?.toLocaleString()}
          </div>
          <div className="text-xs text-success mt-1">+8.3% from yesterday</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Avg Donation</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {platformStats?.averageDonation} ALGO
          </div>
          <div className="text-xs text-success mt-1">+5.2% increase</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Building2" size={20} className="text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">New Charities</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{platformStats?.newCharities}</div>
          <div className="text-xs text-muted-foreground mt-1">This month</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="text-sm font-medium text-muted-foreground">Fraud Alerts</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{platformStats?.fraudAlerts}</div>
          <div className="text-xs text-error mt-1">Requires attention</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Donation Trends</h3>
          <div className="w-full h-64" aria-label="Donation Trends Line Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="date"
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'donations' ? `${value?.toLocaleString()} ALGO` : value,
                    name === 'donations' ? 'Donations' : 'Transactions'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cause Categories</h3>
          <div className="w-full h-64" aria-label="Category Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryDistribution?.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{category?.name}</span>
                <span className="text-sm font-medium text-foreground">{category?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Causes */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Causes</h3>
          <div className="space-y-4">
            {topPerformingCauses?.map((cause) => (
              <div key={cause?.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground truncate">{cause?.name}</h4>
                  <span className="text-sm font-medium text-primary">{cause?.progress?.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{cause?.raised?.toLocaleString()} / {cause?.goal?.toLocaleString()} ALGO</span>
                  <span>{cause?.donors} donors</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-smooth"
                    style={{ width: `${Math.min(cause?.progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Alerts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Fraud Detection Alerts</h3>
            <span className="px-2 py-1 bg-error/10 text-error border border-error/20 rounded-full text-xs font-medium">
              {fraudAlerts?.length} Active
            </span>
          </div>
          <div className="space-y-4">
            {fraudAlerts?.map((alert) => (
              <div key={alert?.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                    <h4 className="font-medium text-foreground">{alert?.type}</h4>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium border rounded ${getSeverityColor(alert?.severity)}`}>
                    {alert?.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert?.charity}</p>
                <p className="text-sm text-foreground mb-3">{alert?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp)?.toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth">
                      Investigate
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-error hover:text-error/80 transition-smooth">
                      Take Action
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
