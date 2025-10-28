import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionConfirmation = ({
  transaction,
  onClose,
  onViewExplorer
}) => {
  if (!transaction) return null;

  const formatAlgo = (amount) => {
    return parseFloat(amount)?.toFixed(2);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Transaction Successful</h3>
        <p className="text-sm text-muted-foreground">
          Your {transaction?.type} has been processed successfully
        </p>
      </div>
      <div className="space-y-4 mb-6">
        {/* Transaction Summary */}
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Transaction Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-success font-medium">{formatAlgo(transaction?.amount)} ALGO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {transaction?.type === 'donation' ? 'Charity' : 'Recipient'}
              </span>
              <span className="text-foreground">{transaction?.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{new Date()?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Transaction Hash */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">Transaction Hash</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard?.writeText(transaction?.hash)}
            >
              <Icon name="Copy" size={16} />
            </Button>
          </div>
          <p className="text-sm font-mono text-muted-foreground break-all">
            {transaction?.hash}
          </p>
        </div>

        {/* AlgoExplorer Link */}
        <Button
          variant="outline"
          fullWidth
          onClick={onViewExplorer}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View on AlgoExplorer
        </Button>

        {/* NFT Proof of Donation */}
        {transaction?.type === 'donation' && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} className="text-accent" />
              <h4 className="text-sm font-medium text-foreground">NFT Proof of Donation</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              A unique NFT has been minted as proof of your charitable donation
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">NFT ID</span>
              <span className="text-foreground font-mono">NFT_{transaction?.nftId}</span>
            </div>
          </div>
        )}

        {/* Email Notification */}
        <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <Icon name="Mail" size={16} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Email Confirmation Sent</p>
            <p className="text-xs text-muted-foreground">
              Transaction details sent to your registered email
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="default"
        fullWidth
        onClick={onClose}
        iconName="ArrowLeft"
        iconPosition="left"
      >
        Back to Dashboard
      </Button>
    </div>
  );
};

export default TransactionConfirmation;
