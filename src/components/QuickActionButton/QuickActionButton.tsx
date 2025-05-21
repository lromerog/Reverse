import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

export type QuickActionButtonProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
};

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'icon',
})<QuickActionButtonProps>(({ theme, variant = 'primary', icon }) => ({
  borderRadius: 12,
  padding: '10px 24px',
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  ...(variant === 'primary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(245, 179, 1, 0.2)',
    },
  }),
  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(35, 35, 35, 0.2)',
    },
  }),
  ...(variant === 'outline' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: 'rgba(35, 35, 35, 0.04)',
      transform: 'translateY(-2px)',
    },
  }),
  '&:focus': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
  },
}));

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  ...props 
}) => {
  return (
    <StyledButton
      variant="contained"
      variant={variant}
      startIcon={icon}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default QuickActionButton; 