import React from 'react';
import { Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home, Explore, CardGiftcard, Person, Settings } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 280,
    boxSizing: 'border-box',
    backgroundColor: '#232323',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    [theme.breakpoints.down('sm')]: {
      width: 240
    }
  }
}));

const Logo = styled(Box)(({ theme }) => ({
  height: 48,
  width: 'auto',
  padding: theme.spacing(2),
  '& img': {
    height: '100%',
    width: 'auto',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
}));

const MenuItem = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 2),
  borderRadius: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transform: 'translateX(4px)',
    '& .MuiListItemIcon-root': {
      color: '#F5B301'
    }
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(245, 179, 1, 0.1)',
    color: '#F5B301',
    '& .MuiListItemIcon-root': {
      color: '#F5B301'
    },
    '&:hover': {
      backgroundColor: 'rgba(245, 179, 1, 0.15)'
    }
  }
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledDrawer
      variant="permanent"
      sx={{
        width: isMobile ? 240 : 280,
        flexShrink: 0
      }}
    >
      <Logo>
        <img src="/assets/images/reverse-logo.png" alt="Reverse Logo" />
      </Logo>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              py: 1.5,
              px: 2
            }}
          >
            <ListItemIcon sx={{ 
              color: 'inherit',
              minWidth: 40,
              transition: 'color 0.2s ease'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: '0.95rem'
              }}
            />
          </MenuItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideMenu; 