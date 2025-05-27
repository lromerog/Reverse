import React from 'react';
import './TabletSimulator.css';

interface TabletSimulatorProps {
  children: React.ReactNode;
}

const TabletSimulator: React.FC<TabletSimulatorProps> = ({ children }) => {
  return (
    <div className="tablet-simulator">
      <div className="tablet-frame">
        <div className="tablet-screen">
          <div className="tablet-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletSimulator; 