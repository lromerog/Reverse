import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import {
  Home,
  ShoppingBag,
  Favorite,
  Person,
  Settings,
  Help,
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 280px;
    background-color: #000;
    color: white;
  }
`;

const Logo = styled(Box)`
  padding: 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
`;

const MenuItem = styled(ListItemButton)`
  padding: 1rem 2rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuIcon = styled(ListItemIcon)`
  color: white;
  min-width: 40px;
`;

const MenuText = styled(ListItemText)`
  .MuiTypography-root {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const SideMenu: React.FC = () => {
  const menuItems = [
    { icon: <Home />, text: 'Home' },
    { icon: <ShoppingBag />, text: 'Shop' },
    { icon: <Favorite />, text: 'Favorites' },
    { icon: <Person />, text: 'Profile' },
    { icon: <Settings />, text: 'Settings' },
    { icon: <Help />, text: 'Help' },
  ];

  return (
    <StyledDrawer variant="permanent">
      <Logo>NIKE</Logo>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuText primary={item.text} />
          </MenuItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideMenu; 