import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CauseHeader = ({ cause }) => {
  const progressPercentage = Math.min((cause?.raised / cause?.goal) * 100, 100);
  const daysLeft = Math.max(0, Math.ceil((new Date(cause.deadline) - new Date()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={cause?.image}
          alt={cause?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Verification Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-success/90 backdrop-blur-sm text-success-foreground px-3 py-2 rounded-lg">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-medium">Verified Charity</span>
        </div>

        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-2 rounded-lg">
          <span className="text-sm font-medium">{cause?.category}</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {cause?.title}
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {cause?.shortDescription}
            </p>

            {/* Charity Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Image
                  src={cause?.charity?.logo}
                  alt={cause?.charity?.logoAlt}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{cause?.charity?.name}</p>
                  <p className="text-sm text-muted-foreground">Registered Charity</p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">Verified</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div className="lg:w-80">
            {/* Progress Stats */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">{progressPercentage?.toFixed(1)}%</span>
              </div>

              <div className="w-full bg-muted rounded-full h-3 mb-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{cause?.raised?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">ALGO Raised</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{cause?.goal?.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">ALGO Goal</p>
                </div>
              </div>
            </div>

            {/* Time & Donors */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-foreground">{daysLeft}</p>
                <p className="text-xs text-muted-foreground">Days Left</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-foreground">{cause?.donorCount}</p>
                <p className="text-xs text-muted-foreground">Donors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseHeader;
