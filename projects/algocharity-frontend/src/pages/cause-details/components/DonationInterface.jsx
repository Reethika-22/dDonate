import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DonationInterface = ({ cause, onDonate, isWalletConnected }) => {
  const [donationAmount, setDonationAmount] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleDonationSubmit = async () => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (donationAmount < 1 || donationAmount > 100) {
      alert('Donation amount must be between 1 and 100 ALGO');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockTransaction = {
        txId: `TXN${Date.now()}${Math.random()?.toString(36)?.substr(2, 9)}`,
        amount: donationAmount,
        timestamp: new Date(),
        explorerUrl: `https://testnet.algoexplorer.io/tx/TXN${Date.now()}`
      };

      onDonate(mockTransaction);
      setShowConfirmation(true);

      // Reset after showing confirmation
      setTimeout(() => {
        setShowConfirmation(false);
        setDonationAmount(10);
      }, 3000);

    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e?.target?.value) || 0;
    setDonationAmount(Math.min(Math.max(value, 1), 100));
  };

  if (showConfirmation) {
    return (
      <div className="bg-card rounded-xl shadow-elevation-2 p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Donation Successful!</h3>
          <p className="text-muted-foreground mb-4">
            Your donation of {donationAmount} ALGO has been processed successfully.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
            <p className="font-mono text-sm text-foreground break-all">TXN{Date.now()}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
          >
            View on AlgoExplorer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Heart" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Make a Donation</h2>
      </div>
      {!isWalletConnected && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <p className="text-sm text-warning">Please connect your wallet to make a donation</p>
          </div>
        </div>
      )}
      {/* Preset Amounts */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Quick Select Amount
        </label>
        <div className="grid grid-cols-5 gap-2">
          {presetAmounts?.map((amount) => (
            <Button
              key={amount}
              variant={donationAmount === amount ? "default" : "outline"}
              size="sm"
              onClick={() => setDonationAmount(amount)}
              disabled={isProcessing}
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>
      {/* Custom Amount */}
      <div className="mb-6">
        <Input
          label="Custom Amount (ALGO)"
          type="number"
          min="1"
          max="100"
          step="0.1"
          value={donationAmount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          description="Minimum: 1 ALGO, Maximum: 100 ALGO"
          disabled={isProcessing}
        />
      </div>
      {/* Transaction Preview */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-3">Transaction Preview</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Donation Amount:</span>
            <span className="font-medium text-foreground">{donationAmount} ALGO</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee:</span>
            <span className="font-medium text-foreground">0.001 ALGO</span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total:</span>
              <span className="font-bold text-foreground">{(donationAmount + 0.001)?.toFixed(3)} ALGO</span>
            </div>
          </div>
        </div>
      </div>
      {/* Donation Benefits */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-foreground mb-2">Your Impact</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>100% of your donation goes to the cause</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Blockchain transparency and verification</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>NFT proof of donation certificate</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>Real-time progress tracking</span>
          </li>
        </ul>
      </div>
      {/* Donate Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isProcessing}
        disabled={!isWalletConnected || donationAmount < 1 || donationAmount > 100}
        onClick={handleDonationSubmit}
        iconName="Heart"
        iconPosition="left"
      >
        {isProcessing ? 'Processing Donation...' : `Donate ${donationAmount} ALGO`}
      </Button>
      {/* Security Notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Secured by Algorand blockchain • All transactions are immutable and verifiable
        </p>
      </div>
    </div>
  );
};

export default DonationInterface;
