import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#22C37A',
    },
    secondary: {
      main: '#FF3C0A',
    },
    background: {
      default: '#fff',
      paper: '#E5E5E5',
    },
    text: {
      primary: '#111111',
      secondary: 'rgba(17,17,17,0.7)',
    },
    grey: {
      100: '#E5E5E5',
      900: '#111111',
    },
  },
  typography: {
    fontFamily: 'Poppins, Oswald, Arial, Helvetica, Roboto, sans-serif',
    h1: {
      fontFamily: 'Oswald, Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '4rem',
    },
    h2: {
      fontFamily: 'Oswald, Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h3: {
      fontFamily: 'Oswald, Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontFamily: 'Oswald, Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h5: {
      fontFamily: 'Oswald, Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Oswald, Poppins, sans-serif',
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