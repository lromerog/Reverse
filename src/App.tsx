import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash/Splash';
import Welcome from './pages/Welcome/Welcome';
import Signup from './pages/Signup/Signup';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import Dashboard from './pages/Dashboard/Dashboard';
import Rewards from './pages/Rewards/Rewards';
import Discover from './pages/Discover/Discover';
import EditProfile from './pages/EditProfile/EditProfile';
import Settings from './pages/Settings/Settings';
import Home from './pages/Home/Home';
import Reverse from './pages/Reverse/Reverse';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import QRScanner from './pages/QRScanner/QRScanner';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNav from './components/BottomNav/BottomNav';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#F5B301',
    },
    background: {
      default: '#F7F7F7',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reverse" element={<Reverse />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/qr" element={<QRScanner />} />
        </Routes>
        <BottomNav />
      </Router>
    </ThemeProvider>
  );
};

export default App;
