import React from 'react';
import Icon from '../../../components/AppIcon';

const BlockchainSync = ({
  syncStatus,
  lastUpdated,
  blockHeight
}) => {
  const getSyncStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'success';
      case 'syncing':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'muted';
    }
  };

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return 'CheckCircle';
      case 'syncing':
        return 'RotateCw';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  const getSyncStatusText = (status) => {
    switch (status) {
      case 'synced':
        return 'Synchronized';
      case 'syncing':
        return 'Synchronizing...';
      case 'error':
        return 'Sync Error';
      default:
        return 'Unknown';
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    return time?.toLocaleTimeString();
  };

  const colorClass = getSyncStatusColor(syncStatus);

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground">Blockchain Status</h4>
        <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs bg-${colorClass}/10 text-${colorClass}`}>
          <Icon
            name={getSyncStatusIcon(syncStatus)}
            size={12}
            className={syncStatus === 'syncing' ? 'animate-spin' : ''}
          />
          <span>{getSyncStatusText(syncStatus)}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Updated</span>
          <span className="text-foreground">{formatTime(lastUpdated)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Block Height</span>
          <span className="text-foreground font-mono">#{blockHeight?.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Network</span>
          <span className="text-foreground">Algorand TestNet</span>
        </div>
      </div>

      {syncStatus === 'error' && (
        <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
          Unable to sync with blockchain. Some data may be outdated.
        </div>
      )}
    </div>
  );
};

export default BlockchainSync;
