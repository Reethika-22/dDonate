import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CauseCard from './components/CauseCard';
import FilterControls from './components/FilterControls';
import PlatformStats from './components/PlatformStats';
import DonationModal from './components/DonationModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConnectWalletButton from "../../components/ConnectWalletButton"; // 🪙 Added import

const LandingPage = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    progress: 'all',
    sort: 'recent',
    search: '',
    minGoal: '',
    maxGoal: ''
  });

  const [selectedCause, setSelectedCause] = useState(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const causesPerPage = 9;

  // Mock platform statistics
  const platformStats = {
    totalCauses: 247,
    totalDonated: 125847,
    totalDonors: 3421,
    causesFunded: 89
  };

  // Mock causes data (keeping your existing array)
  const mockCauses = [/* ... your existing causes array here ... */];

  // Filter and sort causes
  const getFilteredCauses = () => {
    let filtered = [...mockCauses];
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((cause) => cause?.category === filters?.category);
    }
    if (filters?.progress !== 'all') {
      filtered = filtered?.filter((cause) => {
        const progress = (cause?.raised / cause?.goal) * 100;
        switch (filters?.progress) {
          case 'new': return progress <= 25;
          case 'active': return progress > 25 && progress <= 75;
          case 'almost': return progress > 75 && progress < 100;
          case 'completed': return progress >= 100;
          default: return true;
        }
      });
    }
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((cause) =>
        cause?.title?.toLowerCase()?.includes(searchTerm) ||
        cause?.charityName?.toLowerCase()?.includes(searchTerm) ||
        cause?.description?.toLowerCase()?.includes(searchTerm)
      );
    }
    if (filters?.minGoal) {
      filtered = filtered?.filter((cause) => cause?.goal >= parseFloat(filters?.minGoal));
    }
    if (filters?.maxGoal) {
      filtered = filtered?.filter((cause) => cause?.goal <= parseFloat(filters?.maxGoal));
    }

    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'recent': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'progress': return b?.raised / b?.goal - a?.raised / a?.goal;
        case 'goal_high': return b?.goal - a?.goal;
        case 'goal_low': return a?.goal - b?.goal;
        case 'donors': return b?.donorCount - a?.donorCount;
        case 'urgent': return a?.daysLeft - b?.daysLeft;
        default: return 0;
      }
    });

    return filtered;
  };

  const filteredCauses = getFilteredCauses();
  const totalPages = Math.ceil(filteredCauses?.length / causesPerPage);
  const paginatedCauses = filteredCauses?.slice(
    (currentPage - 1) * causesPerPage,
    currentPage * causesPerPage
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      progress: 'all',
      sort: 'recent',
      search: '',
      minGoal: '',
      maxGoal: ''
    });
    setCurrentPage(1);
  };

  const handleDonate = (cause) => {
    setSelectedCause(cause);
    setIsDonationModalOpen(true);
  };

  const handleDonationComplete = (causeId, amount) => {
    console.log(`Donated ${amount} ALGO to cause ${causeId}`);
  };

  useEffect(() => {
    const connected = localStorage.getItem('walletConnected') === 'true';
    setIsWalletConnected(connected);
  }, []);

  return (
    <>
      <Helmet>
        <title>Discover Causes - AlgoCharity DApp</title>
        <meta name="description" content="Browse and donate to verified charitable causes on the Algorand blockchain. Transparent, secure, and immutable charitable giving." />
        <meta name="keywords" content="charity, donation, blockchain, Algorand, transparent giving, cryptocurrency" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb />

            {/* 🪙 Connect Pera Wallet Button */}
            <div className="flex justify-center mb-8">
              <ConnectWalletButton />
            </div>

            {/* Platform Statistics */}
            <PlatformStats stats={platformStats} />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalCauses={mockCauses?.length}
              filteredCount={filteredCauses?.length}
            />

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Active Charitable Causes
              </h1>
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Causes Grid */}
            {paginatedCauses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedCauses?.map((cause) => (
                  <CauseCard key={cause?.id} cause={cause} onDonate={handleDonate} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No causes found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </main>

        <DonationModal
          cause={selectedCause}
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          onDonate={handleDonationComplete}
          isWalletConnected={isWalletConnected}
        />
      </div>
    </>
  );
};

export default LandingPage;
