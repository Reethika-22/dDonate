import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CharityManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCharities, setSelectedCharities] = useState([]);

  const charities = [
  {
    id: 1,
    name: "Clean Water Initiative",
    contactPerson: "Sarah Johnson",
    email: "sarah@cleanwater.org",
    status: "active",
    verificationDate: "2025-09-15",
    totalRaised: 125600,
    activeCauses: 3,
    totalDonors: 456,
    lastActivity: "2025-10-28",
    logo: "https://images.unsplash.com/photo-1601675054761-603a196a83ba",
    logoAlt: "Clean water drop logo with blue and green gradient design",
    riskLevel: "low",
    complianceScore: 98
  },
  {
    id: 2,
    name: "Education for All Foundation",
    contactPerson: "Michael Chen",
    email: "m.chen@educationforall.org",
    status: "active",
    verificationDate: "2025-08-22",
    totalRaised: 89400,
    activeCauses: 2,
    totalDonors: 234,
    lastActivity: "2025-10-27",
    logo: "https://images.unsplash.com/photo-1686580283808-57f2fdb08aa1",
    logoAlt: "Open book with digital elements and graduation cap symbolizing education technology",
    riskLevel: "low",
    complianceScore: 95
  },
  {
    id: 3,
    name: "Green Earth Conservation",
    contactPerson: "Emma Rodriguez",
    email: "emma@greenearth.org",
    status: "under_review",
    verificationDate: "2025-10-20",
    totalRaised: 34200,
    activeCauses: 1,
    totalDonors: 123,
    lastActivity: "2025-10-26",
    logo: "https://images.unsplash.com/photo-1732244388093-0c468476bc23",
    logoAlt: "Lush green forest canopy with sunlight filtering through trees representing conservation",
    riskLevel: "medium",
    complianceScore: 87
  },
  {
    id: 4,
    name: "Medical Aid International",
    contactPerson: "Dr. James Wilson",
    email: "j.wilson@medicalaid.org",
    status: "suspended",
    verificationDate: "2025-07-10",
    totalRaised: 67800,
    activeCauses: 0,
    totalDonors: 289,
    lastActivity: "2025-10-15",
    logo: "https://images.unsplash.com/photo-1722015149682-a65ef81fe2de",
    logoAlt: "Medical stethoscope and red cross symbol on white background representing healthcare",
    riskLevel: "high",
    complianceScore: 72
  },
  {
    id: 5,
    name: "Animal Rescue Network",
    contactPerson: "Lisa Thompson",
    email: "lisa@animalrescue.org",
    status: "active",
    verificationDate: "2025-09-30",
    totalRaised: 45300,
    activeCauses: 4,
    totalDonors: 178,
    lastActivity: "2025-10-28",
    logo: "https://images.unsplash.com/photo-1694895069924-2bd46b77cbe2",
    logoAlt: "Cute golden retriever puppy with bright eyes representing animal welfare and rescue",
    riskLevel: "low",
    complianceScore: 92
  }];


  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'pending', label: 'Pending' }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'active':return 'text-success bg-success/10 border-success/20';
      case 'under_review':return 'text-warning bg-warning/10 border-warning/20';
      case 'suspended':return 'text-error bg-error/10 border-error/20';
      case 'pending':return 'text-accent bg-accent/10 border-accent/20';
      default:return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low':return 'text-success bg-success/10 border-success/20';
      case 'medium':return 'text-warning bg-warning/10 border-warning/20';
      case 'high':return 'text-error bg-error/10 border-error/20';
      default:return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredCharities = charities?.filter((charity) => {
    const matchesSearch = charity?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    charity?.contactPerson?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    charity?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || charity?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectCharity = (charityId) => {
    setSelectedCharities((prev) =>
    prev?.includes(charityId) ?
    prev?.filter((id) => id !== charityId) :
    [...prev, charityId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCharities?.length === filteredCharities?.length) {
      setSelectedCharities([]);
    } else {
      setSelectedCharities(filteredCharities?.map((charity) => charity?.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on charities:`, selectedCharities);
    // Implementation would handle bulk actions
    setSelectedCharities([]);
  };

  const handleCharityAction = (charityId, action) => {
    console.log(`Performing ${action} on charity ${charityId}`);
    // Implementation would handle individual charity actions
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Charity Management</h2>
          <p className="text-muted-foreground mt-1">Monitor and manage registered charitable organizations</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium">
            {charities?.filter((c) => c?.status === 'active')?.length} Active
          </span>
          <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-sm font-medium">
            {charities?.filter((c) => c?.status === 'under_review')?.length} Under Review
          </span>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search charities by name, contact person, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full" />

        </div>
        <div className="flex items-center space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e?.target?.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">

            {statusOptions?.map((option) =>
            <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            )}
          </select>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedCharities?.length > 0 &&
      <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-primary">
            {selectedCharities?.length} charity(ies) selected
          </span>
          <div className="flex space-x-2">
            <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('suspend')}
            iconName="Ban"
            iconPosition="left">

              Suspend
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('activate')}
            iconName="CheckCircle"
            iconPosition="left">

              Activate
            </Button>
            <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCharities([])}
            iconName="X">

              Clear
            </Button>
          </div>
        </div>
      }
      {/* Charities Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedCharities?.length === filteredCharities?.length && filteredCharities?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary" />

                </th>
                <th className="text-left p-4 font-semibold text-foreground">Organization</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Performance</th>
                <th className="text-left p-4 font-semibold text-foreground">Risk Level</th>
                <th className="text-left p-4 font-semibold text-foreground">Last Activity</th>
                <th className="text-left p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharities?.map((charity) =>
              <tr key={charity?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                  <td className="p-4">
                    <input
                    type="checkbox"
                    checked={selectedCharities?.includes(charity?.id)}
                    onChange={() => handleSelectCharity(charity?.id)}
                    className="rounded border-border focus:ring-primary" />

                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                        src={charity?.logo}
                        alt={charity?.logoAlt}
                        className="w-full h-full object-cover" />

                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{charity?.name}</h4>
                        <p className="text-sm text-muted-foreground">{charity?.contactPerson}</p>
                        <p className="text-xs text-muted-foreground">{charity?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getStatusColor(charity?.status)}`}>
                      {charity?.status?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-foreground">
                        {charity?.totalRaised?.toLocaleString()} ALGO
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {charity?.activeCauses} causes • {charity?.totalDonors} donors
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Compliance: {charity?.complianceScore}%
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium border rounded ${getRiskColor(charity?.riskLevel)}`}>
                      {charity?.riskLevel} risk
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-muted-foreground">
                      {new Date(charity.lastActivity)?.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                      onClick={() => handleCharityAction(charity?.id, 'view')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                      title="View Details">

                        <Icon name="Eye" size={16} />
                      </button>
                      <button
                      onClick={() => handleCharityAction(charity?.id, 'edit')}
                      className="p-1 text-muted-foreground hover:text-foreground transition-smooth"
                      title="Edit">

                        <Icon name="Edit" size={16} />
                      </button>
                      {charity?.status === 'active' ?
                    <button
                      onClick={() => handleCharityAction(charity?.id, 'suspend')}
                      className="p-1 text-muted-foreground hover:text-error transition-smooth"
                      title="Suspend">

                          <Icon name="Ban" size={16} />
                        </button> :

                    <button
                      onClick={() => handleCharityAction(charity?.id, 'activate')}
                      className="p-1 text-muted-foreground hover:text-success transition-smooth"
                      title="Activate">

                          <Icon name="CheckCircle" size={16} />
                        </button>
                    }
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredCharities?.length === 0 &&
        <div className="p-12 text-center">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No charities found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search criteria or filters.' : 'No registered charities available.'}
            </p>
          </div>
        }
      </div>
    </div>);

};

export default CharityManagement;
