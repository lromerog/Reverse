import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  LocalOffer as OfferIcon,
  ShoppingBag as OrderIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const NotificationBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: ${props => props.theme.palette.secondary.main};
  }
`;

interface Notification {
  id: number;
  type: 'offer' | 'order' | 'info';
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
  onNotificationClick: (notificationId: number) => void;
  onMarkAllAsRead: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'offer':
        return <OfferIcon color="secondary" />;
      case 'order':
        return <OrderIcon color="primary" />;
      case 'info':
        return <InfoIcon color="info" />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <NotificationBadge badgeContent={unreadCount} color="secondary">
          <NotificationsIcon />
        </NotificationBadge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <MenuItem onClick={onMarkAllAsRead}>
              Mark all as read
            </MenuItem>
          )}
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem
                key={notification.id}
                button
                onClick={() => {
                  onNotificationClick(notification.id);
                  handleClose();
                }}
                sx={{
                  backgroundColor: notification.read ? 'transparent' : 'action.hover',
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.date}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary="No notifications"
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          )}
        </List>
      </Menu>
    </>
  );
};

export default Notifications; 