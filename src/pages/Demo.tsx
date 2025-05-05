import React, { useState, useEffect } from 'react';
import TabletSimulator from '../components/TabletSimulator';
import '../components/ReverseApp.css';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const LogoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
  '& img': {
    width: 240,
    height: 'auto',
    animation: `${fadeInScale} 1.5s ease-out forwards`,
    filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.2))',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(245, 179, 1, 0.1) 0%, rgba(245, 179, 1, 0) 70%)',
    borderRadius: '50%',
    zIndex: -1,
  }
});

// Componentes de las diferentes pantallas
const HomeScreen = () => (
  <div className="content">
    <div className="card fade-in">
      <h2>Welcome to Reverse</h2>
      <p>Experience the future of shopping with our innovative platform. Discover, collect, and earn rewards.</p>
    </div>

    <div className="card fade-in">
      <h3>Key Features</h3>
      <ul>
        <li>Smart Product Discovery</li>
        <li>Advanced Order Management</li>
        <li>Exclusive Rewards System</li>
        <li>Reverse Engineering Tools</li>
      </ul>
    </div>
  </div>
);

const DiscoverScreen = () => (
  <div className="content">
    <div className="card fade-in">
      <h3>Featured Collection</h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          backgroundImage: 'url(/logo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(245, 179, 1, 0.1)'
        }} />
        <div>
          <h4>Reverse Collection</h4>
          <p>Explore our latest designs and exclusive products</p>
          <button className="button">View Collection</button>
        </div>
      </div>
    </div>
  </div>
);

const ReverseScreen = () => (
  <div className="content">
    <div className="card fade-in">
      <h2>Reverse Engineering</h2>
      <p>Discover the art of reverse engineering with our advanced tools and resources.</p>
    </div>
  </div>
);

const RewardsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHistory, setShowHistory] = useState(false);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  
  const userPoints = 1250;
  const levels = [
    { level: 1, points: 0, name: 'Beginner' },
    { level: 2, points: 500, name: 'Bronze' },
    { level: 3, points: 1000, name: 'Silver' },
    { level: 4, points: 2000, name: 'Gold' },
    { level: 5, points: 5000, name: 'Diamond' },
  ];
  
  const userLevel = levels.find(level => userPoints >= level.points) || levels[0];
  const nextLevel = levels.find(level => level.points > userPoints) || levels[levels.length - 1];
  const progressToNextLevel = ((userPoints - userLevel.points) / (nextLevel.points - userLevel.points)) * 100;

  const rewards = [
    {
      id: 1,
      name: 'Reverse Air Max 2024',
      image: '/logo.png',
      points: 120,
      description: 'Next-generation sports shoes.',
      category: 'Shoes',
    },
    {
      id: 2,
      name: 'Reverse Dri-FIT Tee',
      image: '/logo.png',
      points: 60,
      description: 'Breathable t-shirt for maximum performance.',
      category: 'Apparel',
    },
    {
      id: 3,
      name: 'Reverse Sportswear Club Fleece',
      image: '/logo.png',
      points: 80,
      description: 'Hoodie for maximum comfort.',
      category: 'Apparel',
    },
    {
      id: 4,
      name: 'Reverse Air Force 1',
      image: '/logo.png',
      points: 100,
      description: 'Classic Reverse sneaker.',
      category: 'Shoes',
    },
  ];

  const categories = ['All', 'Shoes', 'Apparel'];

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRedeem = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    alert(`Congratulations! You have redeemed: ${selectedReward.name}`);
    setShowRedeemDialog(false);
  };

  return (
    <div className="content">
      {/* Level Card */}
      <div className="card fade-in">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ 
            width: 56, 
            height: 56, 
            backgroundColor: '#fff', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            <span style={{ fontSize: 36, color: '#F5B301' }}>🏆</span>
          </div>
          <div>
            <h3 style={{ color: '#F5B301', margin: 0 }}>Level {userLevel.level} - {userLevel.name}</h3>
            <h2 style={{ color: '#fff', margin: '4px 0' }}>{userPoints} points</h2>
          </div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <p style={{ color: '#fff', margin: '0 0 8px 0' }}>
            Next level: {nextLevel.name} ({nextLevel.points} points)
          </p>
          <div style={{ 
            height: 8, 
            backgroundColor: '#333', 
            borderRadius: 4,
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${progressToNextLevel}%`, 
              height: '100%', 
              backgroundColor: '#F5B301',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Animated Banner */}
      <div className="card fade-in" style={{ 
        backgroundColor: '#F5B301',
        animation: 'pulse 2s infinite'
      }}>
        <h3 style={{ color: '#fff', margin: 0, textAlign: 'center' }}>
          Redeem your points and take your style to the next level!
        </h3>
      </div>

      {/* Search and Filter */}
      <div className="card fade-in">
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '14px'
            }}
          />
          <span style={{ 
            position: 'absolute', 
            left: 12, 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>🔍</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                borderRadius: '16px',
                border: 'none',
                backgroundColor: selectedCategory === category ? '#F5B301' : 'rgba(255, 255, 255, 0.1)',
                color: selectedCategory === category ? '#000' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards List */}
      <div className="card fade-in">
        <h3 style={{ margin: '0 0 16px 0' }}>Available Rewards</h3>
        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {filteredRewards.map((reward) => {
            const canRedeem = userPoints >= reward.points;
            return (
              <div key={reward.id} style={{ 
                backgroundColor: '#2A2A2A',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <div style={{ 
                  height: 140,
                  backgroundColor: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    style={{ 
                      maxWidth: '80%',
                      maxHeight: '80%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{reward.name}</h4>
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '0 0 8px 0',
                    fontSize: '14px'
                  }}>
                    {reward.description}
                  </p>
                  <div style={{ marginBottom: '8px' }}>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: '0 0 4px 0',
                      fontSize: '14px'
                    }}>
                      {reward.points} points
                    </p>
                    <div style={{ 
                      height: 8, 
                      backgroundColor: '#333',
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${(userPoints / reward.points) * 100}%`,
                        height: '100%',
                        backgroundColor: canRedeem ? '#4CAF50' : '#F5B301',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                  <button
                    onClick={() => canRedeem && handleRedeem(reward)}
                    disabled={!canRedeem}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: canRedeem ? '#4CAF50' : '#F5B301',
                      color: canRedeem ? '#fff' : '#000',
                      fontWeight: 'bold',
                      cursor: canRedeem ? 'pointer' : 'not-allowed',
                      opacity: canRedeem ? 1 : 0.7,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {canRedeem ? "Redeem" : "Insufficient Points"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Redeem Dialog */}
      {showRedeemDialog && selectedReward && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#2A2A2A',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Confirm Redeem</h3>
            <p style={{ margin: '0 0 24px 0' }}>
              Are you sure you want to redeem {selectedReward.name} for {selectedReward.points} points?
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowRedeemDialog(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmRedeem}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Dialog */}
      {showHistory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#2A2A2A',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Redeem History</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              You haven't redeemed any rewards yet.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#F5B301',
                  color: '#000',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MapScreen = () => {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [scannedLocations, setScannedLocations] = useState([
    {
      id: 1,
      name: "Reverse Store Downtown",
      address: "123 Main St, City Center",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      timestamp: "2024-03-15T10:30:00",
      points: 50
    },
    {
      id: 2,
      name: "Reverse Mall Location",
      address: "456 Shopping Ave, Mall",
      coordinates: { lat: 40.7148, lng: -74.0080 },
      timestamp: "2024-03-14T15:45:00",
      points: 75
    }
  ]);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setMapError("Unable to get your location. Please enable location services.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setMapError("Geolocation is not supported by your browser");
    }
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };

  return (
    <div className="content">
      {/* Map Header */}
      <div className="card fade-in">
        <h2>QR Scan Locations</h2>
        <p>Track your QR code scans and earn points at Reverse locations</p>
      </div>

      {/* Map Container */}
      <div className="card fade-in" style={{ height: '400px', position: 'relative', padding: 0, overflow: 'hidden' }}>
        {mapError ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div>
              <span style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>⚠️</span>
              <p>{mapError}</p>
            </div>
          </div>
        ) : (
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentLocation || defaultCenter}
              zoom={13}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }]
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }]
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9e9e9e" }]
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#757575" }]
                  }
                ]
              }}
            >
              {currentLocation && (
                <Marker
                  position={currentLocation}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                  }}
                />
              )}
              {scannedLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </div>

      {/* Scan History */}
      <div className="card fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>Scan History</h3>
          <button
            onClick={() => setShowQRScanner(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F5B301',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>📱</span>
            Scan QR
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scannedLocations.map(location => (
            <div
              key={location.id}
              style={{
                backgroundColor: '#2A2A2A',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{location.name}</h4>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                  {location.address}
                </p>
                <p style={{ margin: '4px 0 0 0', color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px' }}>
                  {new Date(location.timestamp).toLocaleString()}
                </p>
              </div>
              <div style={{
                backgroundColor: '#F5B301',
                color: '#000',
                padding: '8px 12px',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                +{location.points} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Scanner Dialog */}
      {showQRScanner && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#2A2A2A',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Scan QR Code</h3>
            <div style={{
              width: '250px',
              height: '250px',
              backgroundColor: '#1a1a1a',
              margin: '0 auto 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '2px solid #F5B301',
                borderRadius: '8px',
                animation: 'scan 2s linear infinite'
              }} />
              <span style={{ fontSize: '48px' }}>📱</span>
            </div>
            <p style={{ margin: '0 0 24px 0', color: 'rgba(255, 255, 255, 0.7)' }}>
              Position the QR code within the frame to scan
            </p>
            <button
              onClick={() => setShowQRScanner(false)}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#F5B301',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Demo: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (showLogo) {
    return (
      <TabletSimulator>
        <div className="reverse-app">
          <LogoContainer>
            <img src="/logo.png" alt="Reverse Logo" />
          </LogoContainer>
        </div>
      </TabletSimulator>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'discover':
        return <DiscoverScreen />;
      case 'reverse':
        return <ReverseScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'map':
        return <MapScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <TabletSimulator>
      <div className="reverse-app">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-left">
            <span>9:41</span>
          </div>
          <div className="status-right">
            <div className="status-icon">
              <span>📶</span>
              <span>5G</span>
            </div>
            <div className="status-icon">
              <span>📡</span>
              <span>WiFi</span>
            </div>
            <div className="battery">
              <span>🔋</span>
              <div className="battery-level">
                <div className="level"></div>
              </div>
              <span>85%</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/logo.png" 
              alt="Reverse Logo" 
              style={{ 
                height: '32px', 
                width: 'auto',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }} 
            />
            <h1 className="nav-title">Reverse</h1>
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
          >
            <span>{activeTab === 'home' ? '🏠' : '🏡'}</span>
            <span>Home</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => handleTabChange('discover')}
          >
            <span>{activeTab === 'discover' ? '🔍' : '🔎'}</span>
            <span>Discover</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'reverse' ? 'active' : ''}`}
            onClick={() => handleTabChange('reverse')}
          >
            <img 
              src="/logo.png" 
              alt="Reverse" 
              style={{ 
                height: '24px', 
                width: 'auto',
                filter: activeTab === 'reverse' ? 'drop-shadow(0 2px 4px rgba(245, 179, 1, 0.3))' : 'none'
              }} 
            />
            <span>Reverse</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => handleTabChange('rewards')}
          >
            <span>{activeTab === 'rewards' ? '⭐' : '✨'}</span>
            <span>Rewards</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => handleTabChange('map')}
          >
            <span>{activeTab === 'map' ? '🗺️' : '📍'}</span>
            <span>Map</span>
          </button>
        </div>
      </div>
    </TabletSimulator>
  );
};

export default Demo; 