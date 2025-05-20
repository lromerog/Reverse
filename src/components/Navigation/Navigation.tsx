import React from 'react';
import { AppBar, Toolbar, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#232323',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.up('md')]: {
    padding: '0 24px'
  }
}));

const Logo = styled(Box)({
  height: 40,
  width: 'auto',
  '& img': {
    height: '100%',
    width: 'auto',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  }
});

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: '#fff',
  margin: '0 12px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
  display: 'inline-block',
  '&:hover': {
    color: '#F5B301',
    backgroundColor: 'rgba(245, 179, 1, 0.1)',
    transform: 'translateY(-1px)'
  },
  '&.active': {
    color: '#F5B301',
    backgroundColor: 'rgba(245, 179, 1, 0.1)'
  }
}));

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Logo>
            <img src="/assets/images/reverse-logo.png" alt="Reverse Logo" />
          </Logo>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <NavLink 
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </NavLink>
            <NavLink 
              to="/discover"
              className={location.pathname === '/discover' ? 'active' : ''}
            >
              Discover
            </NavLink>
            <NavLink 
              to="/rewards"
              className={location.pathname === '/rewards' ? 'active' : ''}
            >
              Rewards
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navigation; 