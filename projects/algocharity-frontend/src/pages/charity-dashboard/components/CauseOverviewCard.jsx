import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CauseOverviewCard = ({ cause, onEdit, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const progressPercentage = Math.min((cause?.raised / cause?.goal) * 100, 100);
  const isGoalReached = cause?.raised >= cause?.goal;

  const formatALGO = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const getDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={cause?.image}
          alt={cause?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            cause?.status === 'active' ?'bg-success text-success-foreground'
              : cause?.status === 'pending' ?'bg-warning text-warning-foreground' :'bg-muted text-muted-foreground'
          }`}>
            {cause?.status?.charAt(0)?.toUpperCase() + cause?.status?.slice(1)}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
              {cause?.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Tag" size={14} />
              <span>{cause?.category}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(cause)}
            className="ml-2"
          >
            <Icon name="Edit" size={16} />
          </Button>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {formatALGO(cause?.raised)} ALGO raised
            </span>
            <span className="text-sm text-muted-foreground">
              Goal: {formatALGO(cause?.goal)} ALGO
            </span>
          </div>

          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isGoalReached ? 'bg-success' : 'bg-primary'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progressPercentage?.toFixed(1)}% funded</span>
            <span>{getDaysRemaining(cause?.endDate)} days remaining</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{cause?.donorCount}</div>
            <div className="text-xs text-muted-foreground">Donors</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{cause?.transactionCount}</div>
            <div className="text-xs text-muted-foreground">Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {formatALGO(cause?.averageDonation)}
            </div>
            <div className="text-xs text-muted-foreground">Avg Donation</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {isExpanded ? cause?.description : cause?.description?.substring(0, 120) + '...'}
          </p>
          {cause?.description?.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:text-primary/80 mt-1"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Recent Activity */}
        {cause?.recentDonation && (
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Activity" size={14} className="text-success" />
              <span className="text-xs font-medium text-foreground">Recent Activity</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatALGO(cause?.recentDonation?.amount)} ALGO donated {cause?.recentDonation?.timeAgo}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(cause)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEdit(cause)}
            iconName="Settings"
            iconPosition="left"
            className="flex-1"
          >
            Manage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CauseOverviewCard;
