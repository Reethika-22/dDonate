import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionPreview = ({
  transaction,
  onConfirm,
  onCancel,
  isProcessing
}) => {
  if (!transaction) return null;

  const formatAlgo = (amount) => {
    return parseFloat(amount)?.toFixed(2);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Transaction Preview</h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="space-y-4 mb-6">
        {/* Transaction Type */}
        <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name={transaction?.type === 'donation' ? 'Heart' : 'ArrowUpRight'} size={20} color="white" />
          </div>
          <div>
            <p className="font-medium text-foreground capitalize">{transaction?.type}</p>
            <p className="text-sm text-muted-foreground">
              {transaction?.type === 'donation' ? 'Charitable Donation' : 'Fund Withdrawal'}
            </p>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              {transaction?.type === 'donation' ? 'Charity' : 'Recipient'}
            </span>
            <span className="text-sm font-medium text-foreground">{transaction?.recipient}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount</span>
            <span className="text-lg font-bold text-primary">{formatAlgo(transaction?.amount)} ALGO</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Transaction Fee</span>
            <span className="text-sm text-foreground">{formatAlgo(transaction?.fee)} ALGO</span>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">
                {formatAlgo(parseFloat(transaction?.amount) + parseFloat(transaction?.fee))} ALGO
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Structure */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-2">Transaction Structure</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Payment Transaction</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Smart Contract Call</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <Icon name="Shield" size={20} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">Security Notice</p>
            <p className="text-sm text-muted-foreground mt-1">
              This transaction will be recorded on the Algorand blockchain and cannot be reversed.
            </p>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          fullWidth
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          fullWidth
          onClick={onConfirm}
          loading={isProcessing}
          iconName="Check"
          iconPosition="left"
        >
          {isProcessing ? 'Processing...' : 'Confirm Transaction'}
        </Button>
      </div>
    </div>
  );
};

export default TransactionPreview;
