import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TransactionOversight = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [transactionType, setTransactionType] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: "TXN-2025-001234",
      type: "donation",
      amount: 500,
      donor: "0x1a2b...3c4d",
      charity: "Clean Water Initiative",
      cause: "Rural Water Access Project",
      timestamp: "2025-10-28 06:45:23",
      status: "confirmed",
      blockHeight: 34567890,
      txHash: "7f8e9d0c1b2a3456789abcdef0123456789abcdef0123456789abcdef012345",
      gasUsed: 21000,
      riskScore: 12
    },
    {
      id: "TXN-2025-001235",
      type: "withdrawal",
      amount: 15000,
      donor: "N/A",
      charity: "Education for All Foundation",
      cause: "Digital Learning Resources",
      timestamp: "2025-10-28 05:30:15",
      status: "confirmed",
      blockHeight: 34567845,
      txHash: "8g9f0e1d2c3b456789abcdef0123456789abcdef0123456789abcdef0123456",
      gasUsed: 45000,
      riskScore: 8
    },
    {
      id: "TXN-2025-001236",
      type: "donation",
      amount: 1250,
      donor: "0x5e6f...7g8h",
      charity: "Green Earth Conservation",
      cause: "Reforestation Initiative",
      timestamp: "2025-10-28 04:15:42",
      status: "confirmed",
      blockHeight: 34567823,
      txHash: "9h0g1f2e3d4c56789abcdef0123456789abcdef0123456789abcdef01234567",
      gasUsed: 21000,
      riskScore: 15
    },
    {
      id: "TXN-2025-001237",
      type: "donation",
      amount: 2500,
      donor: "0x9i0j...1k2l",
      charity: "Medical Aid International",
      cause: "Emergency Medical Equipment",
      timestamp: "2025-10-28 03:22:18",
      status: "pending",
      blockHeight: null,
      txHash: "0i1h2g3f4e5d6789abcdef0123456789abcdef0123456789abcdef012345678",
      gasUsed: null,
      riskScore: 45
    },
    {
      id: "TXN-2025-001238",
      type: "donation",
      amount: 750,
      donor: "0x3m4n...5o6p",
      charity: "Animal Rescue Network",
      cause: "Pet Shelter Expansion",
      timestamp: "2025-10-28 02:08:55",
      status: "confirmed",
      blockHeight: 34567789,
      txHash: "1j2i3h4g5f6e789abcdef0123456789abcdef0123456789abcdef0123456789",
      gasUsed: 21000,
      riskScore: 6
    },
    {
      id: "TXN-2025-001239",
      type: "withdrawal",
      amount: 8500,
      donor: "N/A",
      charity: "Clean Water Initiative",
      cause: "Rural Water Access Project",
      timestamp: "2025-10-27 23:45:12",
      status: "confirmed",
      blockHeight: 34567756,
      txHash: "2k3j4i5h6g7f89abcdef0123456789abcdef0123456789abcdef012345678a",
      gasUsed: 42000,
      riskScore: 22
    }
  ];

  const timeframeOptions = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'donation', label: 'Donations' },
    { value: 'withdrawal', label: 'Withdrawals' }
  ];

  const amountOptions = [
    { value: 'all', label: 'All Amounts' },
    { value: 'small', label: '< 1,000 ALGO' },
    { value: 'medium', label: '1,000 - 10,000 ALGO' },
    { value: 'large', label: '> 10,000 ALGO' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'donation': return 'text-primary bg-primary/10 border-primary/20';
      case 'withdrawal': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 30) return 'text-error bg-error/10 border-error/20';
    if (score >= 15) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-success bg-success/10 border-success/20';
  };

  const getRiskLevel = (score) => {
    if (score >= 30) return 'High';
    if (score >= 15) return 'Medium';
    return 'Low';
  };

  const filteredTransactions = transactions?.filter(tx => {
    const matchesSearch = tx?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         tx?.charity?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         tx?.cause?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         (tx?.donor !== 'N/A' && tx?.donor?.toLowerCase()?.includes(searchTerm?.toLowerCase()));

    const matchesType = transactionType === 'all' || tx?.type === transactionType;

    const matchesAmount = amountFilter === 'all' ||
                         (amountFilter === 'small' && tx?.amount < 1000) ||
                         (amountFilter === 'medium' && tx?.amount >= 1000 && tx?.amount <= 10000) ||
                         (amountFilter === 'large' && tx?.amount > 10000);

    return matchesSearch && matchesType && matchesAmount;
  });

  const handleExportTransactions = () => {
    console.log('Exporting transactions...');
    // Implementation would handle CSV/Excel export
  };

  const handleInvestigateTransaction = (txId) => {
    console.log(`Investigating transaction ${txId}`);
    // Implementation would open detailed investigation view
  };

  const handleFlagTransaction = (txId) => {
    console.log(`Flagging transaction ${txId} for review`);
    // Implementation would flag transaction for manual review
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Transaction Oversight</h2>
          <p className="text-muted-foreground mt-1">Monitor and analyze all platform transactions</p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportTransactions}
          iconName="Download"
          iconPosition="left"
        >
          Export Data
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>

        <div>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeframeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e?.target?.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {typeOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={amountFilter}
            onChange={(e) => setAmountFilter(e?.target?.value)}
            className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {amountOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setTransactionType('all');
              setAmountFilter('all');
              setSelectedTimeframe('7d');
            }}
            iconName="RotateCcw"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Volume</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {filteredTransactions?.reduce((sum, tx) => sum + tx?.amount, 0)?.toLocaleString()} ALGO
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={20} className="text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">Transactions</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{filteredTransactions?.length}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Heart" size={20} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Donations</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {filteredTransactions?.filter(tx => tx?.type === 'donation')?.length}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="text-sm font-medium text-muted-foreground">High Risk</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {filteredTransactions?.filter(tx => tx?.riskScore >= 30)?.length}
          </div>
        </div>
      </div>
      {/* Transactions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Transaction ID</th>
                <th className="text-left p-4 font-semibold text-foreground">Type</th>
                <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                <th className="text-left p-4 font-semibold text-foreground">Charity/Cause</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Risk</th>
                <th className="text-left p-4 font-semibold text-foreground">Timestamp</th>
                <th className="text-left p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.map((transaction) => (
                <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="p-4">
                    <div className="font-mono text-sm text-foreground">{transaction?.id}</div>
                    {transaction?.txHash && (
                      <div className="text-xs text-muted-foreground truncate max-w-32">
                        {transaction?.txHash}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getTypeColor(transaction?.type)}`}>
                      {transaction?.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-foreground">
                      {transaction?.amount?.toLocaleString()} ALGO
                    </div>
                    {transaction?.donor !== 'N/A' && (
                      <div className="text-xs text-muted-foreground font-mono">
                        {transaction?.donor}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground">{transaction?.charity}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-48">
                      {transaction?.cause}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getStatusColor(transaction?.status)}`}>
                      {transaction?.status}
                    </span>
                    {transaction?.blockHeight && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Block: {transaction?.blockHeight?.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getRiskColor(transaction?.riskScore)}`}>
                      {getRiskLevel(transaction?.riskScore)}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Score: {transaction?.riskScore}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.timestamp)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.timestamp)?.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleInvestigateTransaction(transaction?.id)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                        title="Investigate"
                      >
                        <Icon name="Search" size={16} />
                      </button>
                      <button
                        onClick={() => handleFlagTransaction(transaction?.id)}
                        className="p-1 text-muted-foreground hover:text-warning transition-smooth"
                        title="Flag for Review"
                      >
                        <Icon name="Flag" size={16} />
                      </button>
                      {transaction?.txHash && (
                        <a
                          href={`https://testnet.algoexplorer.io/tx/${transaction?.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-muted-foreground hover:text-primary transition-smooth"
                          title="View on AlgoExplorer"
                        >
                          <Icon name="ExternalLink" size={16} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find transactions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionOversight;
