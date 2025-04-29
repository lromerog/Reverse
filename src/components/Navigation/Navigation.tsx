import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { ShoppingBag, Favorite, Person } from '@mui/icons-material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
  position: absolute;
`;

const Logo = styled(Box)`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: white;
`;

const NavButton = styled(Button)`
  color: white;
  text-transform: none;
  font-size: 1rem;
  margin: 0 1rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navigation: React.FC = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Logo>NIKE</Logo>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <NavButton component={Link} to="/">Home</NavButton>
          <NavButton component={Link} to="/reverse-projects">Reverse</NavButton>
          <NavButton>Shop</NavButton>
          <NavButton>About</NavButton>
        </Box>
        <Box>
          <IconButton color="inherit">
            <ShoppingBag />
          </IconButton>
          <IconButton color="inherit">
            <Favorite />
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation; 