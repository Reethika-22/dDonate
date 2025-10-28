import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CauseOverviewCard from './components/CauseOverviewCard';
import DonationHistoryPanel from './components/DonationHistoryPanel';
import WithdrawalInterface from './components/WithdrawalInterface';
import AnalyticsSection from './components/AnalyticsSection';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';


const CharityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for charity dashboard
  const charityInfo = {
    id: "charity_001",
    name: "Global Education Initiative",
    registrationNumber: "REG-2023-001",
    status: "verified",
    joinedDate: "2023-03-15",
    totalRaised: 15847.50,
    totalWithdrawn: 8500.00,
    activeCauses: 3,
    totalDonors: 1247
  };

  const causes = [
  {
    id: "cause_001",
    title: "Clean Water Access for Rural Communities",
    category: "Water & Sanitation",
    description: `Providing sustainable clean water solutions to underserved rural communities through the installation of solar-powered water purification systems.\n\nOur initiative focuses on long-term sustainability by training local technicians and establishing maintenance protocols that ensure these systems continue to serve communities for years to come.`,
    image: "https://images.unsplash.com/photo-1649592933820-f539ee47bf16",
    imageAlt: "Solar-powered water purification system in rural village with community members gathering clean water",
    goal: 5000.00,
    raised: 4250.75,
    availableBalance: 4250.75,
    donorCount: 342,
    transactionCount: 428,
    averageDonation: 12.43,
    status: "active",
    endDate: "2024-12-31",
    goalReached: false,
    adminApproved: true,
    withdrawalStatus: "approved",
    recentDonation: {
      amount: 25.50,
      timeAgo: "2 hours ago"
    }
  },
  {
    id: "cause_002",
    title: "Digital Learning Centers for Underserved Youth",
    category: "Education",
    description: `Establishing technology-equipped learning centers in underserved communities to bridge the digital divide and provide quality educational opportunities.\n\nEach center includes computers, high-speed internet, educational software, and trained instructors to help students develop essential digital literacy skills.`,
    image: "https://images.unsplash.com/photo-1653565685072-adcf967db6b7",
    imageAlt: "Children using computers in modern digital learning center with instructor helping students",
    goal: 8000.00,
    raised: 8000.00,
    availableBalance: 8000.00,
    donorCount: 567,
    transactionCount: 623,
    averageDonation: 14.11,
    status: "active",
    endDate: "2024-11-30",
    goalReached: true,
    adminApproved: true,
    withdrawalStatus: "approved",
    recentDonation: {
      amount: 50.00,
      timeAgo: "1 day ago"
    }
  },
  {
    id: "cause_003",
    title: "Emergency Medical Supply Distribution",
    category: "Healthcare",
    description: `Rapid deployment of essential medical supplies to communities affected by natural disasters and health emergencies.\n\nOur network of trained volunteers ensures that critical medical aid reaches those who need it most within 48 hours of deployment authorization.`,
    image: "https://images.unsplash.com/photo-1680778469882-a186a77e67d3",
    imageAlt: "Medical volunteers distributing emergency supplies and first aid kits to disaster-affected community",
    goal: 3000.00,
    raised: 1596.75,
    availableBalance: 1596.75,
    donorCount: 189,
    transactionCount: 203,
    averageDonation: 8.45,
    status: "active",
    endDate: "2024-10-31",
    goalReached: false,
    adminApproved: false,
    withdrawalStatus: "pending",
    recentDonation: {
      amount: 15.25,
      timeAgo: "5 hours ago"
    }
  }];


  const donations = [
  {
    id: "don_001",
    donorName: "Sarah Chen",
    amount: 50.00,
    date: "2024-10-28T05:17:10.036Z",
    transactionId: "TXID7H8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2I3J4K5L6M",
    causeId: "cause_001",
    causeName: "Clean Water Access for Rural Communities",
    isAnonymous: false,
    message: "Hope this helps bring clean water to those who need it most. Keep up the amazing work!"
  },
  {
    id: "don_002",
    donorName: "Anonymous Donor",
    amount: 25.50,
    date: "2024-10-28T03:45:22.123Z",
    transactionId: "TXID8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M",
    causeId: "cause_001",
    causeName: "Clean Water Access for Rural Communities",
    isAnonymous: true,
    message: null
  },
  {
    id: "don_003",
    donorName: "Michael Rodriguez",
    amount: 100.00,
    date: "2024-10-27T22:30:15.456Z",
    transactionId: "TXID9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N",
    causeId: "cause_002",
    causeName: "Digital Learning Centers for Underserved Youth",
    isAnonymous: false,
    message: "Education is the foundation of progress. Proud to support this initiative."
  },
  {
    id: "don_004",
    donorName: "Emily Johnson",
    amount: 75.25,
    date: "2024-10-27T18:15:33.789Z",
    transactionId: "TXID0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O",
    causeId: "cause_002",
    causeName: "Digital Learning Centers for Underserved Youth",
    isAnonymous: false,
    message: "Technology should be accessible to all children. Thank you for making this possible."
  },
  {
    id: "don_005",
    donorName: "David Park",
    amount: 30.00,
    date: "2024-10-27T14:22:45.012Z",
    transactionId: "TXID1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9N0O1P",
    causeId: "cause_003",
    causeName: "Emergency Medical Supply Distribution",
    isAnonymous: false,
    message: "Every life matters. Hope this helps save someone in need."
  }];


  const notifications = [
  {
    id: "notif_001",
    type: "donation",
    title: "New Donation Received",
    message: "Sarah Chen donated 50.00 ALGO to Clean Water Access for Rural Communities",
    createdAt: "2024-10-28T05:17:10.036Z",
    read: false,
    actionUrl: "/charity-dashboard?tab=donations",
    metadata: {
      amount: "50.00",
      donorName: "Sarah Chen",
      causeName: "Clean Water Access for Rural Communities"
    }
  },
  {
    id: "notif_002",
    type: "approval",
    title: "Cause Approved",
    message: "Your cause \'Clean Water Access for Rural Communities\' has been approved by admin",
    createdAt: "2024-10-27T10:30:00.000Z",
    read: false,
    actionUrl: "/charity-dashboard?tab=overview",
    metadata: {
      causeName: "Clean Water Access for Rural Communities",
      status: "approved"
    }
  },
  {
    id: "notif_003",
    type: "system",
    title: "Monthly Report Available",
    message: "Your October donation report is ready for download",
    createdAt: "2024-10-26T09:00:00.000Z",
    read: true,
    actionUrl: "/charity-dashboard?tab=analytics",
    metadata: {
      reportType: "monthly",
      period: "October 2024"
    }
  },
  {
    id: "notif_004",
    type: "withdrawal",
    title: "Withdrawal Processed",
    message: "Your withdrawal of 2500.00 ALGO has been successfully processed",
    createdAt: "2024-10-25T16:45:00.000Z",
    read: true,
    actionUrl: "/charity-dashboard?tab=withdrawals",
    metadata: {
      amount: "2500.00",
      transactionId: "TXIDWITHDRAWAL123456789"
    }
  },
  {
    id: "notif_005",
    type: "alert",
    title: "Goal Achievement Alert",
    message: "Digital Learning Centers cause has reached 100% of its funding goal!",
    createdAt: "2024-10-24T12:20:00.000Z",
    read: true,
    actionUrl: "/charity-dashboard?tab=overview",
    metadata: {
      causeName: "Digital Learning Centers for Underserved Youth",
      achievement: "goal_reached"
    }
  }];


  const analyticsData = {
    keyMetrics: [
    {
      id: "total_raised",
      label: "Total Raised",
      value: "15,847.50 ALGO",
      trend: 12.5,
      icon: "TrendingUp",
      bgColor: "bg-success/10",
      iconColor: "text-success"
    },
    {
      id: "active_causes",
      label: "Active Causes",
      value: "3",
      trend: 0,
      icon: "Heart",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      id: "total_donors",
      label: "Total Donors",
      value: "1,247",
      trend: 8.3,
      icon: "Users",
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    },
    {
      id: "avg_donation",
      label: "Avg Donation",
      value: "12.71 ALGO",
      trend: -2.1,
      icon: "DollarSign",
      bgColor: "bg-error/10",
      iconColor: "text-error"
    }],

    donationTrends: [
    { date: "Oct 21", amount: 245.50 },
    { date: "Oct 22", amount: 312.75 },
    { date: "Oct 23", amount: 189.25 },
    { date: "Oct 24", amount: 456.00 },
    { date: "Oct 25", amount: 378.50 },
    { date: "Oct 26", amount: 523.25 },
    { date: "Oct 27", amount: 298.75 }],

    donorGrowth: [
    { date: "Oct 21", newDonors: 12 },
    { date: "Oct 22", newDonors: 18 },
    { date: "Oct 23", newDonors: 8 },
    { date: "Oct 24", newDonors: 25 },
    { date: "Oct 25", newDonors: 15 },
    { date: "Oct 26", newDonors: 32 },
    { date: "Oct 27", newDonors: 19 }],

    causePerformance: [
    { name: "Clean Water Access", amount: 4250.75 },
    { name: "Digital Learning Centers", amount: 8000.00 },
    { name: "Emergency Medical Supply", amount: 1596.75 }],

    donationDistribution: [
    { range: "1-10 ALGO", count: 456, percentage: 65 },
    { range: "11-50 ALGO", count: 234, percentage: 25 },
    { range: "51-100 ALGO", count: 89, percentage: 8 },
    { range: "100+ ALGO", count: 23, percentage: 2 }],

    recentActivity: {
      donationsToday: 8,
      amountToday: 287.50,
      newDonorsToday: 3
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditCause = (cause) => {
    console.log('Edit cause:', cause);
    // Implementation for cause editing
  };

  const handleViewCauseDetails = (cause) => {
    console.log('View cause details:', cause);
    // Implementation for viewing cause details
  };

  const handleWithdraw = async (withdrawalData) => {
    console.log('Processing withdrawal:', withdrawalData);
    // Implementation for withdrawal processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: 'TXID_WITHDRAWAL_' + Date.now() });
      }, 2000);
    });
  };

  const handleExportDonations = () => {
    console.log('Exporting donation history');
    // Implementation for exporting donations
  };

  const handleExportAnalytics = () => {
    console.log('Exporting analytics report');
    // Implementation for exporting analytics
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log('Mark notification as read:', notificationId);
    // Implementation for marking notification as read
  };

  const handleMarkAllNotificationsAsRead = () => {
    console.log('Mark all notifications as read');
    // Implementation for marking all notifications as read
  };

  const totalAvailableFunds = causes?.reduce((sum, cause) => sum + cause?.availableBalance, 0);

  const tabItems = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'donations', label: 'Donations', icon: 'Heart' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'Banknote' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' }];


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Charity Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {charityInfo?.name}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total Available</div>
                  <div className="text-xl font-bold text-foreground">
                    {totalAvailableFunds?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} ALGO
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                charityInfo?.status === 'verified' ?
                'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`
                }>
                  {charityInfo?.status === 'verified' ? 'Verified' : 'Pending'}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                  <span className="text-sm text-muted-foreground">Total Raised</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {charityInfo?.totalRaised?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ALGO
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={20} className="text-primary" />
                  <span className="text-sm text-muted-foreground">Active Causes</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {charityInfo?.activeCauses}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-warning" />
                  <span className="text-sm text-muted-foreground">Total Donors</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {charityInfo?.totalDonors?.toLocaleString()}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Banknote" size={20} className="text-error" />
                  <span className="text-sm text-muted-foreground">Withdrawn</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {charityInfo?.totalWithdrawn?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })} ALGO
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabItems?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.id === 'notifications' && notifications?.filter((n) => !n?.read)?.length > 0 &&
                  <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                        {notifications?.filter((n) => !n?.read)?.length}
                      </span>
                  }
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'overview' &&
            <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Active Causes</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {causes?.map((cause) =>
                  <CauseOverviewCard
                    key={cause?.id}
                    cause={cause}
                    onEdit={handleEditCause}
                    onViewDetails={handleViewCauseDetails} />

                  )}
                  </div>
                </div>
              </div>
            }

            {activeTab === 'donations' &&
            <DonationHistoryPanel
              donations={donations}
              onExport={handleExportDonations} />

            }

            {activeTab === 'withdrawals' &&
            <WithdrawalInterface
              availableFunds={totalAvailableFunds}
              causes={causes}
              onWithdraw={handleWithdraw} />

            }

            {activeTab === 'analytics' &&
            <AnalyticsSection
              analyticsData={analyticsData}
              onExportReport={handleExportAnalytics} />

            }

            {activeTab === 'notifications' &&
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead} />

            }
          </div>
        </div>
      </div>
    </div>);

};

export default CharityDashboard;
