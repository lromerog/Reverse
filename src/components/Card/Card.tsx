import React from 'react';
import { Paper, PaperProps, styled } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export type CardProps = PaperProps & {
  variant?: 'default' | 'elevated' | 'outlined';
  animation?: 'fade' | 'scale' | 'none';
  interactive?: boolean;
};

const StyledCard = styled(Paper, {
  shouldForwardProp: (prop) => 
    prop !== 'variant' && 
    prop !== 'animation' && 
    prop !== 'interactive',
})<CardProps>(({ theme, variant = 'default', animation = 'fade', interactive = false }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  animation: animation === 'fade' 
    ? `${fadeIn} 0.3s ease-out forwards`
    : animation === 'scale'
    ? `${scaleIn} 0.3s ease-out forwards`
    : 'none',
  ...(variant === 'elevated' && {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
  }),
  ...(variant === 'outlined' && {
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  }),
  ...(interactive && {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.3)'
        : '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    '&:focus': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),
}));

const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  animation = 'fade',
  interactive = false,
  ...props 
}) => {
  return (
    <StyledCard
      elevation={variant === 'elevated' ? 2 : 0}
      variant={variant}
      animation={animation}
      interactive={interactive}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card; 