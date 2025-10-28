import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionSigning = ({
  transaction,
  onSign,
  onCancel,
  isSigning
}) => {
  if (!transaction) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="PenTool" size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Sign Transaction</h3>
        <p className="text-sm text-muted-foreground">
          Please review and sign the transaction in your Pera Wallet
        </p>
      </div>
      <div className="space-y-4 mb-6">
        {/* Transaction Details */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Transaction Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="text-foreground capitalize">{transaction?.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground font-medium">{transaction?.amount} ALGO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recipient</span>
              <span className="text-foreground">{transaction?.recipient}</span>
            </div>
          </div>
        </div>

        {/* Smart Contract Information */}
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Code" size={16} className="text-secondary" />
            <h4 className="text-sm font-medium text-foreground">Smart Contract Interaction</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract ID</span>
              <span className="text-foreground font-mono">APP_ID_12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span className="text-foreground">
                {transaction?.type === 'donation' ? 'donate' : 'withdraw'}
              </span>
            </div>
          </div>
        </div>

        {/* Security Confirmations */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success">Transaction verified by smart contract</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Lock" size={16} className="text-success" />
            <span className="text-sm text-success">Secure blockchain transaction</span>
          </div>
        </div>

        {/* Pera Wallet Integration Prompt */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Smartphone" size={16} className="text-primary" />
            <h4 className="text-sm font-medium text-foreground">Pera Wallet</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {isSigning
              ? 'Please check your Pera Wallet app to sign the transaction'
              : 'Click "Sign with Pera Wallet" to open your wallet app'
            }
          </p>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          fullWidth
          onClick={onCancel}
          disabled={isSigning}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          fullWidth
          onClick={onSign}
          loading={isSigning}
          iconName="PenTool"
          iconPosition="left"
        >
          {isSigning ? 'Signing...' : 'Sign with Pera Wallet'}
        </Button>
      </div>
    </div>
  );
};

export default TransactionSigning;
