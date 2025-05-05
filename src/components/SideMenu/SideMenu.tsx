import React from 'react';
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home, Explore, CardGiftcard, Person, Settings } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = styled(Box)({
  height: 40,
  width: 'auto',
  padding: '16px',
  '& img': {
    height: '100%',
    width: 'auto'
  }
});

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(245, 179, 1, 0.1)',
    color: '#F5B301',
    '& .MuiListItemIcon-root': {
      color: '#F5B301',
    },
  },
}));

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/home' },
  { text: 'Discover', icon: <Explore />, path: '/discover' },
  { text: 'Rewards', icon: <CardGiftcard />, path: '/rewards' },
  { text: 'Profile', icon: <Person />, path: '/profile' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#232323',
          borderRight: 'none'
        },
      }}
    >
      <Logo>
        <img src="/logo.png" alt="Reverse Logo" />
      </Logo>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu; 