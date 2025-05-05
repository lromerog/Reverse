import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabletSimulator from './TabletSimulator';
import ProductList from './ProductList';
import OrderHistory from './OrderHistory';
import RewardPoints from './RewardPoints';

interface ReverseIntegrationProps {
  userId: string;
  token: string;
}

const ReverseIntegration: React.FC<ReverseIntegrationProps> = ({ userId, token }) => {
  return (
    <TabletSimulator>
      <Router>
        <div className="reverse-app">
          <Routes>
            <Route 
              path="/products" 
              element={<ProductList userId={userId} token={token} />} 
            />
            <Route 
              path="/orders" 
              element={<OrderHistory userId={userId} token={token} />} 
            />
            <Route 
              path="/rewards" 
              element={<RewardPoints userId={userId} token={token} />} 
            />
          </Routes>
        </div>
      </Router>
    </TabletSimulator>
  );
};

export default ReverseIntegration; 