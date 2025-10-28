import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const WithdrawalInterface = ({ availableFunds, causes, onWithdraw }) => {
  const [selectedCause, setSelectedCause] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [withdrawalReason, setWithdrawalReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const causeOptions = causes?.map(cause => ({
    value: cause?.id,
    label: `${cause?.title} (${formatALGO(cause?.availableBalance)} ALGO available)`,
    description: `Goal: ${cause?.goalReached ? 'Reached' : 'In Progress'} • Status: ${cause?.withdrawalStatus}`
  }));

  const reasonOptions = [
    { value: 'project_expenses', label: 'Project Expenses' },
    { value: 'operational_costs', label: 'Operational Costs' },
    { value: 'emergency_funds', label: 'Emergency Funds' },
    { value: 'milestone_completion', label: 'Milestone Completion' },
    { value: 'other', label: 'Other' }
  ];

  const formatALGO = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCause) {
      newErrors.selectedCause = 'Please select a cause';
    }

    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      newErrors.withdrawalAmount = 'Please enter a valid amount';
    } else {
      const selectedCauseData = causes?.find(c => c?.id === selectedCause);
      if (selectedCauseData && parseFloat(withdrawalAmount) > selectedCauseData?.availableBalance) {
        newErrors.withdrawalAmount = 'Amount exceeds available balance';
      }
    }

    if (!recipientAddress || recipientAddress?.length < 58) {
      newErrors.recipientAddress = 'Please enter a valid Algorand address';
    }

    if (!withdrawalReason) {
      newErrors.withdrawalReason = 'Please select a withdrawal reason';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleWithdraw = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      await onWithdraw({
        causeId: selectedCause,
        amount: parseFloat(withdrawalAmount),
        recipientAddress,
        reason: withdrawalReason
      });

      // Reset form
      setSelectedCause('');
      setWithdrawalAmount('');
      setRecipientAddress('');
      setWithdrawalReason('');
      setErrors({});
    } catch (error) {
      setErrors({ submit: error?.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedCauseData = causes?.find(c => c?.id === selectedCause);
  const canWithdraw = selectedCauseData && (selectedCauseData?.goalReached || selectedCauseData?.adminApproved);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Banknote" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Fund Withdrawal</h2>
            <p className="text-sm text-muted-foreground">
              Total Available: {formatALGO(availableFunds)} ALGO
            </p>
          </div>
        </div>
      </div>
      {/* Withdrawal Form */}
      <div className="p-6 space-y-6">
        {/* Cause Selection */}
        <Select
          label="Select Cause"
          description="Choose the cause to withdraw funds from"
          options={causeOptions}
          value={selectedCause}
          onChange={setSelectedCause}
          error={errors?.selectedCause}
          required
        />

        {/* Withdrawal Conditions Display */}
        {selectedCauseData && (
          <div className={`p-4 rounded-lg border ${
            canWithdraw
              ? 'bg-success/10 border-success/20' :'bg-warning/10 border-warning/20'
          }`}>
            <div className="flex items-start space-x-3">
              <Icon
                name={canWithdraw ? "CheckCircle" : "AlertCircle"}
                size={20}
                className={canWithdraw ? "text-success" : "text-warning"}
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-2">Withdrawal Conditions</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={selectedCauseData?.goalReached ? "Check" : "X"}
                      size={14}
                      className={selectedCauseData?.goalReached ? "text-success" : "text-muted-foreground"}
                    />
                    <span className={selectedCauseData?.goalReached ? "text-success" : "text-muted-foreground"}>
                      Funding goal reached ({formatALGO(selectedCauseData?.raised)}/{formatALGO(selectedCauseData?.goal)} ALGO)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={selectedCauseData?.adminApproved ? "Check" : "Clock"}
                      size={14}
                      className={selectedCauseData?.adminApproved ? "text-success" : "text-warning"}
                    />
                    <span className={selectedCauseData?.adminApproved ? "text-success" : "text-warning"}>
                      Admin approval {selectedCauseData?.adminApproved ? 'granted' : 'pending'}
                    </span>
                  </div>
                </div>
                {!canWithdraw && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Withdrawal requires either goal completion or admin approval
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Withdrawal Amount (ALGO)"
            type="number"
            placeholder="0.00"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e?.target?.value)}
            error={errors?.withdrawalAmount}
            min="0.01"
            step="0.01"
            required
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-foreground mb-2">Available Balance</label>
            <div className="h-10 px-3 py-2 bg-muted rounded-lg flex items-center">
              <span className="text-sm font-mono text-muted-foreground">
                {selectedCauseData ? formatALGO(selectedCauseData?.availableBalance) : '0.00'} ALGO
              </span>
            </div>
          </div>
        </div>

        {/* Recipient Address */}
        <Input
          label="Recipient Wallet Address"
          type="text"
          placeholder="Enter Algorand wallet address..."
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e?.target?.value)}
          error={errors?.recipientAddress}
          description="58-character Algorand address starting with A-Z"
          required
        />

        {/* Withdrawal Reason */}
        <Select
          label="Withdrawal Reason"
          description="Select the purpose for this withdrawal"
          options={reasonOptions}
          value={withdrawalReason}
          onChange={setWithdrawalReason}
          error={errors?.withdrawalReason}
          required
        />

        {/* Transaction Preview */}
        {withdrawalAmount && recipientAddress && selectedCauseData && (
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Transaction Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Withdrawal Amount:</span>
                <span className="font-mono text-foreground">{formatALGO(parseFloat(withdrawalAmount || 0))} ALGO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction Fee:</span>
                <span className="font-mono text-foreground">0.001 ALGO</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="font-medium text-foreground">Total Deducted:</span>
                <span className="font-mono font-medium text-foreground">
                  {formatALGO(parseFloat(withdrawalAmount || 0) + 0.001)} ALGO
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors?.submit}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCause('');
              setWithdrawalAmount('');
              setRecipientAddress('');
              setWithdrawalReason('');
              setErrors({});
            }}
            disabled={isProcessing}
            className="flex-1"
          >
            Clear Form
          </Button>
          <Button
            variant="default"
            onClick={handleWithdraw}
            disabled={!canWithdraw || isProcessing || !selectedCause}
            loading={isProcessing}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Withdraw Funds'}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <Icon name="Info" size={14} className="inline mr-2" />
          All withdrawals are recorded on the Algorand blockchain and are publicly verifiable.
          Ensure the recipient address is correct as transactions cannot be reversed.
        </div>
      </div>
    </div>
  );
};

export default WithdrawalInterface;
