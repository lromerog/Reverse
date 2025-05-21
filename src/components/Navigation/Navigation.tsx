import React from 'react';
import { AppBar, Toolbar, Box, Container, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../context/ThemeContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
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
  color: theme.palette.text.primary,
  margin: '0 12px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
  display: 'inline-block',
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light || 'rgba(255, 60, 10, 0.1)',
    transform: 'translateY(-1px)'
  },
  '&.active': {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light || 'rgba(255, 60, 10, 0.1)'
  }
}));

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeMode();

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
            <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle dark mode" sx={{ ml: 2 }}>
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navigation; 