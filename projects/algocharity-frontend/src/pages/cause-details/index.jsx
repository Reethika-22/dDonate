import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CauseHeader from './components/CauseHeader';
import DonationInterface from './components/DonationInterface';
import CauseInformation from './components/CauseInformation';
import TransactionHistory from './components/TransactionHistory';

const CauseDetailsPage = () => {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [cause, setCause] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Mock cause data
  const mockCause = {
    id: 1,
    title: "Clean Water Initiative for Rural Communities",
    shortDescription: "Providing sustainable access to clean drinking water for over 5,000 families in remote villages across East Africa through solar-powered water purification systems.",
    fullDescription: `This comprehensive initiative aims to address the critical water crisis affecting rural communities in East Africa. Our project focuses on installing solar-powered water purification systems that can serve entire villages, ensuring sustainable access to clean drinking water.\n\nThe initiative includes community training programs to ensure long-term maintenance and operation of the systems. Local technicians will be trained to handle repairs and routine maintenance, creating employment opportunities while ensuring system sustainability.\n\nEach installation serves approximately 500 families and includes water storage facilities, distribution points, and educational programs about water hygiene and conservation.`,
    impact: "Your donation directly funds the installation of water purification systems, training programs, and ongoing maintenance. Every contribution brings us closer to our goal of eliminating water-borne diseases in these communities and improving overall quality of life.",
    image: "https://images.unsplash.com/photo-1645212635491-7b3b87c66868",
    imageAlt: "African children collecting clean water from a solar-powered water purification system in a rural village setting",
    category: "Water & Sanitation",
    goal: 50000,
    raised: 32750,
    donorCount: 247,
    deadline: "2025-03-15",
    location: "Kilifi County, Kenya & Mbeya Region, Tanzania",
    beneficiaries: "Over 5,000 families across 10 rural villages",
    charity: {
      name: "WaterBridge Foundation",
      logo: "https://images.unsplash.com/photo-1684198265114-beb7ecba1b82",
      logoAlt: "WaterBridge Foundation logo showing a bridge over flowing water with African landscape"
    },
    impactBreakdown: [
    {
      amount: 100,
      description: "Provides clean water for 1 family for 6 months",
      icon: "Droplets"
    },
    {
      amount: 500,
      description: "Funds community training program for 20 people",
      icon: "Users"
    },
    {
      amount: 2500,
      description: "Installs one complete water purification unit",
      icon: "Settings"
    },
    {
      amount: 5000,
      description: "Covers maintenance and operations for 1 year",
      icon: "Wrench"
    }],

    milestones: [
    {
      amount: 10000,
      title: "Phase 1: Equipment Procurement",
      description: "Purchase solar panels, purification systems, and storage tanks"
    },
    {
      amount: 25000,
      title: "Phase 2: Installation & Setup",
      description: "Install systems in first 5 villages and begin operations"
    },
    {
      amount: 40000,
      title: "Phase 3: Training & Education",
      description: "Complete community training programs and establish maintenance protocols"
    },
    {
      amount: 50000,
      title: "Phase 4: Full Deployment",
      description: "Complete installation in all 10 target villages"
    }],

    updates: [
    {
      title: "Installation Complete in First Village",
      date: "2024-10-20",
      content: "Successfully installed and tested the first solar-powered water purification system in Malindi Village. The system is now providing clean water to 480 families daily.",
      image: "https://images.unsplash.com/photo-1682341847456-3121221fd773",
      imageAlt: "Newly installed solar-powered water purification system with villagers collecting water in the background"
    },
    {
      title: "Community Training Program Launched",
      date: "2024-10-15",
      content: "Began comprehensive training program for local technicians. 15 community members are learning system maintenance, repair procedures, and water quality testing protocols."
    },
    {
      title: "Equipment Shipment Arrived",
      date: "2024-10-10",
      content: "All solar panels, purification units, and storage tanks have arrived at the distribution center. Quality inspection completed successfully, and equipment is ready for deployment."
    }],

    smartContract: {
      address: "ALGO7X9K2M4N8P6Q3R5S1T7U9V2W4X6Y8Z0A1B3C5D7E9F",
      createdAt: "2024-09-15",
      features: [
      "Milestone-based fund release",
      "Multi-signature withdrawal",
      "Transparent fund tracking",
      "Automated compliance checks",
      "Donor verification system",
      "Emergency fund protection"]

    },
    totalTransactions: 247,
    lastActivity: "2024-10-27"
  };

  // Mock transaction data
  const mockTransactions = [
  {
    type: 'donation',
    amount: 25.5,
    from: 'ALGO1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z',
    txHash: 'TXN2024102807154523ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102807154523ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ',
    timestamp: '2024-10-28T07:15:45Z',
    message: 'Thank you for this amazing initiative! Hope this helps reach the goal.'
  },
  {
    type: 'donation',
    amount: 100,
    from: 'ALGO9Z8Y7X6W5V4U3T2S1R0Q9P8O7N6M5L4K3J2I1H0G9F8E7D6C5B4A3Z2Y1X0W',
    txHash: 'TXN2024102806423018DEF789GHI012JKL345MNO678PQR901STU234VWX567YZA890BCD123EF',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102806423018DEF789GHI012JKL345MNO678PQR901STU234VWX567YZA890BCD123EF',
    timestamp: '2024-10-28T06:42:30Z'
  },
  {
    type: 'milestone',
    amount: 0,
    from: 'ALGO_CONTRACT_SYSTEM',
    txHash: 'TXN2024102805301245GHI456JKL789MNO012PQR345STU678VWX901YZA234BCD567EFG890HIJ123',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102805301245GHI456JKL789MNO012PQR345STU678VWX901YZA234BCD567EFG890HIJ123',
    timestamp: '2024-10-28T05:30:12Z',
    message: 'Phase 2 milestone achieved! Installation and setup phase unlocked.'
  },
  {
    type: 'donation',
    amount: 50,
    from: 'ALGO5F4E3D2C1B0A9Z8Y7X6W5V4U3T2S1R0Q9P8O7N6M5L4K3J2I1H0G9F8E7D6C',
    txHash: 'TXN2024102804185637JKL123MNO456PQR789STU012VWX345YZA678BCD901EFG234HIJ567KLM890',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102804185637JKL123MNO456PQR789STU012VWX345YZA678BCD901EFG234HIJ567KLM890',
    timestamp: '2024-10-28T04:18:56Z'
  },
  {
    type: 'donation',
    amount: 15.25,
    from: 'ALGO3H2G1F0E9D8C7B6A5Z4Y3X2W1V0U9T8S7R6Q5P4O3N2M1L0K9J8I7H6G5F4E',
    txHash: 'TXN2024102803074421MNO789PQR012STU345VWX678YZA901BCD234EFG567HIJ890KLM123NOP456',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102803074421MNO789PQR012STU345VWX678YZA901BCD234EFG567HIJ890KLM123NOP456',
    timestamp: '2024-10-28T03:07:44Z'
  },
  {
    type: 'withdrawal',
    amount: 5000,
    from: 'ALGO_CONTRACT_SYSTEM',
    to: 'ALGO_CHARITY_WALLET_WBF2024',
    txHash: 'TXN2024102801234567PQR345STU678VWX901YZA234BCD567EFG890HIJ123KLM456NOP789QRS012',
    explorerUrl: 'https://testnet.algoexplorer.io/tx/TXN2024102801234567PQR345STU678VWX901YZA234BCD567EFG890HIJ123KLM456NOP789QRS012',
    timestamp: '2024-10-28T01:23:45Z',
    message: 'Phase 1 milestone funds released for equipment procurement.'
  }];


  useEffect(() => {
    // Initialize cause data
    setCause(mockCause);
    setTransactions(mockTransactions);

    // Check wallet connection status from localStorage or context
    const walletStatus = localStorage.getItem('walletConnected');
    setIsWalletConnected(walletStatus === 'true');
  }, []);

  const handleDonation = (transactionData) => {
    // Add new transaction to the list
    const newTransaction = {
      type: 'donation',
      amount: transactionData?.amount,
      from: 'YOUR_WALLET_ADDRESS_HERE',
      txHash: transactionData?.txId,
      explorerUrl: transactionData?.explorerUrl,
      timestamp: transactionData?.timestamp?.toISOString(),
      message: 'Thank you for your generous donation!'
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Update cause raised amount
    setCause((prev) => ({
      ...prev,
      raised: prev?.raised + transactionData?.amount,
      donorCount: prev?.donorCount + 1
    }));
  };

  if (!cause) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading cause details...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <CauseHeader cause={cause} />
              <CauseInformation cause={cause} />
              <TransactionHistory transactions={transactions} />
            </div>

            {/* Right Column - Donation Interface */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <DonationInterface
                  cause={cause}
                  onDonate={handleDonation}
                  isWalletConnected={isWalletConnected} />

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default CauseDetailsPage;
