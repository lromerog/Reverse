import React, { useState, useEffect } from 'react';
import TabletSimulator from '../components/TabletSimulator';
import '../components/ReverseApp.css';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { QRCodeSVG } from 'qrcode.react';
import { GiHomeGarage, GiSoccerKick, GiRecycle } from 'react-icons/gi';
import { MdMap, MdQrCode } from 'react-icons/md';
import { RiUser3Fill } from 'react-icons/ri';
import { IoHomeOutline, IoPersonOutline, IoRefreshOutline, IoStarOutline, IoMapOutline } from 'react-icons/io5';
import { Button } from '@mui/material';

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
  <div className="content home-content">
    {/* Hero Banner */}
    <div className="hero-banner card fade-in" style={{
      background: 'linear-gradient(90deg, #F5B301 60%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 32,
      borderRadius: 20,
      marginBottom: 24,
      minHeight: 180
    }}>
      <div>
        <h1 style={{ color: '#232323', fontWeight: 800, fontSize: 32, marginBottom: 8 }}>Give your sneakers a second life</h1>
        <p style={{ color: '#232323', fontSize: 18, marginBottom: 16 }}>Recycle your old Nike shoes and earn exclusive rewards while helping the planet.</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <button className="quick-action" style={{ background: '#232323', color: '#fff' }}>Recycle Now</button>
          <button className="quick-action" style={{ background: '#fff', color: '#232323', border: '2px solid #232323' }}>Find Store</button>
        </div>
      </div>
      <img src="/assets/images/hero/sneaker-recycling.png" alt="Sneaker Recycling" style={{ width: 180, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
    </div>
    {/* Quick Tips */}
    <div className="card fade-in" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Quick Tips</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div className="tip-card" style={{ background: '#F5B301', color: '#232323', borderRadius: 12, padding: 16, minWidth: 180 }}>
          <b>Clean your shoes</b><br />before recycling for better results.
        </div>
        <div className="tip-card" style={{ background: '#fff', color: '#232323', borderRadius: 12, padding: 16, minWidth: 180, border: '1px solid #F5B301' }}>
          <b>Check locations</b><br />Use the map to find the nearest recycling point.
        </div>
        <div className="tip-card" style={{ background: '#232323', color: '#fff', borderRadius: 12, padding: 16, minWidth: 180 }}>
          <b>Earn rewards</b><br />Every recycling action gives you points!
        </div>
      </div>
    </div>
    {/* News/Announcements */}
    <div className="card fade-in" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Latest News</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div className="news-card" style={{ background: '#fff', borderRadius: 12, padding: 16, minWidth: 220, border: '1px solid #eee' }}>
          <b>New store opening!</b><br />Visit our new recycling point at City Mall.
        </div>
        <div className="news-card" style={{ background: '#fff', borderRadius: 12, padding: 16, minWidth: 220, border: '1px solid #eee' }}>
          <b>Spring Challenge</b><br />Recycle 3 pairs this month and win extra points.
        </div>
      </div>
    </div>
    {/* Placeholder for future banners/sliders */}
    <div className="card fade-in" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
      <span>More features coming soon...</span>
    </div>
  </div>
);

const DiscoverScreen = () => (
  <div className="content">
    <div className="card fade-in">
      <h3>The Sneaker Recycling Process</h3>
      <p>
        When you recycle your old sneakers, they are collected, cleaned, and broken down into raw materials. These materials are then used to create new, sustainable Nike sneakers, reducing waste and environmental impact.
      </p>
      <ul>
        <li>Collection: Drop off your old sneakers at a participating Nike store.</li>
        <li>Processing: Shoes are sorted, cleaned, and prepared for recycling.</li>
        <li>Transformation: Materials are processed and reused in new products.</li>
      </ul>
    </div>
    <div className="card fade-in" style={{ textAlign: 'center' }}>
      {/* Imagen eliminada: archivo no encontrado */}
    </div>
    <div className="card fade-in" style={{ textAlign: 'center' }}>
      {/* Imagen eliminada: archivo no encontrado */}
    </div>
  </div>
);

const ReverseScreen = () => (
  <div className="content">
    <div className="card fade-in">
      <h2>Recycle Your Sneakers in Store</h2>
      <p>
        Bring your old Nike sneakers to any participating store and drop them off at the Reverse recycling point. Our team will ensure your shoes are collected and sent for recycling, helping to create new, sustainable sneakers.
      </p>
      <ol>
        <li>Find a participating Nike store on the map.</li>
        <li>Bring your used sneakers to the Reverse recycling point inside the store.</li>
        <li>Hand over your shoes to the staff and receive a discount code for your next purchase.</li>
      </ol>
    </div>
    <div className="card fade-in" style={{ textAlign: 'center' }}>
      {/* Imagen eliminada: archivo no encontrado */}
      <p style={{ color: '#636e72', fontSize: 15 }}>Look for this recycling point in your local Nike store!</p>
    </div>
  </div>
);

const RewardsScreen = () => {
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const userPoints = 1250;
  const rewards = [
    {
      id: 1,
      name: '10% Off Your Next Purchase',
      // image: '/assets/images/40-voucher.svg', // Archivo no encontrado, comentar
      points: 120,
      description: 'Get 10% off when you recycle your old sneakers.',
      category: 'Discounts',
      featured: true
    },
    {
      id: 2,
      name: 'Exclusive Recycled Tote Bag',
      // image: '/assets/images/Rectangle-2.png', // Archivo no encontrado, comentar
      points: 200,
      description: 'A stylish tote bag made from recycled materials.',
      category: 'Merchandise',
      featured: false
    },
    {
      id: 3,
      name: 'Limited Edition Recycled Sneakers',
      // image: '/assets/images/Rectangle-3.png', // Archivo no encontrado, comentar
      points: 800,
      description: 'Sneakers made from recycled shoes, only for top recyclers.',
      category: 'Sneakers',
      featured: true
    },
    {
      id: 4,
      name: '5% Off Recycled Collection',
      // image: '/assets/images/Rectangle.png', // Archivo no encontrado, comentar
      points: 60,
      description: 'Discount on any product from the recycled collection.',
      category: 'Discounts',
      featured: false
    },
  ];
  const categories = ['All', 'Discounts', 'Merchandise', 'Sneakers'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredRewards = rewards.filter(reward => selectedCategory === 'All' || reward.category === selectedCategory);

  return (
    <div className="content rewards-content">
      {/* Progress Card */}
      <div className="card fade-in" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 32, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, color: '#F5B301' }}>Your Points</h2>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>{userPoints} pts</div>
          <div style={{ marginTop: 8, color: '#bbb' }}>Level 3 - Sustainability Star</div>
        </div>
        <div style={{ flex: 2 }}>
          <div style={{ height: 12, background: '#333', borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ width: '60%', height: '100%', background: '#F5B301', transition: 'width 0.3s' }} />
          </div>
          <div style={{ color: '#bbb', fontSize: 14 }}>Next level: 2000 pts</div>
        </div>
      </div>
      {/* Category Filters */}
      <div className="card fade-in" style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 20px',
              borderRadius: 16,
              border: 'none',
              background: selectedCategory === category ? '#F5B301' : '#232323',
              color: selectedCategory === category ? '#232323' : '#fff',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 15
            }}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Featured Rewards */}
      <div className="card fade-in" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Featured Rewards</h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {rewards.filter(r => r.featured).map(reward => (
            <div key={reward.id} className="reward-card" style={{ background: '#fff', borderRadius: 16, padding: 16, minWidth: 220, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={reward.image} alt={reward.name} style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 12 }} />
              <b style={{ color: '#232323', marginBottom: 4 }}>{reward.name}</b>
              <span style={{ color: '#F5B301', fontWeight: 700 }}>{reward.points} pts</span>
              <button onClick={() => { setSelectedReward(reward); setShowRedeemDialog(true); }} style={{ marginTop: 12, background: '#F5B301', color: '#232323', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>View</button>
            </div>
          ))}
        </div>
      </div>
      {/* Rewards Grid */}
      <div className="card fade-in" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>All Rewards</h3>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {filteredRewards.map(reward => (
            <div key={reward.id} className="reward-card" style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={reward.image} alt={reward.name} style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 12 }} />
              <b style={{ color: '#232323', marginBottom: 4 }}>{reward.name}</b>
              <span style={{ color: '#F5B301', fontWeight: 700 }}>{reward.points} pts</span>
              <button onClick={() => { setSelectedReward(reward); setShowRedeemDialog(true); }} style={{ marginTop: 12, background: '#232323', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Details</button>
            </div>
          ))}
        </div>
      </div>
      {/* Placeholder for future features */}
      <div className="card fade-in" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
        <span>More reward features coming soon...</span>
      </div>
      {/* Redeem Modal */}
      {showRedeemDialog && selectedReward && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <img src={selectedReward.image} alt={selectedReward.name} style={{ width: 100, height: 100, objectFit: 'contain', marginBottom: 16 }} />
            <h2 style={{ color: '#232323', marginBottom: 8 }}>{selectedReward.name}</h2>
            <p style={{ color: '#232323', marginBottom: 8 }}>{selectedReward.description}</p>
            <span style={{ color: '#F5B301', fontWeight: 700, fontSize: 18 }}>{selectedReward.points} pts</span>
            <button onClick={() => setShowRedeemDialog(false)} style={{ marginTop: 24, background: '#F5B301', color: '#232323', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
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
  const [isLoading, setIsLoading] = useState(true);
  const [scannedLocations, setScannedLocations] = useState([
    {
      id: 1,
      name: "Nike Store Downtown (Recycling Point)",
      address: "123 Main St, City Center",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      timestamp: "2024-03-15T10:30:00",
      points: 50
    },
    {
      id: 2,
      name: "Nike Mall Recycling Center",
      address: "456 Shopping Ave, Mall",
      coordinates: { lat: 40.7148, lng: -74.0080 },
      timestamp: "2024-03-14T15:45:00",
      points: 75
    }
  ]);

  // Constantes para la ubicación por defecto
  const DEFAULT_CENTER = {
    lat: 40.7128,
    lng: -74.0060
  };

  // Constantes para los mensajes de error
  const ERROR_MESSAGES = {
    GEOLOCATION_NOT_SUPPORTED: "La geolocalización no está soportada en tu navegador",
    LOCATION_DENIED: "No se pudo obtener tu ubicación. Por favor, habilita los servicios de ubicación.",
    LOCATION_UNAVAILABLE: "La información de ubicación no está disponible.",
    LOCATION_TIMEOUT: "La solicitud de ubicación ha expirado.",
    UNKNOWN_ERROR: "Ocurrió un error al obtener tu ubicación."
  };

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setMapError(ERROR_MESSAGES.GEOLOCATION_NOT_SUPPORTED);
        setIsLoading(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      } catch (error: any) {
        let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = ERROR_MESSAGES.LOCATION_DENIED;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = ERROR_MESSAGES.LOCATION_UNAVAILABLE;
            break;
          case error.TIMEOUT:
            errorMessage = ERROR_MESSAGES.LOCATION_TIMEOUT;
            break;
        }
        
        setMapError(errorMessage);
        console.error("Error de geolocalización:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  // Helper para convertir a array [number, number]
  function toLatLngArray(location: { lat: number; lng: number } | null | undefined): [number, number] {
    if (!location) return [40.7128, -74.0060];
    return [location.lat, location.lng];
  }

  // Helper to move map to current location
  function SetViewToCurrentLocation({ location }: { location: { lat: number; lng: number } }) {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lng], 13);
      }
    }, [location, map]);
    return null;
  }

  return (
    <div className="content map-content" style={{ display: 'flex', gap: 24 }}>
      {/* Map Section */}
      <div style={{ flex: 2, minWidth: 0 }}>
        <div className="card fade-in" style={{ marginBottom: 24 }}>
          <h2>Find a Sneaker Recycling Point</h2>
          <p>Locate your nearest participating Nike store to drop off your old sneakers for recycling and earn rewards!</p>
        </div>
        <div className="card fade-in" style={{ height: '400px', position: 'relative', padding: 0, overflow: 'hidden', marginBottom: 24 }}>
          {isLoading ? (
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
                <span style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>⌛</span>
                <p>Cargando mapa...</p>
              </div>
            </div>
          ) : mapError ? (
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
            <MapContainer
              options={{ center: toLatLngArray(currentLocation || DEFAULT_CENTER), zoom: 13, scrollWheelZoom: false, attributionControl: false }}
              style={{ width: '100%', height: '400px', borderRadius: '12px' }}
            >
              {/* @ts-ignore */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {currentLocation && (
                <LeafletMarker position={toLatLngArray(currentLocation)}>
                  <Popup>Your current location</Popup>
                </LeafletMarker>
              )}
              {scannedLocations.map((location) => (
                <LeafletMarker
                  key={location.id}
                  position={toLatLngArray(location.coordinates)}
                >
                  <Popup>
                    <b>{location.name}</b><br />
                    {location.address}<br />
                    <span>+{location.points} pts</span>
                  </Popup>
                </LeafletMarker>
              ))}
              {currentLocation && <SetViewToCurrentLocation location={currentLocation} />}
            </MapContainer>
          )}
        </div>
      </div>
      {/* Side List of Locations */}
      <div style={{ flex: 1, minWidth: 260 }}>
        <div className="card fade-in" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Nearby Locations</h3>
          <div style={{ maxHeight: 400, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {scannedLocations.map(location => (
              <div key={location.id} style={{ background: '#fff', borderRadius: 10, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <b style={{ color: '#232323' }}>{location.name}</b><br />
                <span style={{ color: '#888', fontSize: 13 }}>{location.address}</span><br />
                <span style={{ color: '#F5B301', fontWeight: 600, fontSize: 13 }}>+{location.points} pts</span>
              </div>
            ))}
          </div>
        </div>
        {/* Placeholder for future filters/search */}
        <div className="card fade-in" style={{ minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
          <span>Filters and search coming soon...</span>
        </div>
      </div>
    </div>
  );
};

const QRScreen = () => (
  <div className="content qr-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32, marginBottom: 24, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
      <h2 style={{ marginBottom: 16 }}>Your Discount QR</h2>
      <QRCodeSVG value={'REVERSE-10-OFF'} size={220} fgColor="#232323" bgColor="#fff" includeMargin={true} />
      <p style={{ marginTop: 16, fontWeight: 600, color: '#232323', fontSize: 18 }}>REVERSE-10-OFF</p>
      <p style={{ color: '#636e72', fontSize: 14, marginBottom: 0 }}>Show this QR at checkout to get your discount for recycling your sneakers!</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
        <button className="quick-action" style={{ background: '#F5B301', color: '#232323' }}>Share</button>
        <button className="quick-action" style={{ background: '#232323', color: '#fff' }}>Save</button>
      </div>
    </div>
    {/* Placeholder for QR history/future features */}
    <div className="card fade-in" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
      <span>QR history and more features coming soon...</span>
    </div>
  </div>
);

const ProfileScreen = () => (
  <div className="content profile-content">
    {/* User Card */}
    <div className="card fade-in" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 32, marginBottom: 24 }}>
      {/* <img src="/assets/images/avatar-placeholder.png" alt="User Avatar" style={{ width: 90, height: 90, borderRadius: '50%', border: '4px solid #F5B301', objectFit: 'cover' }} /> */}
      <div>
        <h2 style={{ margin: 0 }}>John Doe</h2>
        <p style={{ color: '#F5B301', fontWeight: 600, margin: '4px 0' }}>Level 3 - Sustainability Star</p>
        <p style={{ color: '#fff', margin: 0 }}>1,250 points</p>
      </div>
    </div>
    {/* Quick Actions */}
    <div className="card fade-in" style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      <button className="quick-action" style={{ background: '#F5B301', color: '#232323' }}>Edit Profile</button>
      <button className="quick-action" style={{ background: '#232323', color: '#fff' }}>History</button>
      <button className="quick-action" style={{ background: '#fff', color: '#232323', border: '2px solid #F5B301' }}>Settings</button>
    </div>
    {/* Stats & Achievements */}
    <div className="card fade-in" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Your Progress</h3>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#F5B301', fontWeight: 700 }}>15</div>
          <div style={{ color: '#fff' }}>Shoes Recycled</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#F5B301', fontWeight: 700 }}>5</div>
          <div style={{ color: '#fff' }}>Rewards Claimed</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#F5B301', fontWeight: 700 }}>3</div>
          <div style={{ color: '#fff' }}>Badges</div>
        </div>
      </div>
    </div>
    {/* Achievements/Badges */}
    <div className="card fade-in" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
      <span>Achievements and social features coming soon...</span>
    </div>
  </div>
);

const RecycleScreen = () => (
  <div className="content recycle-content">
    {/* Process Stepper */}
    <div className="card fade-in" style={{ marginBottom: 24, padding: 32 }}>
      <h2 style={{ marginBottom: 16 }}>How to Recycle</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{ fontSize: 36, color: '#F5B301', marginBottom: 8 }}>👟</div>
          <b>1. Bring your old sneakers</b>
        </div>
        <div style={{ fontSize: 28, color: '#bbb', alignSelf: 'center' }}>→</div>
        <div style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{ fontSize: 36, color: '#F5B301', marginBottom: 8 }}>🏪</div>
          <b>2. Find a Reverse point</b>
        </div>
        <div style={{ fontSize: 28, color: '#bbb', alignSelf: 'center' }}>→</div>
        <div style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{ fontSize: 36, color: '#F5B301', marginBottom: 8 }}>🔄</div>
          <b>3. Drop off & earn rewards</b>
        </div>
      </div>
    </div>
    {/* Call to Action */}
    <div className="card fade-in" style={{ marginBottom: 24, textAlign: 'center', padding: 32 }}>
      <h3>Ready to recycle?</h3>
      <button className="quick-action" style={{ background: '#F5B301', color: '#232323', fontSize: 18, padding: '12px 32px', borderRadius: 12, marginTop: 16 }}>Find Nearest Store</button>
    </div>
    {/* Benefits & Testimonials */}
    <div className="card fade-in" style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12 }}>Why Recycle?</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div className="benefit-card" style={{ background: '#fff', color: '#232323', borderRadius: 12, padding: 16, minWidth: 180, border: '1px solid #F5B301' }}>
          <b>Save the planet</b><br />Reduce waste and support sustainability.
        </div>
        <div className="benefit-card" style={{ background: '#F5B301', color: '#232323', borderRadius: 12, padding: 16, minWidth: 180 }}>
          <b>Earn rewards</b><br />Get points and exclusive offers.
        </div>
        <div className="benefit-card" style={{ background: '#232323', color: '#fff', borderRadius: 12, padding: 16, minWidth: 180 }}>
          <b>Be a hero</b><br />Join a community of changemakers.
        </div>
      </div>
    </div>
    {/* Placeholder for future campaigns/challenges */}
    <div className="card fade-in" style={{ minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
      <span>Recycling campaigns and challenges coming soon...</span>
    </div>
  </div>
);

const Demo: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrTab, setQrTab] = useState<'scan' | 'generate'>('scan');
  const qrDiscountCode = 'REVERSE-10-OFF';

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
      case 'profile':
        return <ProfileScreen />;
      case 'recycle':
        return <RecycleScreen />;
      case 'reverse':
        return <DiscoverScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'map':
        return <MapScreen />;
      case 'qr':
        return <QRScreen />;
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
            <h1 className="nav-title" style={{ color: '#4CAF50' }}>Reverse</h1>
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* QR Modal */}
        {showQRModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              minWidth: 320,
              maxWidth: '90vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <button onClick={() => setQrTab('scan')} style={{
                  padding: '8px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: qrTab === 'scan' ? '#F5B301' : '#f5f5f5',
                  color: qrTab === 'scan' ? '#232323' : '#636e72',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16
                }}>Scan QR</button>
                <button onClick={() => setQrTab('generate')} style={{
                  padding: '8px 24px',
                  borderRadius: 8,
                  border: 'none',
                  background: qrTab === 'generate' ? '#F5B301' : '#f5f5f5',
                  color: qrTab === 'generate' ? '#232323' : '#636e72',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 16
                }}>Generate QR</button>
              </div>
              {qrTab === 'scan' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 250,
                    height: 250,
                    background: '#f5f5f5',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    border: '2px solid #F5B301',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <span style={{ fontSize: 48 }}>📱</span>
                  </div>
                  <p style={{ color: '#636e72', marginBottom: 0 }}>Scan the QR code you received after recycling or purchasing recycled sneakers to redeem your discount!</p>
                </div>
              )}
              {qrTab === 'generate' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <QRCodeSVG value={qrDiscountCode} size={200} fgColor="#232323" bgColor="#fff" includeMargin={true} />
                  <p style={{ marginTop: 16, fontWeight: 600, color: '#232323', fontSize: 18 }}>{qrDiscountCode}</p>
                  <p style={{ color: '#636e72', fontSize: 14 }}>Show this QR at checkout to get your discount for recycling your sneakers!</p>
                </div>
              )}
              <button onClick={() => setShowQRModal(false)} style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 24,
                color: '#636e72',
                cursor: 'pointer'
              }}>×</button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <Button
            variant="text"
            onClick={() => handleTabChange('home')}
            aria-label="Home"
            startIcon={<IoHomeOutline size={32} style={{ color: activeTab === 'home' ? '#F5B301' : '#636e72', filter: activeTab === 'home' ? 'drop-shadow(0 2px 4px rgba(245, 179, 1, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'home' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'home' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Home
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange('profile')}
            aria-label="Profile"
            startIcon={<IoPersonOutline size={32} style={{ color: activeTab === 'profile' ? '#4CAF50' : '#636e72', filter: activeTab === 'profile' ? 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'profile' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'profile' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Profile
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange('recycle')}
            aria-label="Recycle"
            startIcon={<GiRecycle size={32} style={{ color: activeTab === 'recycle' ? '#4CAF50' : '#636e72', filter: activeTab === 'recycle' ? 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'recycle' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'recycle' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Recycle
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange('reverse')}
            aria-label="Reverse"
            startIcon={<img src="/logo.png" alt="Reverse" style={{ height: '32px', width: 'auto', filter: activeTab === 'reverse' ? 'drop-shadow(0 2px 4px rgba(245, 179, 1, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'reverse' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'reverse' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Reverse
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange('rewards')}
            aria-label="Rewards"
            startIcon={<IoStarOutline size={32} style={{ color: activeTab === 'rewards' ? '#F5B301' : '#636e72', filter: activeTab === 'rewards' ? 'drop-shadow(0 2px 4px rgba(245, 179, 1, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'rewards' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'rewards' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Rewards
          </Button>
          <Button
            variant="text"
            onClick={() => handleTabChange('map')}
            aria-label="Map"
            startIcon={<IoMapOutline size={32} style={{ color: activeTab === 'map' ? '#4CAF50' : '#636e72', filter: activeTab === 'map' ? 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))' : 'none' }} />}
            sx={{ color: activeTab === 'map' ? 'primary.main' : 'text.secondary', fontWeight: activeTab === 'map' ? 500 : 400, borderRadius: 16, minWidth: 64, py: 1, px: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}
          >
            Map
          </Button>
          <button 
            className={`nav-item ${activeTab === 'qr' ? 'active' : ''}`}
            onClick={() => { setActiveTab('qr'); setShowQRModal(true); }}
            aria-label="QR"
          >
            <span>
              <MdQrCode 
                size={32} 
                style={{ 
                  color: activeTab === 'qr' ? '#F5B301' : '#636e72',
                  filter: activeTab === 'qr' ? 'drop-shadow(0 2px 4px rgba(245, 179, 1, 0.3))' : 'none'
                }} 
              />
            </span>
            <span>QR</span>
          </button>
        </div>
      </div>
    </TabletSimulator>
  );
};

export default Demo; 