import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletStatusCard = ({
  isConnected,
  walletAddress,
  balance,
  onConnect,
  onDisconnect,
  isConnecting
}) => {
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Wallet Status</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          isConnected
            ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-success animate-pulse' : 'bg-muted-foreground'
          }`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Wallet Address</p>
              <p className="font-mono text-sm text-foreground">{truncateAddress(walletAddress)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard?.writeText(walletAddress)}
            >
              <Icon name="Copy" size={16} />
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-xl font-bold text-primary">{balance} ALGO</p>
            </div>
            <Icon name="Wallet" size={24} className="text-primary" />
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={onDisconnect}
            iconName="Unlink"
            iconPosition="left"
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="Wallet" size={32} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">Connect Your Pera Wallet</p>
            <p className="text-sm text-muted-foreground">
              Connect your Algorand wallet to start donating to charitable causes
            </p>
          </div>
          <Button
            variant="default"
            fullWidth
            onClick={onConnect}
            loading={isConnecting}
            iconName="Wallet"
            iconPosition="left"
          >
            {isConnecting ? 'Connecting...' : 'Connect Pera Wallet'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WalletStatusCard;
