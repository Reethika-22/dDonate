import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PendingApprovals = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const pendingApplications = [
  {
    id: 1,
    organizationName: "Clean Water Initiative",
    contactPerson: "Sarah Johnson",
    email: "sarah@cleanwater.org",
    phone: "+1-555-0123",
    registrationDate: "2025-10-25",
    causeTitle: "Providing Clean Water Access in Rural Communities",
    description: `Our organization focuses on building sustainable water infrastructure in underserved rural areas. We have successfully completed 15 water well projects across 3 states, providing clean water access to over 2,500 families.\n\nOur current initiative aims to establish 10 new water purification systems in remote villages, with each system capable of serving 200+ residents daily.`,
    goalAmount: 50000,
    documents: [
    { name: "501(c)(3) Certificate", status: "verified" },
    { name: "Financial Statements", status: "verified" },
    { name: "Project Proposal", status: "pending" }],

    organizationLogo: "https://images.unsplash.com/photo-1601675054761-603a196a83ba",
    organizationLogoAlt: "Clean water drop logo with blue and green gradient design",
    priority: "high"
  },
  {
    id: 2,
    organizationName: "Education for All Foundation",
    contactPerson: "Michael Chen",
    email: "m.chen@educationforall.org",
    phone: "+1-555-0456",
    registrationDate: "2025-10-24",
    causeTitle: "Digital Learning Resources for Underprivileged Students",
    description: `We provide educational technology and digital learning resources to students in low-income communities. Our programs have reached over 1,000 students across 25 schools.\n\nThis campaign will fund tablet devices, educational software licenses, and internet connectivity for 500 students in rural school districts.`,
    goalAmount: 75000,
    documents: [
    { name: "501(c)(3) Certificate", status: "verified" },
    { name: "Financial Statements", status: "verified" },
    { name: "Project Proposal", status: "verified" }],

    organizationLogo: "https://images.unsplash.com/photo-1686580283808-57f2fdb08aa1",
    organizationLogoAlt: "Open book with digital elements and graduation cap symbolizing education technology",
    priority: "medium"
  },
  {
    id: 3,
    organizationName: "Green Earth Conservation",
    contactPerson: "Emma Rodriguez",
    email: "emma@greenearth.org",
    phone: "+1-555-0789",
    registrationDate: "2025-10-23",
    causeTitle: "Reforestation Project in Wildfire-Affected Areas",
    description: `Our environmental conservation group specializes in ecosystem restoration and wildlife habitat preservation. We have planted over 10,000 trees in the past two years.\n\nThis project will restore 500 acres of forest destroyed by recent wildfires, including native tree planting and soil rehabilitation efforts.`,
    goalAmount: 35000,
    documents: [
    { name: "501(c)(3) Certificate", status: "pending" },
    { name: "Financial Statements", status: "verified" },
    { name: "Project Proposal", status: "verified" }],

    organizationLogo: "https://images.unsplash.com/photo-1732244388093-0c468476bc23",
    organizationLogoAlt: "Lush green forest canopy with sunlight filtering through trees representing conservation",
    priority: "low"
  }];


  const handleApprove = (applicationId) => {
    console.log(`Approving application ${applicationId}`);
    // Implementation would handle approval logic
  };

  const handleReject = (applicationId) => {
    console.log(`Rejecting application ${applicationId}`);
    // Implementation would handle rejection logic
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':return 'text-error bg-error/10 border-error/20';
      case 'medium':return 'text-warning bg-warning/10 border-warning/20';
      case 'low':return 'text-success bg-success/10 border-success/20';
      default:return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified':return 'text-success bg-success/10 border-success/20';
      case 'pending':return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected':return 'text-error bg-error/10 border-error/20';
      default:return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pending Charity Applications</h2>
          <p className="text-muted-foreground mt-1">Review and approve new charity registrations</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-sm font-medium">
            {pendingApplications?.length} Pending
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications List */}
        <div className="space-y-4">
          {pendingApplications?.map((application) =>
          <div
            key={application?.id}
            className={`p-6 bg-card border rounded-lg cursor-pointer transition-smooth hover:shadow-elevation-2 ${
            selectedApplication?.id === application?.id ? 'border-primary shadow-elevation-2' : 'border-border'}`
            }
            onClick={() => setSelectedApplication(application)}>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                  src={application?.organizationLogo}
                  alt={application?.organizationLogoAlt}
                  className="w-full h-full object-cover" />

                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {application?.organizationName}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getPriorityColor(application?.priority)}`}>
                      {application?.priority} priority
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {application?.causeTitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Goal: {application?.goalAmount?.toLocaleString()} ALGO</span>
                    <span>Applied: {new Date(application.registrationDate)?.toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    {application?.documents?.map((doc, index) =>
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs border rounded ${getDocumentStatusColor(doc?.status)}`}>

                        {doc?.status}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="lg:sticky lg:top-6">
          {selectedApplication ?
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                  src={selectedApplication?.organizationLogo}
                  alt={selectedApplication?.organizationLogoAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedApplication?.organizationName}
                  </h3>
                  <p className="text-muted-foreground">{selectedApplication?.contactPerson}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedApplication?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedApplication?.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cause Details</h4>
                  <h5 className="font-medium text-foreground mb-2">{selectedApplication?.causeTitle}</h5>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedApplication?.description}
                  </p>
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Funding Goal</span>
                      <span className="font-semibold text-foreground">
                        {selectedApplication?.goalAmount?.toLocaleString()} ALGO
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Document Verification</h4>
                  <div className="space-y-3">
                    {selectedApplication?.documents?.map((doc, index) =>
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="FileText" size={16} className="text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">{doc?.name}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium border rounded ${getDocumentStatusColor(doc?.status)}`}>
                          {doc?.status}
                        </span>
                      </div>
                  )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-border">
                <Button
                variant="destructive"
                className="flex-1"
                iconName="X"
                iconPosition="left"
                onClick={() => handleReject(selectedApplication?.id)}>

                  Reject
                </Button>
                <Button
                variant="success"
                className="flex-1"
                iconName="Check"
                iconPosition="left"
                onClick={() => handleApprove(selectedApplication?.id)}>

                  Approve
                </Button>
              </div>
            </div> :

          <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="FileSearch" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Select an Application</h3>
              <p className="text-muted-foreground">
                Choose a pending charity application from the list to review details and take action.
              </p>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default PendingApprovals;
