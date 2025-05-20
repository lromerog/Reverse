import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import BottomNav from './components/BottomNav/BottomNav';
import './App.css';

// Lazy load components for better performance
const Splash = lazy(() => import('./pages/Splash/Splash'));
const Welcome = lazy(() => import('./pages/Welcome/Welcome'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Rewards = lazy(() => import('./pages/Rewards/Rewards'));
const Discover = lazy(() => import('./pages/Discover/Discover'));
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Home = lazy(() => import('./pages/Home/Home'));
const Reverse = lazy(() => import('./pages/Reverse/Reverse'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Login = lazy(() => import('./pages/Login/Login'));
const QRScanner = lazy(() => import('./pages/QRScanner/QRScanner'));
const Demo = lazy(() => import('./pages/Demo'));

// Loading component
const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    bgcolor="background.default"
  >
    <CircularProgress color="secondary" />
  </Box>
);

// Route configuration
const ROUTES = [
  { path: '/', element: <Splash /> },
  { path: '/welcome', element: <Welcome /> },
  { path: '/signup', element: <Signup /> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/rewards', element: <Rewards /> },
  { path: '/discover', element: <Discover /> },
  { path: '/edit-profile', element: <EditProfile /> },
  { path: '/settings', element: <Settings /> },
  { path: '/home', element: <Home /> },
  { path: '/reverse', element: <Reverse /> },
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  { path: '/profile', element: <Profile /> },
  { path: '/login', element: <Login /> },
  { path: '/qr', element: <QRScanner /> },
  { path: '/demo', element: <Demo /> }
];

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const showBottomNav = location.pathname !== '/demo';

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
        {showBottomNav && <BottomNav />}
      </Suspense>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
