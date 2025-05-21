import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#232323',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F5B301',
      contrastText: '#232323',
    },
    background: {
      default: mode === 'dark' ? '#181818' : '#f5f5f5',
      paper: mode === 'dark' ? '#232323' : '#fff',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#232323',
      secondary: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(35,35,35,0.7)',
    },
  },
  typography: {
    fontFamily: 'Poppins, Helvetica Neue, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.75rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#232323' : '#fff',
          color: mode === 'dark' ? '#fff' : '#232323',
          boxShadow: 'none',
        },
      },
    },
  },
}); 