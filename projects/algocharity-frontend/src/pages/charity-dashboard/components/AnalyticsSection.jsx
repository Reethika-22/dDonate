import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsSection = ({ analyticsData, onExportReport }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('donations');

  const periodOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '1year', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'donations', label: 'Donation Trends' },
    { value: 'donors', label: 'Donor Growth' },
    { value: 'causes', label: 'Cause Performance' }
  ];

  const formatALGO = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const COLORS = ['#1E40AF', '#059669', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-3">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.name?.includes('ALGO') ? formatALGO(entry?.value) : entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analytics Dashboard</h2>
          <p className="text-sm text-muted-foreground">Track your fundraising performance and donor engagement</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onExportReport}
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Time Period"
          options={periodOptions}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
        />
        <Select
          label="Metric View"
          options={metricOptions}
          value={selectedMetric}
          onChange={setSelectedMetric}
        />
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData?.keyMetrics?.map((metric) => (
          <div key={metric?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={16} className={metric?.iconColor} />
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                metric?.trend > 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}>
                {metric?.trend > 0 ? '+' : ''}{metric?.trend}%
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.label}</div>
          </div>
        ))}
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Donation Trends</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>ALGO Received</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData?.donationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donor Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Donor Growth</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>New Donors</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData?.donorGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="newDonors"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cause Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cause Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData?.causePerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {analyticsData?.causePerformance?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {analyticsData?.causePerformance?.map((cause, index) => (
              <div key={cause?.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  ></div>
                  <span className="text-muted-foreground">{cause?.name}</span>
                </div>
                <span className="font-medium text-foreground">{formatALGO(cause?.amount)} ALGO</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Donation Distribution</h3>
          <div className="space-y-4">
            {analyticsData?.donationDistribution?.map((range) => (
              <div key={range?.range} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{range?.range}</span>
                  <span className="font-medium text-foreground">{range?.count} donors</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${range?.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-right">
                  {range?.percentage}% of total
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {analyticsData?.recentActivity?.donationsToday}
            </div>
            <div className="text-sm text-muted-foreground">Donations Today</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {formatALGO(analyticsData?.recentActivity?.amountToday)}
            </div>
            <div className="text-sm text-muted-foreground">ALGO Raised Today</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">
              {analyticsData?.recentActivity?.newDonorsToday}
            </div>
            <div className="text-sm text-muted-foreground">New Donors Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
