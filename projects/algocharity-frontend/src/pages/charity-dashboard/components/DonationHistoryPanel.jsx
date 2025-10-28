import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DonationHistoryPanel = ({ donations, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const periodOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date (Newest)' },
    { value: 'amount', label: 'Amount (Highest)' },
    { value: 'donor', label: 'Donor Name' }
  ];

  const formatALGO = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const donationDate = new Date(date);
    const diffInHours = Math.floor((now - donationDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(date);
  };

  const filteredDonations = donations?.filter(donation => {
    const matchesSearch = donation?.donorName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         donation?.transactionId?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    if (filterPeriod === 'all') return matchesSearch;

    const donationDate = new Date(donation.date);
    const now = new Date();
    const daysAgo = parseInt(filterPeriod?.replace('days', ''));
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));

    return matchesSearch && donationDate >= cutoffDate;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'amount':
        return b?.amount - a?.amount;
      case 'donor':
        return a?.donorName?.localeCompare(b?.donorName);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const totalPages = Math.ceil(filteredDonations?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDonations = filteredDonations?.slice(startIndex, startIndex + itemsPerPage);

  const totalAmount = filteredDonations?.reduce((sum, donation) => sum + donation?.amount, 0);

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Donation History</h2>
            <p className="text-sm text-muted-foreground">
              {filteredDonations?.length} donations • {formatALGO(totalAmount)} ALGO total
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by donor or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
          <Select
            options={periodOptions}
            value={filterPeriod}
            onChange={setFilterPeriod}
            placeholder="Filter by period"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Donations List */}
      <div className="divide-y divide-border">
        {paginatedDonations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No donations found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterPeriod !== 'all' ?'Try adjusting your search or filter criteria.' :'Donations will appear here once received.'}
            </p>
          </div>
        ) : (
          paginatedDonations?.map((donation) => (
            <div key={donation?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{donation?.donorName}</span>
                      {donation?.isAnonymous && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          Anonymous
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{getTimeAgo(donation?.date)}</span>
                      <span>•</span>
                      <span className="font-mono">{donation?.transactionId?.substring(0, 8)}...</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    +{formatALGO(donation?.amount)} ALGO
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-success">Confirmed</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(`https://testnet.algoexplorer.io/tx/${donation?.transactionId}`, '_blank')}
                      className="w-6 h-6"
                    >
                      <Icon name="ExternalLink" size={12} />
                    </Button>
                  </div>
                </div>
              </div>

              {donation?.message && (
                <div className="mt-3 ml-14 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground italic">"{donation?.message}"</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDonations?.length)} of {filteredDonations?.length}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistoryPanel;
