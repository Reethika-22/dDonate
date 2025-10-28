import React from 'react';
import Icon from '../../../components/AppIcon';

const PlatformStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Causes',
      value: stats?.totalCauses?.toLocaleString(),
      icon: 'Heart',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'ALGO Donated',
      value: `${stats?.totalDonated?.toLocaleString()}`,
      icon: 'Coins',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Active Donors',
      value: stats?.totalDonors?.toLocaleString(),
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Causes Funded',
      value: stats?.causesFunded?.toLocaleString(),
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Transparent Charitable Giving on Algorand
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every donation is recorded on the blockchain, ensuring complete transparency and accountability.
          Join thousands of donors making a verified impact.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 ${stat?.bgColor} rounded-full mb-3`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Blockchain Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Shield" size={16} className="text-success mr-2" />
            <span>Blockchain Verified</span>
          </div>
          <div className="flex items-center">
            <Icon name="Lock" size={16} className="text-success mr-2" />
            <span>Immutable Records</span>
          </div>
          <div className="flex items-center">
            <Icon name="Eye" size={16} className="text-success mr-2" />
            <span>Public Transparency</span>
          </div>
          <div className="flex items-center">
            <Icon name="Zap" size={16} className="text-success mr-2" />
            <span>Instant Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
