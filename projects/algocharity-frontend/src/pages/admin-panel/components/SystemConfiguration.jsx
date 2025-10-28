import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'AlgoCharity DApp',
    platformFee: 2.5,
    minDonationAmount: 1,
    maxDonationAmount: 100000,
    autoApprovalThreshold: 10000,
    maintenanceMode: false,
    enableNewRegistrations: true,
    requireKYC: false
  });

  // Smart Contract Settings State
  const [contractSettings, setContractSettings] = useState({
    contractAddress: 'ALGO-CONTRACT-123456789ABCDEF',
    networkType: 'testnet',
    gasLimit: 200000,
    confirmationBlocks: 3,
    enableGroupedTransactions: true,
    enableNFTProofs: true,
    milestoneReleaseEnabled: true
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    donationAlerts: true,
    withdrawalAlerts: true,
    fraudAlerts: true,
    systemMaintenanceAlerts: true,
    weeklyReports: true,
    adminEmailAddress: 'admin@algocharity.org',
    smtpServer: 'smtp.algocharity.org',
    smtpPort: 587
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChars: true,
    enableAuditLogging: true,
    ipWhitelisting: false,
    enableRateLimiting: true
  });

  const tabs = [
    { id: 'platform', label: 'Platform Settings', icon: 'Settings' },
    { id: 'contracts', label: 'Smart Contracts', icon: 'Code' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  const handlePlatformSettingChange = (key, value) => {
    setPlatformSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleContractSettingChange = (key, value) => {
    setContractSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationSettingChange = (key, value) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSecuritySettingChange = (key, value) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...', {
      platform: platformSettings,
      contracts: contractSettings,
      notifications: notificationSettings,
      security: securitySettings
    });
    setHasUnsavedChanges(false);
    // Implementation would save settings to backend
  };

  const handleResetSettings = () => {
    // Reset to default values
    setHasUnsavedChanges(false);
    console.log('Resetting settings to defaults...');
  };

  const handleTestConnection = (type) => {
    console.log(`Testing ${type} connection...`);
    // Implementation would test various connections
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">System Configuration</h2>
          <p className="text-muted-foreground mt-1">Manage platform settings and configurations</p>
        </div>
        {hasUnsavedChanges && (
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-sm font-medium">
              Unsaved Changes
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSettings}
              iconName="RotateCcw"
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSaveSettings}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        {activeTab === 'platform' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Platform Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Platform Name"
                  type="text"
                  value={platformSettings?.platformName}
                  onChange={(e) => handlePlatformSettingChange('platformName', e?.target?.value)}
                  description="Display name for the platform"
                />

                <Input
                  label="Platform Fee (%)"
                  type="number"
                  value={platformSettings?.platformFee}
                  onChange={(e) => handlePlatformSettingChange('platformFee', parseFloat(e?.target?.value))}
                  description="Percentage fee charged on donations"
                  min="0"
                  max="10"
                  step="0.1"
                />

                <Input
                  label="Minimum Donation (ALGO)"
                  type="number"
                  value={platformSettings?.minDonationAmount}
                  onChange={(e) => handlePlatformSettingChange('minDonationAmount', parseInt(e?.target?.value))}
                  description="Minimum allowed donation amount"
                  min="1"
                />

                <Input
                  label="Maximum Donation (ALGO)"
                  type="number"
                  value={platformSettings?.maxDonationAmount}
                  onChange={(e) => handlePlatformSettingChange('maxDonationAmount', parseInt(e?.target?.value))}
                  description="Maximum allowed donation amount"
                  min="1"
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="Auto-Approval Threshold (ALGO)"
                  type="number"
                  value={platformSettings?.autoApprovalThreshold}
                  onChange={(e) => handlePlatformSettingChange('autoApprovalThreshold', parseInt(e?.target?.value))}
                  description="Automatic approval for causes below this amount"
                  min="0"
                />

                <div className="space-y-3">
                  <Checkbox
                    label="Maintenance Mode"
                    description="Temporarily disable platform for maintenance"
                    checked={platformSettings?.maintenanceMode}
                    onChange={(e) => handlePlatformSettingChange('maintenanceMode', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Enable New Registrations"
                    description="Allow new charity registrations"
                    checked={platformSettings?.enableNewRegistrations}
                    onChange={(e) => handlePlatformSettingChange('enableNewRegistrations', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Require KYC Verification"
                    description="Mandate KYC for all charity registrations"
                    checked={platformSettings?.requireKYC}
                    onChange={(e) => handlePlatformSettingChange('requireKYC', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Smart Contract Configuration</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection('blockchain')}
                iconName="Zap"
                iconPosition="left"
              >
                Test Connection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Contract Address"
                  type="text"
                  value={contractSettings?.contractAddress}
                  onChange={(e) => handleContractSettingChange('contractAddress', e?.target?.value)}
                  description="Main smart contract address"
                  className="font-mono"
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Network Type</label>
                  <select
                    value={contractSettings?.networkType}
                    onChange={(e) => handleContractSettingChange('networkType', e?.target?.value)}
                    className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="testnet">TestNet</option>
                    <option value="mainnet">MainNet</option>
                    <option value="betanet">BetaNet</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">Algorand network environment</p>
                </div>

                <Input
                  label="Gas Limit"
                  type="number"
                  value={contractSettings?.gasLimit}
                  onChange={(e) => handleContractSettingChange('gasLimit', parseInt(e?.target?.value))}
                  description="Maximum gas limit for transactions"
                  min="21000"
                />

                <Input
                  label="Confirmation Blocks"
                  type="number"
                  value={contractSettings?.confirmationBlocks}
                  onChange={(e) => handleContractSettingChange('confirmationBlocks', parseInt(e?.target?.value))}
                  description="Required confirmations for finality"
                  min="1"
                  max="10"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Checkbox
                    label="Enable Grouped Transactions"
                    description="Allow atomic transaction groups"
                    checked={contractSettings?.enableGroupedTransactions}
                    onChange={(e) => handleContractSettingChange('enableGroupedTransactions', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Enable NFT Proofs"
                    description="Issue NFT certificates for donations"
                    checked={contractSettings?.enableNFTProofs}
                    onChange={(e) => handleContractSettingChange('enableNFTProofs', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Milestone-based Release"
                    description="Enable milestone-based fund release"
                    checked={contractSettings?.milestoneReleaseEnabled}
                    onChange={(e) => handleContractSettingChange('milestoneReleaseEnabled', e?.target?.checked)}
                  />
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Contract Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Network Status</span>
                      <span className="text-success">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Contract Version</span>
                      <span className="text-foreground">v2.1.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="text-foreground">2025-10-15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTestConnection('email')}
                iconName="Mail"
                iconPosition="left"
              >
                Test Email
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Checkbox
                    label="Email Notifications"
                    description="Enable email notification system"
                    checked={notificationSettings?.emailNotifications}
                    onChange={(e) => handleNotificationSettingChange('emailNotifications', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Donation Alerts"
                    description="Notify on new donations"
                    checked={notificationSettings?.donationAlerts}
                    onChange={(e) => handleNotificationSettingChange('donationAlerts', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Withdrawal Alerts"
                    description="Notify on fund withdrawals"
                    checked={notificationSettings?.withdrawalAlerts}
                    onChange={(e) => handleNotificationSettingChange('withdrawalAlerts', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Fraud Alerts"
                    description="Immediate alerts for suspicious activity"
                    checked={notificationSettings?.fraudAlerts}
                    onChange={(e) => handleNotificationSettingChange('fraudAlerts', e?.target?.checked)}
                  />

                  <Checkbox
                    label="System Maintenance Alerts"
                    description="Notify about system maintenance"
                    checked={notificationSettings?.systemMaintenanceAlerts}
                    onChange={(e) => handleNotificationSettingChange('systemMaintenanceAlerts', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Weekly Reports"
                    description="Send weekly platform reports"
                    checked={notificationSettings?.weeklyReports}
                    onChange={(e) => handleNotificationSettingChange('weeklyReports', e?.target?.checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Admin Email Address"
                  type="email"
                  value={notificationSettings?.adminEmailAddress}
                  onChange={(e) => handleNotificationSettingChange('adminEmailAddress', e?.target?.value)}
                  description="Primary admin email for notifications"
                />

                <Input
                  label="SMTP Server"
                  type="text"
                  value={notificationSettings?.smtpServer}
                  onChange={(e) => handleNotificationSettingChange('smtpServer', e?.target?.value)}
                  description="SMTP server for sending emails"
                />

                <Input
                  label="SMTP Port"
                  type="number"
                  value={notificationSettings?.smtpPort}
                  onChange={(e) => handleNotificationSettingChange('smtpPort', parseInt(e?.target?.value))}
                  description="SMTP server port"
                  min="1"
                  max="65535"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Security Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Checkbox
                    label="Two-Factor Authentication"
                    description="Require 2FA for admin accounts"
                    checked={securitySettings?.enableTwoFactorAuth}
                    onChange={(e) => handleSecuritySettingChange('enableTwoFactorAuth', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Audit Logging"
                    description="Log all administrative actions"
                    checked={securitySettings?.enableAuditLogging}
                    onChange={(e) => handleSecuritySettingChange('enableAuditLogging', e?.target?.checked)}
                  />

                  <Checkbox
                    label="IP Whitelisting"
                    description="Restrict access to specific IP addresses"
                    checked={securitySettings?.ipWhitelisting}
                    onChange={(e) => handleSecuritySettingChange('ipWhitelisting', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Rate Limiting"
                    description="Enable API rate limiting"
                    checked={securitySettings?.enableRateLimiting}
                    onChange={(e) => handleSecuritySettingChange('enableRateLimiting', e?.target?.checked)}
                  />

                  <Checkbox
                    label="Require Special Characters"
                    description="Passwords must contain special characters"
                    checked={securitySettings?.requireSpecialChars}
                    onChange={(e) => handleSecuritySettingChange('requireSpecialChars', e?.target?.checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Session Timeout (minutes)"
                  type="number"
                  value={securitySettings?.sessionTimeout}
                  onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e?.target?.value))}
                  description="Automatic logout after inactivity"
                  min="5"
                  max="480"
                />

                <Input
                  label="Max Login Attempts"
                  type="number"
                  value={securitySettings?.maxLoginAttempts}
                  onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e?.target?.value))}
                  description="Account lockout after failed attempts"
                  min="3"
                  max="10"
                />

                <Input
                  label="Password Minimum Length"
                  type="number"
                  value={securitySettings?.passwordMinLength}
                  onChange={(e) => handleSecuritySettingChange('passwordMinLength', parseInt(e?.target?.value))}
                  description="Minimum required password length"
                  min="6"
                  max="32"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemConfiguration;
