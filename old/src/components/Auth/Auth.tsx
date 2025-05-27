import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    padding: 2rem;
  }
`;

const Auth: React.FC = () => {
  return (
    <StyledDialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Stack>
      </DialogContent>
    </StyledDialog>
  );
};

export default Auth; 