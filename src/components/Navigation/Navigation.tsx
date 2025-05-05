import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#232323',
  boxShadow: 'none'
});

const Logo = styled(Box)({
  height: 40,
  width: 'auto',
  '& img': {
    height: '100%',
    width: 'auto'
  }
});

const NavButton = styled(Button)({
  color: '#fff',
  margin: '0 8px',
  '&:hover': {
    color: '#F5B301'
  }
});

const Navigation: React.FC = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Logo>
          <img src="/logo.png" alt="Reverse Logo" />
        </Logo>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <NavButton component={Link} to="/">Home</NavButton>
          <NavButton component={Link} to="/discover">Discover</NavButton>
          <NavButton component={Link} to="/rewards">Rewards</NavButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation; 