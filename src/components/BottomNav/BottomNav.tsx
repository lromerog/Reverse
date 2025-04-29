import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/discover') return 1;
    if (path === '/products') return 2;
    if (path === '/profile') return 3;
    if (path === '/rewards') return 4;
    return 0;
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        borderRadius: '16px 16px 0 0',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={getValue()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/');
              break;
            case 1:
              navigate('/discover');
              break;
            case 2:
              navigate('/products');
              break;
            case 3:
              navigate('/profile');
              break;
            case 4:
              navigate('/rewards');
              break;
          }
        }}
        showLabels
      >
        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        <BottomNavigationAction label="Descubrir" icon={<ExploreIcon />} />
        <BottomNavigationAction label="Productos" icon={<ShoppingBagIcon />} />
        <BottomNavigationAction label="Perfil" icon={<PersonIcon />} />
        <BottomNavigationAction label="Recompensas" icon={<StarIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 