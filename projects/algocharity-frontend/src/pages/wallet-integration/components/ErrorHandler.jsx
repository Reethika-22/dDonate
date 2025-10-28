import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorHandler = ({
  error,
  onRetry,
  onClose
}) => {
  if (!error) return null;

  const getErrorIcon = (type) => {
    switch (type) {
      case 'connection':
        return 'WifiOff';
      case 'balance':
        return 'AlertTriangle';
      case 'rejection':
        return 'XCircle';
      case 'network':
        return 'Globe';
      default:
        return 'AlertCircle';
    }
  };

  const getErrorColor = (type) => {
    switch (type) {
      case 'balance':
        return 'warning';
      case 'connection': case'network':
        return 'error';
      case 'rejection':
        return 'destructive';
      default:
        return 'error';
    }
  };

  const getRecoveryActions = (type) => {
    switch (type) {
      case 'connection':
        return [
          'Check your internet connection',
          'Ensure Pera Wallet is installed',
          'Try connecting again'
        ];
      case 'balance':
        return [
          'Add more ALGO to your wallet',
          'Check your wallet balance',
          'Try a smaller amount'
        ];
      case 'rejection':
        return [
          'Transaction was cancelled by user',
          'Try the transaction again',
          'Check transaction details'
        ];
      case 'network':
        return [
          'Algorand network is experiencing issues',
          'Wait a few minutes and try again',
          'Check network status'
        ];
      default:
        return [
          'An unexpected error occurred',
          'Try refreshing the page',
          'Contact support if issue persists'
        ];
    }
  };

  const colorClass = getErrorColor(error?.type);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto bg-${colorClass}/10 rounded-full flex items-center justify-center mb-4`}>
          <Icon name={getErrorIcon(error?.type)} size={32} className={`text-${colorClass}`} />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {error?.title || 'Transaction Error'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {error?.message}
        </p>
      </div>
      {/* Error Details */}
      {error?.details && (
        <div className={`bg-${colorClass}/5 border border-${colorClass}/20 rounded-lg p-4 mb-6`}>
          <h4 className="text-sm font-medium text-foreground mb-2">Error Details</h4>
          <p className="text-sm text-muted-foreground">{error?.details}</p>
        </div>
      )}
      {/* Recovery Actions */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">What you can do:</h4>
        <ul className="space-y-2">
          {getRecoveryActions(error?.type)?.map((action, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm">
              <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5" />
              <span className="text-muted-foreground">{action}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          fullWidth
          onClick={onClose}
        >
          Close
        </Button>
        {onRetry && (
          <Button
            variant="default"
            fullWidth
            onClick={onRetry}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Try Again
          </Button>
        )}
      </div>
      {/* Support Contact */}
      {error?.type === 'unknown' && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Need help? Contact support at{' '}
            <span className="text-primary">support@algocharity.com</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorHandler;
