import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark' = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#22C37A',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF3C0A',
      contrastText: '#fff',
    },
    background: {
      default: mode === 'dark' ? '#111111' : '#fff',
      paper: mode === 'dark' ? '#111111' : '#E5E5E5',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#111111',
      secondary: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(17,17,17,0.7)',
    },
    grey: {
      100: '#E5E5E5',
      900: '#111111',
    },
  },
  typography: {
    fontFamily: 'Poppins, Oswald, Arial, Helvetica, Roboto, sans-serif',
    h1: { fontFamily: 'Oswald, Poppins, sans-serif', fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontFamily: 'Oswald, Poppins, sans-serif', fontWeight: 600, fontSize: '2rem' },
    h3: { fontFamily: 'Oswald, Poppins, sans-serif', fontWeight: 600, fontSize: '1.75rem' },
    button: { fontFamily: 'Poppins, Oswald, sans-serif', textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600, padding: '0.5rem 1.5rem', transition: 'all 0.2s ease' },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 8px rgba(34,195,122,0.10)' },
          '&:focus': { outline: '2px solid #22C37A', outlineOffset: 2 },
          '&.Mui-disabled': { bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)', color: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)' }
        },
        outlined: {
          borderWidth: 1.5,
          '&:hover': { borderWidth: 1.5, bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(34,195,122,0.04)' },
          '&:focus': { outline: '2px solid #22C37A', outlineOffset: 2 },
          '&.Mui-disabled': { borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)' }
        },
        text: {
          '&:hover': { bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(34,195,122,0.04)' },
          '&:focus': { outline: '2px solid #22C37A', outlineOffset: 2 },
          '&.Mui-disabled': { color: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)' }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#111111' : '#fff',
          color: mode === 'dark' ? '#fff' : '#111111',
          boxShadow: 'none',
        },
      },
    },
  },
}); 