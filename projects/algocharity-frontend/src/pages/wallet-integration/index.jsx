import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WalletStatusCard from './components/WalletStatusCard';
import TransactionPreview from './components/TransactionPreview';
import TransactionSigning from './components/TransactionSigning';
import TransactionConfirmation from './components/TransactionConfirmation';
import ErrorHandler from './components/ErrorHandler';
import BlockchainSync from './components/BlockchainSync';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WalletIntegration = () => {
  const [walletState, setWalletState] = useState({
    isConnected: false,
    address: '',
    balance: '0.00',
    isConnecting: false
  });

  const [transactionFlow, setTransactionFlow] = useState({
    step: 'wallet', // wallet, preview, signing, confirmation
    transaction: null,
    isProcessing: false,
    error: null
  });

  const [blockchainSync, setBlockchainSync] = useState({
    status: 'synced',
    lastUpdated: new Date(),
    blockHeight: 32847291
  });

  // Mock wallet data
  const mockWalletData = {
    address: 'ALGO7X9K2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9',
    balance: '125.50'
  };

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'tx_001',
      type: 'donation',
      recipient: 'Clean Water Initiative',
      amount: '25.00',
      fee: '0.001',
      hash: 'TXN7X9K2M3N4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C8D9E0F1G2H3I4J5K6L7M8N9P0',
      nftId: '12345',
      timestamp: new Date()
    },
    {
      id: 'tx_002',
      type: 'withdrawal',
      recipient: 'Education for All Foundation',
      amount: '50.00',
      fee: '0.001',
      hash: 'TXN8Y0L3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1',
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    // Simulate blockchain sync updates
    const syncInterval = setInterval(() => {
      setBlockchainSync(prev => ({
        ...prev,
        lastUpdated: new Date(),
        blockHeight: prev?.blockHeight + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(syncInterval);
  }, []);

  const handleWalletConnect = async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setWalletState({
        isConnected: true,
        address: mockWalletData?.address,
        balance: mockWalletData?.balance,
        isConnecting: false
      });
    } catch (error) {
      setTransactionFlow(prev => ({
        ...prev,
        error: {
          type: 'connection',
          title: 'Connection Failed',
          message: 'Unable to connect to Pera Wallet',
          details: 'Please ensure Pera Wallet is installed and try again.'
        }
      }));
      setWalletState(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const handleWalletDisconnect = () => {
    setWalletState({
      isConnected: false,
      address: '',
      balance: '0.00',
      isConnecting: false
    });
    setTransactionFlow({
      step: 'wallet',
      transaction: null,
      isProcessing: false,
      error: null
    });
  };

  const handleStartTransaction = (type = 'donation') => {
    if (!walletState?.isConnected) {
      handleWalletConnect();
      return;
    }

    const transaction = mockTransactions?.find(tx => tx?.type === type) || mockTransactions?.[0];
    setTransactionFlow({
      step: 'preview',
      transaction,
      isProcessing: false,
      error: null
    });
  };

  const handleConfirmTransaction = () => {
    setTransactionFlow(prev => ({
      ...prev,
      step: 'signing',
      isProcessing: true
    }));
  };

  const handleSignTransaction = async () => {
    setTransactionFlow(prev => ({ ...prev, isProcessing: true }));

    try {
      // Simulate signing process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Random chance of failure for demo
      if (Math.random() < 0.1) {
        throw new Error('Transaction rejected by user');
      }

      setTransactionFlow(prev => ({
        ...prev,
        step: 'confirmation',
        isProcessing: false
      }));

      // Update wallet balance
      const newBalance = parseFloat(walletState?.balance) - parseFloat(transactionFlow?.transaction?.amount) - parseFloat(transactionFlow?.transaction?.fee);
      setWalletState(prev => ({
        ...prev,
        balance: Math.max(0, newBalance)?.toFixed(2)
      }));

    } catch (error) {
      setTransactionFlow(prev => ({
        ...prev,
        error: {
          type: 'rejection',
          title: 'Transaction Failed',
          message: error?.message,
          details: 'The transaction was cancelled or rejected.'
        },
        isProcessing: false
      }));
    }
  };

  const handleViewExplorer = () => {
    const explorerUrl = `https://testnet.algoexplorer.io/tx/${transactionFlow?.transaction?.hash}`;
    window.open(explorerUrl, '_blank');
  };

  const handleCloseTransaction = () => {
    setTransactionFlow({
      step: 'wallet',
      transaction: null,
      isProcessing: false,
      error: null
    });
  };

  const handleRetryTransaction = () => {
    setTransactionFlow(prev => ({
      ...prev,
      error: null,
      step: 'preview'
    }));
  };

  const renderTransactionFlow = () => {
    if (transactionFlow?.error) {
      return (
        <ErrorHandler
          error={transactionFlow?.error}
          onRetry={handleRetryTransaction}
          onClose={handleCloseTransaction}
        />
      );
    }

    switch (transactionFlow?.step) {
      case 'preview':
        return (
          <TransactionPreview
            transaction={transactionFlow?.transaction}
            onConfirm={handleConfirmTransaction}
            onCancel={handleCloseTransaction}
            isProcessing={transactionFlow?.isProcessing}
          />
        );
      case 'signing':
        return (
          <TransactionSigning
            transaction={transactionFlow?.transaction}
            onSign={handleSignTransaction}
            onCancel={handleCloseTransaction}
            isSigning={transactionFlow?.isProcessing}
          />
        );
      case 'confirmation':
        return (
          <TransactionConfirmation
            transaction={transactionFlow?.transaction}
            onClose={handleCloseTransaction}
            onViewExplorer={handleViewExplorer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Breadcrumb />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Wallet" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Wallet Integration</h1>
                <p className="text-muted-foreground">
                  Manage your Pera Wallet connection and blockchain transactions
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Wallet Status & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <WalletStatusCard
                isConnected={walletState?.isConnected}
                walletAddress={walletState?.address}
                balance={walletState?.balance}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                isConnecting={walletState?.isConnecting}
              />

              <BlockchainSync
                syncStatus={blockchainSync?.status}
                lastUpdated={blockchainSync?.lastUpdated}
                blockHeight={blockchainSync?.blockHeight}
              />

              {/* Quick Actions */}
              {walletState?.isConnected && (
                <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
                  <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleStartTransaction('donation')}
                      iconName="Heart"
                      iconPosition="left"
                    >
                      Test Donation
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => handleStartTransaction('withdrawal')}
                      iconName="ArrowUpRight"
                      iconPosition="left"
                    >
                      Test Withdrawal
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Transaction Flow */}
            <div className="lg:col-span-2">
              {transactionFlow?.step !== 'wallet' ? (
                renderTransactionFlow()
              ) : (
                <div className="bg-card border border-border rounded-lg p-8 shadow-elevation-1 text-center">
                  <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                    <Icon name="Smartphone" size={40} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {walletState?.isConnected ? 'Ready for Transactions' : 'Connect Your Wallet'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {walletState?.isConnected
                      ? 'Your wallet is connected and ready. Start a transaction to see the flow.'
                      : 'Connect your Pera Wallet to begin making donations and managing transactions.'
                    }
                  </p>

                  {!walletState?.isConnected && (
                    <Button
                      variant="default"
                      onClick={handleWalletConnect}
                      loading={walletState?.isConnecting}
                      iconName="Wallet"
                      iconPosition="left"
                    >
                      {walletState?.isConnecting ? 'Connecting...' : 'Connect Pera Wallet'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Integration Features */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Integration Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Shield',
                  title: 'Secure Transactions',
                  description: 'All transactions are secured by Algorand blockchain cryptography and smart contracts.',
                  color: 'success'
                },
                {
                  icon: 'Eye',
                  title: 'Full Transparency',
                  description: 'Every transaction is publicly verifiable on AlgoExplorer with immutable records.',
                  color: 'primary'
                },
                {
                  icon: 'Zap',
                  title: 'Instant Processing',
                  description: 'Fast transaction finality with low fees on the Algorand network.',
                  color: 'warning'
                },
                {
                  icon: 'Award',
                  title: 'NFT Certificates',
                  description: 'Receive unique NFT proof of donation for every charitable contribution.',
                  color: 'accent'
                },
                {
                  icon: 'Mail',
                  title: 'Email Notifications',
                  description: 'Automatic email confirmations for all successful transactions.',
                  color: 'secondary'
                },
                {
                  icon: 'BarChart3',
                  title: 'Real-time Updates',
                  description: 'Live blockchain synchronization for accurate balance and transaction data.',
                  color: 'primary'
                }
              ]?.map((feature, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                  <div className={`w-12 h-12 bg-${feature?.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon name={feature?.icon} size={24} className={`text-${feature?.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature?.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletIntegration;
