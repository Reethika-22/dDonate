import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistory = ({ transactions }) => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all');

  const displayTransactions = showAll ? transactions : transactions?.slice(0, 5);

  const filteredTransactions = displayTransactions?.filter(tx => {
    if (filter === 'all') return true;
    return tx?.type === filter;
  });

  const formatAddress = (address) => {
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'donation':
        return { icon: 'Heart', color: 'text-success' };
      case 'withdrawal':
        return { icon: 'ArrowUpRight', color: 'text-warning' };
      case 'milestone':
        return { icon: 'Target', color: 'text-primary' };
      default:
        return { icon: 'ArrowRight', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Transaction History</h2>
            <p className="text-sm text-muted-foreground">
              All transactions are verified on the Algorand blockchain
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            {['all', 'donation', 'withdrawal', 'milestone']?.map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
              >
                {filterType?.charAt(0)?.toUpperCase() + filterType?.slice(1)}
                {filterType === 'all' && ` (${transactions?.length})`}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Transaction List */}
      <div className="divide-y divide-border">
        {filteredTransactions?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">No transactions match the selected filter.</p>
          </div>
        ) : (
          filteredTransactions?.map((transaction, index) => {
            const { icon, color } = getTransactionIcon(transaction?.type);

            return (
              <div key={index} className="p-4 hover:bg-muted/30 transition-smooth">
                <div className="flex items-start space-x-4">
                  {/* Transaction Icon */}
                  <div className={`w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0`}>
                    <Icon name={icon} size={20} className={color} />
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {transaction?.type === 'donation' && 'Donation Received'}
                          {transaction?.type === 'withdrawal' && 'Funds Withdrawn'}
                          {transaction?.type === 'milestone' && 'Milestone Achieved'}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>From: {formatAddress(transaction?.from)}</span>
                          {transaction?.to && (
                            <span>To: {formatAddress(transaction?.to)}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction?.type === 'donation' ? 'text-success' :
                          transaction?.type === 'withdrawal'? 'text-warning' : 'text-primary'
                        }`}>
                          {transaction?.type === 'withdrawal' ? '-' : '+'}{transaction?.amount} ALGO
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.timestamp)?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Hash & Explorer Link */}
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                          <p className="font-mono text-xs text-foreground break-all">
                            {transaction?.txHash}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="ExternalLink"
                          iconPosition="right"
                          onClick={() => window.open(transaction?.explorerUrl, '_blank')}
                        >
                          View on AlgoExplorer
                        </Button>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {transaction?.message && (
                      <div className="mt-2 p-2 bg-primary/5 border border-primary/20 rounded">
                        <p className="text-sm text-foreground">{transaction?.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Load More Button */}
      {transactions?.length > 5 && (
        <div className="p-4 border-t border-border text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show All ${transactions?.length} Transactions`}
          </Button>
        </div>
      )}
      {/* Blockchain Verification Notice */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>All transactions are cryptographically verified on the Algorand blockchain</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
