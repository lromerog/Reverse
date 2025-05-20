import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  children?: React.ReactNode;
}

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3),
  background: '#fff',
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backdropFilter: 'blur(8px)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  }
}));

const LogoImage = styled('img')({
  width: 32,
  marginRight: 12,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: '#00C37A',
  fontWeight: 700,
  flex: 1,
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem'
  },
  background: 'linear-gradient(45deg, #00C37A 30%, #00E676 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}));

const Header: React.FC<HeaderProps> = ({ title = 'reverse', showLogo = true, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <HeaderContainer>
      {showLogo && (
        <LogoImage 
          src="/assets/images/reverse-logo.png" 
          alt="Reverse Logo"
          style={{ width: isMobile ? 28 : 32 }}
        />
      )}
      <HeaderTitle variant="h4">{title}</HeaderTitle>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        '& > *': {
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)'
          }
        }
      }}>
        {children}
      </Box>
    </HeaderContainer>
  );
};

export default Header; 