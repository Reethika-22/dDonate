import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'donation':
        return { name: 'Heart', color: 'text-success' };
      case 'approval':
        return { name: 'CheckCircle', color: 'text-primary' };
      case 'withdrawal':
        return { name: 'Banknote', color: 'text-warning' };
      case 'system':
        return { name: 'Settings', color: 'text-muted-foreground' };
      case 'alert':
        return { name: 'AlertTriangle', color: 'text-error' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return notificationDate?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const filterOptions = [
    { key: 'all', label: 'All', count: notifications?.length },
    { key: 'unread', label: 'Unread', count: unreadCount },
    { key: 'donation', label: 'Donations', count: notifications?.filter(n => n?.type === 'donation')?.length },
    { key: 'approval', label: 'Approvals', count: notifications?.filter(n => n?.type === 'approval')?.length },
    { key: 'system', label: 'System', count: notifications?.filter(n => n?.type === 'system')?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                {unreadCount} unread • {notifications?.length} total
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
              iconName="CheckCheck"
              iconPosition="left"
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.key}
              onClick={() => setFilter(option?.key)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === option?.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option?.label}
              {option?.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  filter === option?.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {option?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ?'All caught up! No unread notifications.' :'Notifications will appear here when you receive them.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => {
              const iconConfig = getNotificationIcon(notification?.type);

              return (
                <div
                  key={notification?.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                    !notification?.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification?.type === 'donation' ? 'bg-success/10' :
                      notification?.type === 'approval' ? 'bg-primary/10' :
                      notification?.type === 'withdrawal' ? 'bg-warning/10' :
                      notification?.type === 'alert'? 'bg-error/10' : 'bg-muted'
                    }`}>
                      <Icon name={iconConfig?.name} size={16} className={iconConfig?.color} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className={`text-sm ${!notification?.read ? 'font-medium' : ''} text-foreground`}>
                            {notification?.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          {notification?.actionUrl && (
                            <button className="text-xs text-primary hover:text-primary/80 mt-2">
                              View Details →
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {getTimeAgo(notification?.createdAt)}
                          </span>
                          {!notification?.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {notification?.metadata && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                          {notification?.type === 'donation' && (
                            <span>Amount: {notification?.metadata?.amount} ALGO</span>
                          )}
                          {notification?.type === 'withdrawal' && (
                            <span>Transaction: {notification?.metadata?.transactionId}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredNotifications?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredNotifications?.length} notifications</span>
            <button className="text-primary hover:text-primary/80">
              View All History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
