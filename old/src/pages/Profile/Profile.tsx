import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const userInfo = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  points: 1250,
  level: 'Plata',
  memberSince: 'Enero 2024',
};

const recentOrders = [
  {
    id: 1,
    date: '15/03/2024',
    total: '$199.99',
    status: 'Entregado',
    items: ['Nike Air Max 2024'],
  },
  {
    id: 2,
    date: '01/03/2024',
    total: '$89.99',
    status: 'En tránsito',
    items: ['Nike Dri-FIT Tee'],
  },
];

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: '#F7F7F7', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 3, 
        pt: 3, 
        pb: 1,
        position: 'sticky',
        top: 0,
        bgcolor: '#F7F7F7',
        zIndex: 1000,
      }}>
        <Typography variant="h6" fontWeight={700} color="text.primary">
          Profile
        </Typography>
        <Box flex={1} />
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* User Info Card */}
      <Box sx={{ px: 3, mt: 2 }}>
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: '#111',
                  fontSize: '2rem',
                }}
              >
                JP
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  {userInfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userInfo.email}
                </Typography>
              </Box>
              <Box flex={1} />
              <IconButton onClick={() => setShowEditDialog(true)}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Level
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {userInfo.level}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Points
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {userInfo.points}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Member since
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {userInfo.memberSince}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Box sx={{ px: 3, mt: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="My Orders" />
          <Tab label="Favorites" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ px: 3, mt: 3 }}>
        {tabValue === 0 && (
          <Box>
            {recentOrders.map((order) => (
              <Card key={order.id} sx={{ mb: 2, borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {order.items.join(', ')}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      {order.total}
                    </Typography>
                    <Chip 
                      label={order.status === 'Entregado' ? 'Delivered' : (order.status === 'En tránsito' ? 'In transit' : order.status)} 
                      color={order.status === 'Entregado' ? 'success' : 'primary'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              You don't have favorite products yet
            </Typography>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Order History" 
                  secondary="View all your previous orders"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="My Rewards" 
                  secondary="Manage your points and rewards"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Favorites" 
                  secondary="Saved products"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Notifications" 
                  secondary="Receive updates about your orders"
                />
                <Switch 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Marketing" 
                  secondary="Receive offers and promotions"
                />
                <Switch 
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Log out" 
                  primaryTypographyProps={{ color: 'error' }}
                />
              </ListItem>
            </List>
          </Box>
        )}
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            defaultValue={userInfo.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue={userInfo.email}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setShowEditDialog(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile; 