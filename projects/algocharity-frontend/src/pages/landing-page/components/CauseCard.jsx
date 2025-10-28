import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CauseCard = ({ cause, onDonate }) => {
  const progressPercentage = Math.min((cause?.raised / cause?.goal) * 100, 100);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden hover:shadow-elevation-2 transition-smooth">
      {/* Cause Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={cause?.image}
          alt={cause?.imageAlt}
          className="w-full h-full object-cover"
        />
        {cause?.isVerified && (
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} />
            <span>Verified</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
          {cause?.category}
        </div>
      </div>
      {/* Card Content */}
      <div className="p-6">
        {/* Charity Info */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
              {cause?.title}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <Icon name="Building2" size={14} className="mr-1" />
              {cause?.charityName}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {cause?.description}
        </p>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {progressPercentage?.toFixed(1)}% funded
            </span>
            <span className="text-sm text-muted-foreground">
              {cause?.daysLeft} days left
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-3">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Funding Stats */}
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold text-foreground">{cause?.raised?.toLocaleString()} ALGO</span>
              <span className="text-muted-foreground"> raised</span>
            </div>
            <div className="text-muted-foreground">
              Goal: {cause?.goal?.toLocaleString()} ALGO
            </div>
          </div>
        </div>

        {/* Donor Count */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Icon name="Users" size={14} className="mr-1" />
          <span>{cause?.donorCount} donors</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            fullWidth
            onClick={() => onDonate(cause)}
            iconName="Heart"
            iconPosition="left"
          >
            Donate Now
          </Button>
          <Link to="/cause-details" state={{ causeId: cause?.id }}>
            <Button variant="outline" size="icon">
              <Icon name="ArrowRight" size={16} />
            </Button>
          </Link>
        </div>

        {/* Blockchain Verification */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Icon name="Link" size={12} className="mr-1" />
              <span>Blockchain Verified</span>
            </div>
            <button className="text-primary hover:underline">
              View on AlgoExplorer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseCard;
