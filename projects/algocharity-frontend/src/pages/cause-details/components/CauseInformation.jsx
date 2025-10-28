import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CauseInformation = ({ cause }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: 'Info' },
    { id: 'milestones', label: 'Milestones', icon: 'Target' },
    { id: 'updates', label: 'Updates', icon: 'MessageSquare' },
    { id: 'blockchain', label: 'Blockchain', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">About This Cause</h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="mb-4">{cause?.fullDescription}</p>
                <p className="mb-4">{cause?.impact}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">How Your Donation Helps</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cause?.impactBreakdown?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item?.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item?.amount} ALGO</p>
                      <p className="text-sm text-muted-foreground">{item?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Location & Beneficiaries</h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{cause?.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">{cause?.beneficiaries}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'milestones':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Funding Milestones</h3>
            <div className="space-y-4">
              {cause?.milestones?.map((milestone, index) => {
                const isCompleted = cause?.raised >= milestone?.amount;
                const isCurrent = cause?.raised < milestone?.amount &&
                  (index === 0 || cause?.raised >= cause?.milestones?.[index - 1]?.amount);

                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted ? 'bg-success text-success-foreground' :
                      isCurrent ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{milestone?.title}</h4>
                        <span className="text-sm font-medium text-primary">
                          {milestone?.amount?.toLocaleString()} ALGO
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{milestone?.description}</p>
                      {isCompleted && (
                        <div className="flex items-center space-x-2 text-success">
                          <Icon name="CheckCircle" size={14} />
                          <span className="text-xs font-medium">Milestone Achieved</span>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="flex items-center space-x-2 text-primary">
                          <Icon name="Clock" size={14} />
                          <span className="text-xs font-medium">Current Target</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'updates':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Project Updates</h3>
            <div className="space-y-4">
              {cause?.updates?.map((update, index) => (
                <div key={index} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{update?.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(update.date)?.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update?.content}</p>
                  {update?.image && (
                    <div className="mt-3">
                      <Image
                        src={update?.image}
                        alt={update?.imageAlt}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'blockchain':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Blockchain Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Smart Contract</h4>
                <p className="text-xs font-mono text-muted-foreground break-all mb-2">
                  {cause?.smartContract?.address}
                </p>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} className="text-success" />
                  <span className="text-xs text-success">Verified Contract</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Network</h4>
                <p className="text-sm text-muted-foreground mb-1">Algorand TestNet</p>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={14} className="text-primary" />
                  <span className="text-xs text-primary">Fast & Secure</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Contract Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cause?.smartContract?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Transparency Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Transactions</span>
                  <span className="font-medium text-foreground">{cause?.totalTransactions}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Contract Creation</span>
                  <span className="font-medium text-foreground">
                    {new Date(cause.smartContract.createdAt)?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Last Activity</span>
                  <span className="font-medium text-foreground">
                    {new Date(cause.lastActivity)?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-smooth ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CauseInformation;
