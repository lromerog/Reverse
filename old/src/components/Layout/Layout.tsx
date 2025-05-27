import React from 'react';
import { Box, Container } from '@mui/material';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <StyledContainer maxWidth="lg">
        {children}
      </StyledContainer>
    </Box>
  );
};

export default Layout; 