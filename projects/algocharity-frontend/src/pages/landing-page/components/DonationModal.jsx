import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DonationModal = ({ cause, isOpen, onClose, onDonate, isWalletConnected }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const presetAmounts = [1, 5, 10, 25, 50, 100];

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) return;

    setIsProcessing(true);

    // Simulate donation processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      onDonate(cause?.id, parseFloat(donationAmount));

      // Auto close after success
      setTimeout(() => {
        setShowSuccess(false);
        setDonationAmount('');
        onClose();
      }, 2000);
    }, 2000);
  };

  const handleConnectWallet = () => {
    // This would trigger wallet connection
    console.log('Connecting wallet...');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          // Success State
          (<div className="p-6 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Donation Successful!
            </h3>
            <p className="text-muted-foreground mb-4">
              Your donation of {donationAmount} ALGO has been processed and recorded on the blockchain.
            </p>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <div className="flex items-center justify-center text-muted-foreground">
                <Icon name="Link" size={14} className="mr-1" />
                <span>Transaction Hash: abc123...def456</span>
              </div>
            </div>
          </div>)
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Make a Donation</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Cause Info */}
            <div className="p-6 border-b border-border">
              <div className="flex space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={cause?.image}
                    alt={cause?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 truncate">
                    {cause?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Icon name="Building2" size={14} className="mr-1" />
                    {cause?.charityName}
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-foreground font-medium">
                      {cause?.raised?.toLocaleString()} ALGO
                    </span>
                    <span className="text-muted-foreground"> of {cause?.goal?.toLocaleString()} ALGO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="p-6">
              {!isWalletConnected ? (
                // Wallet Connection Required
                (<div className="text-center">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Wallet" size={32} className="text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Connect your Pera Wallet to make secure donations on the Algorand blockchain.
                  </p>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleConnectWallet}
                    iconName="Wallet"
                    iconPosition="left"
                  >
                    Connect Pera Wallet
                  </Button>
                </div>)
              ) : (
                // Donation Form
                (<>
                  <div className="mb-6">
                    <Input
                      label="Donation Amount (ALGO)"
                      type="number"
                      placeholder="Enter amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e?.target?.value)}
                      min="1"
                      max="100"
                      step="0.1"
                      description="Minimum: 1 ALGO, Maximum: 100 ALGO"
                    />
                  </div>
                  {/* Preset Amounts */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Quick Select
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {presetAmounts?.map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount?.toString() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDonationAmount(amount?.toString())}
                        >
                          {amount} ALGO
                        </Button>
                      ))}
                    </div>
                  </div>
                  {/* Transaction Info */}
                  {donationAmount && (
                    <div className="bg-muted rounded-lg p-4 mb-6">
                      <h4 className="font-medium text-foreground mb-2">Transaction Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Donation Amount:</span>
                          <span className="text-foreground">{donationAmount} ALGO</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Network Fee:</span>
                          <span className="text-foreground">0.001 ALGO</span>
                        </div>
                        <div className="flex justify-between border-t border-border pt-1 font-medium">
                          <span className="text-foreground">Total:</span>
                          <span className="text-foreground">
                            {(parseFloat(donationAmount || 0) + 0.001)?.toFixed(3)} ALGO
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Donate Button */}
                  <Button
                    variant="default"
                    fullWidth
                    onClick={handleDonate}
                    disabled={!donationAmount || parseFloat(donationAmount) <= 0 || isProcessing}
                    loading={isProcessing}
                    iconName="Heart"
                    iconPosition="left"
                  >
                    {isProcessing ? 'Processing Donation...' : 'Donate Now'}
                  </Button>
                  {/* Security Notice */}
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="Shield" size={16} className="text-primary mt-0.5" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium text-primary mb-1">Secure & Transparent</p>
                        <p>Your donation will be recorded on the Algorand blockchain and can be verified publicly.</p>
                      </div>
                    </div>
                  </div>
                </>)
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationModal;
