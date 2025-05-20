import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ProductProvider } from './context/ProductContext';
import theme from './styles/theme';
import App from './App';

// Mock del contexto de productos
jest.mock('./context/ProductContext', () => ({
  ProductProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ProductProvider>
          {component}
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithProviders(<App />);
    // Verificar que la aplicación se renderiza correctamente
    expect(document.body).toBeTruthy();
  });

  // Aquí se pueden agregar más pruebas específicas
});
