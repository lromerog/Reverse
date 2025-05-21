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
  background: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backdropFilter: 'blur(8px)',
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
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
  color: theme.palette.primary.main,
  fontWeight: 700,
  flex: 1,
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem'
  },
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #00E676 90%)`,
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