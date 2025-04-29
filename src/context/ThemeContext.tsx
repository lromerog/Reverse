import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  favorites: number[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#000000',
        light: '#333333',
        dark: '#000000',
      },
      secondary: {
        main: '#FF6B00',
        light: '#FF8533',
        dark: '#CC5500',
      },
      background: {
        default: isDarkMode ? '#121212' : '#FFFFFF',
        paper: isDarkMode ? '#1E1E1E' : '#F5F5F5',
      },
    },
    typography: {
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addToFavorites = (productId: number) => {
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 