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

  // Mock causes data
  const mockCauses = [
  {
    id: 1,
    title: "Clean Water Initiative for Rural Communities",
    charityName: "WaterAid Global",
    description: `Providing access to clean, safe drinking water for remote villages in developing regions. This project will install solar-powered water purification systems and train local communities in maintenance and operation.`,
    category: "environment",
    goal: 50000,
    raised: 32750,
    donorCount: 156,
    daysLeft: 23,
    image: "https://images.unsplash.com/photo-1508463246959-e6f5f088979f",
    imageAlt: "Children collecting clean water from a new well in a rural village with mountains in background",
    isVerified: true,
    createdAt: new Date('2024-10-15')
  },
  {
    id: 2,
    title: "Emergency Medical Equipment for Children\'s Hospital",
    charityName: "Pediatric Care Foundation",
    description: `Urgent funding needed for life-saving medical equipment including ventilators, monitors, and surgical instruments for the children's wing of our partner hospital in underserved areas.`,
    category: "healthcare",
    goal: 75000,
    raised: 68250,
    donorCount: 203,
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1717147454741-82334034f117",
    imageAlt: "Modern pediatric hospital room with medical equipment and colorful child-friendly decorations",
    isVerified: true,
    createdAt: new Date('2024-10-20')
  },
  {
    id: 3,
    title: "Digital Learning Centers for Underprivileged Students",
    charityName: "Education First Alliance",
    description: `Establishing computer labs and internet connectivity in schools serving low-income communities. Each center will provide digital literacy training and access to online educational resources.`,
    category: "education",
    goal: 35000,
    raised: 8750,
    donorCount: 67,
    daysLeft: 45,
    image: "https://images.unsplash.com/photo-1653565685072-adcf967db6b7",
    imageAlt: "Students working on computers in a bright classroom with teacher providing guidance",
    isVerified: true,
    createdAt: new Date('2024-10-25')
  },
  {
    id: 4,
    title: "Wildlife Conservation and Anti-Poaching Program",
    charityName: "African Wildlife Trust",
    description: `Protecting endangered species through advanced surveillance technology, ranger training, and community engagement programs. Focus on elephant and rhino conservation in East Africa.`,
    category: "animal",
    goal: 100000,
    raised: 45600,
    donorCount: 289,
    daysLeft: 67,
    image: "https://images.unsplash.com/photo-1696884149898-487154fd6248",
    imageAlt: "African elephant family walking through savanna grassland with acacia trees at sunset",
    isVerified: true,
    createdAt: new Date('2024-10-10')
  },
  {
    id: 5,
    title: "Hurricane Relief and Rebuilding Support",
    charityName: "Disaster Response Network",
    description: `Immediate relief and long-term rebuilding assistance for families affected by recent hurricane damage. Providing temporary shelter, food supplies, and construction materials for home repairs.`,
    category: "disaster",
    goal: 80000,
    raised: 80000,
    donorCount: 412,
    daysLeft: 0,
    image: "https://images.unsplash.com/photo-1657359973581-070d6c35e92a",
    imageAlt: "Volunteers distributing relief supplies from trucks to hurricane survivors in damaged neighborhood",
    isVerified: true,
    createdAt: new Date('2024-09-28')
  },
  {
    id: 6,
    title: "Mobile Health Clinics for Remote Areas",
    charityName: "Rural Health Initiative",
    description: `Deploying fully equipped mobile medical units to provide healthcare services in isolated communities. Each clinic offers basic medical care, vaccinations, and health education programs.`,
    category: "healthcare",
    goal: 60000,
    raised: 22800,
    donorCount: 134,
    daysLeft: 38,
    image: "https://images.unsplash.com/photo-1680759291617-2923935d803a",
    imageAlt: "Medical professional examining patient inside mobile health clinic van in rural setting",
    isVerified: true,
    createdAt: new Date('2024-10-18')
  },
  {
    id: 7,
    title: "Sustainable Agriculture Training Program",
    charityName: "Green Farming Collective",
    description: `Teaching sustainable farming techniques to smallholder farmers, including organic methods, water conservation, and crop rotation. Program includes seed distribution and ongoing mentorship.`,
    category: "community",
    goal: 25000,
    raised: 19750,
    donorCount: 98,
    daysLeft: 29,
    image: "https://images.unsplash.com/photo-1657513863252-d9f47b78ef9a",
    imageAlt: "Farmer teaching sustainable agriculture techniques to group of students in green vegetable field",
    isVerified: true,
    createdAt: new Date('2024-10-22')
  },
  {
    id: 8,
    title: "Homeless Shelter Winter Preparation",
    charityName: "Urban Care Services",
    description: `Preparing homeless shelters for winter season with heating systems, warm clothing, blankets, and nutritious meal programs. Ensuring safe, warm accommodation for vulnerable populations.`,
    category: "poverty",
    goal: 40000,
    raised: 31200,
    donorCount: 187,
    daysLeft: 18,
    image: "https://images.unsplash.com/photo-1668452594288-7ebac40ec67e",
    imageAlt: "Volunteers serving hot meals to people at homeless shelter with warm lighting and caring atmosphere",
    isVerified: true,
    createdAt: new Date('2024-10-12')
  },
  {
    id: 9,
    title: "Reforestation and Carbon Offset Initiative",
    charityName: "Climate Action Network",
    description: `Large-scale tree planting project to restore degraded forest areas and combat climate change. Each tree planted is tracked and monitored for long-term environmental impact measurement.`,
    category: "environment",
    goal: 90000,
    raised: 54000,
    donorCount: 356,
    daysLeft: 52,
    image: "https://images.unsplash.com/photo-1609226511778-60c277756b6e",
    imageAlt: "Volunteers planting young trees in deforested area with mountains and blue sky in background",
    isVerified: true,
    createdAt: new Date('2024-10-08')
  },
  {
    id: 10,
    title: "Senior Citizens Technology Training",
    charityName: "Digital Inclusion Society",
    description: `Bridging the digital divide by teaching elderly community members how to use smartphones, tablets, and computers for communication, healthcare, and daily activities.`,
    category: "community",
    goal: 15000,
    raised: 3750,
    donorCount: 42,
    daysLeft: 61,
    image: "https://images.unsplash.com/photo-1661250150188-242c8ab80bfc",
    imageAlt: "Elderly woman learning to use tablet computer with young volunteer instructor in bright community center",
    isVerified: true,
    createdAt: new Date('2024-10-26')
  },
  {
    id: 11,
    title: "Animal Rescue and Rehabilitation Center",
    charityName: "Paws & Hearts Sanctuary",
    description: `Building a comprehensive facility for rescuing, treating, and rehabilitating abandoned and injured animals. Includes veterinary clinic, recovery areas, and adoption services.`,
    category: "animal",
    goal: 70000,
    raised: 42000,
    donorCount: 278,
    daysLeft: 34,
    image: "https://images.unsplash.com/photo-1700665537604-412e89a285c3",
    imageAlt: "Veterinarian caring for rescued puppy in modern animal clinic with medical equipment visible",
    isVerified: true,
    createdAt: new Date('2024-10-14')
  },
  {
    id: 12,
    title: "Scholarship Fund for First-Generation College Students",
    charityName: "Future Leaders Foundation",
    description: `Providing full scholarships and mentorship support for students who are the first in their families to attend college. Includes tuition, books, and living expenses coverage.`,
    category: "education",
    goal: 120000,
    raised: 84000,
    donorCount: 445,
    daysLeft: 89,
    image: "https://images.unsplash.com/photo-1665567031505-49c536110178",
    imageAlt: "Diverse group of college students celebrating graduation in caps and gowns on university campus",
    isVerified: true,
    createdAt: new Date('2024-09-30')
  }];


  // Filter and sort causes
  const getFilteredCauses = () => {
    let filtered = [...mockCauses];

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((cause) => cause?.category === filters?.category);
    }

    // Progress filter
    if (filters?.progress !== 'all') {
      filtered = filtered?.filter((cause) => {
        const progress = cause?.raised / cause?.goal * 100;
        switch (filters?.progress) {
          case 'new':return progress <= 25;
          case 'active':return progress > 25 && progress <= 75;
          case 'almost':return progress > 75 && progress < 100;
          case 'completed':return progress >= 100;
          default:return true;
        }
      });
    }

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((cause) =>
      cause?.title?.toLowerCase()?.includes(searchTerm) ||
      cause?.charityName?.toLowerCase()?.includes(searchTerm) ||
      cause?.description?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Goal range filter
    if (filters?.minGoal) {
      filtered = filtered?.filter((cause) => cause?.goal >= parseFloat(filters?.minGoal));
    }
    if (filters?.maxGoal) {
      filtered = filtered?.filter((cause) => cause?.goal <= parseFloat(filters?.maxGoal));
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'progress':
          return b?.raised / b?.goal - a?.raised / a?.goal;
        case 'goal_high':
          return b?.goal - a?.goal;
        case 'goal_low':
          return a?.goal - b?.goal;
        case 'donors':
          return b?.donorCount - a?.donorCount;
        case 'urgent':
          return a?.daysLeft - b?.daysLeft;
        default:
          return 0;
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
    setCurrentPage(1); // Reset to first page when filtering
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
    // Update cause data or refresh from blockchain
  };

  // Check wallet connection status
  useEffect(() => {
    // Mock wallet connection check
    const checkWalletConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true';
      setIsWalletConnected(connected);
    };

    checkWalletConnection();
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

            {/* Platform Statistics */}
            <PlatformStats stats={platformStats} />

            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalCauses={mockCauses?.length}
              filteredCount={filteredCauses?.length} />


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
            {paginatedCauses?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedCauses?.map((cause) =>
              <CauseCard
                key={cause?.id}
                cause={cause}
                onDonate={handleDonate} />

              )}
              </div> :

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
            }

            {/* Pagination */}
            {totalPages > 1 &&
            <div className="flex items-center justify-center space-x-2">
                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconPosition="left">

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
                      onClick={() => setCurrentPage(pageNum)}>

                        {pageNum}
                      </Button>);

                })}
                </div>

                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconPosition="right">

                  Next
                </Button>
              </div>
            }
          </div>
        </main>

        {/* Donation Modal */}
        <DonationModal
          cause={selectedCause}
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          onDonate={handleDonationComplete}
          isWalletConnected={isWalletConnected} />

      </div>
    </>);

};

export default LandingPage;
