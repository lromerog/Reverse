import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '4rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          padding: '0.5rem 2rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 