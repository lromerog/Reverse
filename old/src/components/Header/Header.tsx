import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title = 'reverse', showLogo = true, children }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    p: 2,
    background: '#fff',
    borderBottom: '1px solid #ddd',
    position: 'relative'
  }}>
    {showLogo && (
      <img src="/assets/reverse-logo-black.png" alt="Reverse Logo" style={{ width: 32, marginRight: 8 }} />
    )}
    <Typography variant="h4" sx={{ color: '#00C37A', fontWeight: 700, flex: 1 }}>{title}</Typography>
    {children}
  </Box>
);

export default Header; 