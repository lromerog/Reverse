import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import './index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { QRCodeSVG } from 'qrcode.react'
import { QrReader } from 'react-qr-reader'
import html2canvas from 'html2canvas'

const heroSlides = [
  {
    type: 'video',
    src: '/assets/images/video.mp4',
    headline: 'Just Do It.',
    subtext: 'Inspiring the world\'s athletes with innovation and style.',
    cta: 'Shop Now',
    link: '#',
  },
  {
    type: 'video',
    src: '/assets/images/videoad.mp4',
    headline: 'New Arrivals',
    subtext: 'Discover the latest Nike collections.',
    cta: 'Explore',
    link: '#',
  },
  {
    type: 'image',
    src: '/assets/images/Component 1.png',
    headline: 'Best Sellers',
    subtext: 'Shop the most popular Nike products.',
    cta: 'Shop Bestsellers',
    link: '#',
  },
]

const featuredProducts = [
  {
    name: 'Discover Reverse',
    img: '/assets/images/logo.png',
    desc: 'Recycle, earn rewards, and make a difference with Reverse.',
    link: '#',
    isReverse: true
  },
  {
    name: 'Nike Air Max',
    img: '/assets/images/Untitled design (5) 2.png',
    desc: 'Legendary comfort and style.',
    link: '#',
  },
  {
    name: 'Nike Air Force 1',
    img: '/assets/images/Untitled design (6) 2.png',
    desc: 'The icon lives on.',
    link: '#',
  },
  {
    name: 'Nike React',
    img: '/assets/images/Untitled design (2) 2.png',
    desc: 'Innovation for every day.',
    link: '#',
  },
  {
    name: 'Nike Pegasus',
    img: '/assets/images/Untitled design (1) 2.png',
    desc: 'Run farther. Run faster.',
    link: '#',
  },
]

const trendingCollections = [
  {
    name: 'Jordan Collection',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(5).png',
    link: '#',
  },
  {
    name: 'Running Essentials',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(6).png',
    link: '#',
  },
  {
    name: 'Lifestyle',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(7).png',
    link: '#',
  },
]

function ReverseMap({ voucherHistory, onDownloadVoucher }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [storeMarkers, setStoreMarkers] = useState([]);
  const [address, setAddress] = useState('');
  const [stores, setStores] = useState([
    { name: 'Nike Brussels', lat: 50.8466, lng: 4.3528 },
    { name: 'Nike Antwerp', lat: 51.2184, lng: 4.4025 },
    { name: 'Nike Ghent', lat: 51.0543, lng: 3.7174 },
    { name: 'Nike New York', lat: 40.7625, lng: -73.9750 },
    { name: 'Nike Los Angeles', lat: 34.0635, lng: -118.3581 },
    { name: 'Nike London', lat: 51.5142, lng: -0.1321 },
    { name: 'Nike Paris', lat: 48.8655, lng: 2.3212 },
    { name: 'Nike Tokyo', lat: 35.6696, lng: 139.7035 },
    { name: 'Nike Sydney', lat: -33.8708, lng: 151.2083 },
    { name: 'Nike Berlin', lat: 52.5074, lng: 13.3904 },
    { name: 'Nike Toronto', lat: 43.6545, lng: -79.3860 }
  ]);
  const [center, setCenter] = useState({ lat: 50.8503, lng: 4.3517 });
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  // Set your Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1Ijoiem9yaWIiLCJhIjoiY21hemJ3YTgzMGR0aTJqcXp0bmlvb2JjYSJ9.SRZF4ZKCzAESzURO5MDc5A';

  useEffect(() => {
    if (map) return; // Only initialize once
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [center.lng, center.lat],
      zoom: 2
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (!map) return;
    map.setCenter([center.lng, center.lat]);
    map.setZoom(12);
    // Remove previous user marker
    if (userMarker) userMarker.remove();
    const marker = new mapboxgl.Marker({ color: 'black' })
      .setLngLat([center.lng, center.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('You are here'))
      .addTo(map);
    setUserMarker(marker);
    // Update store markers
    storeMarkers.forEach(m => m.remove());
    const newMarkers = stores.map(store => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(store.name);
      return new mapboxgl.Marker({ color: '#e50914' })
        .setLngLat([store.lng, store.lat])
        .setPopup(popup)
        .addTo(map);
    });
    setStoreMarkers(newMarkers);
    // Add voucher markers
    if (voucherHistory && voucherHistory.length > 0) {
      voucherHistory.forEach(voucher => {
        if (voucher.lat && voucher.lng) {
          const voucherMarker = new mapboxgl.Marker({ color: '#00C37A' })
            .setLngLat([voucher.lng, voucher.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Voucher: €${voucher.value}`))
            .addTo(map);
          voucherMarker.getElement().addEventListener('click', () => {
            setSelectedVoucher(voucher);
          });
        }
      });
    }
  }, [center, map, voucherHistory]);

  function handleLocate() {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    navigator.geolocation.getCurrentPosition(pos => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    }, () => alert('Unable to get location'));
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!address.trim()) return alert('Please enter an address or city');
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`)
      .then(res => res.json())
      .then(data => {
        if (!data.features.length) return alert('Location not found');
        const [lng, lat] = data.features[0].center;
        setCenter({ lat, lng });
      });
  }

  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const sortedStores = stores.map(store => {
    const dist = distance(center.lat, center.lng, store.lat, store.lng);
    return { ...store, dist };
  }).sort((a, b) => a.dist - b.dist);

  return (
    <div style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'black', color: 'white', fontWeight: 900, fontSize: '1.5rem', padding: 14, textAlign: 'center', letterSpacing: 2 }}>REVERSE</div>
      <form onSubmit={handleSearch} style={{ display: 'flex', padding: 10, background: '#f4f4f4', justifyContent: 'center', gap: 8 }}>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter your address or city"
          style={{ flex: 1, padding: '10px 16px', borderRadius: 25, border: '2px solid #ccc', fontSize: '1rem' }}
        />
        <button type="submit" style={{ background: 'black', color: 'white', border: 'none', borderRadius: 25, padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Search</button>
        <button type="button" onClick={handleLocate} style={{ background: 'black', color: 'white', border: 'none', borderRadius: 25, padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>📍 My Location</button>
      </form>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ width: 300, background: '#f9f9f9', overflowY: 'auto', padding: 16, borderRight: '1px solid #ccc' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Nearby Nike Stores</h3>
          <div>
            {sortedStores.map((store, idx) => (
              <div key={idx} className="store-item" style={{ marginBottom: 10, padding: 10, background: 'white', borderRadius: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => {
                  if (map) map.flyTo({ center: [store.lng, store.lat], zoom: 14 });
                }}
              >
                <strong style={{ display: 'block', fontSize: '1rem', marginBottom: 4 }}>{store.name}</strong>
                <span>{store.dist.toFixed(2)} km away</span>
              </div>
            ))}
          </div>
          {/* List user's vouchers with location */}
          {voucherHistory && voucherHistory.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h4 style={{ color: '#00C37A', marginBottom: 12 }}>Your Vouchers on Map</h4>
              {voucherHistory.filter(v => v.lat && v.lng).map(v => (
                <div key={v.code} style={{ background: '#fff', color: '#232323', borderRadius: 8, padding: 12, marginBottom: 12, boxShadow: '0 2px 6px rgba(0,195,122,0.08)', cursor: 'pointer' }} onClick={() => {
                  if (map) map.flyTo({ center: [v.lng, v.lat], zoom: 15 });
                  setSelectedVoucher(v);
                }}>
                  <div style={{ fontWeight: 700 }}>Voucher: €{v.value}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{new Date(v.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div ref={mapContainerRef} id="map" style={{ flexGrow: 1, position: 'relative' }} />
      </div>
      {/* Show voucher card if selected */}
      {selectedVoucher && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedVoucher(null)}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src="/assets/images/logo.png" alt="Reverse Logo" style={{ height: 40, marginBottom: 8 }} />
            <img src="/assets/images/nike-swoosh.png" alt="Nike Logo" style={{ height: 32, marginBottom: 16, marginLeft: 12 }} />
            <h2 style={{ color: '#00C37A', margin: '1rem 0 0.5rem 0' }}>Discount Voucher</h2>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#F5B301', margin: '1rem 0' }}>€{selectedVoucher.value}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Code: <span style={{ color: '#00C37A' }}>{selectedVoucher.code}</span></div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Issued: {new Date(selectedVoucher.date).toLocaleString()}</div>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Valid at any Reverse x Nike location</div>
            <div style={{ fontSize: 12, color: '#bbb', marginTop: 12 }}>Show this voucher at checkout to redeem your discount.</div>
            <button className="shop-btn" style={{ background: '#00C37A', color: '#232323', fontWeight: 700, marginTop: 24 }} onClick={() => onDownloadVoucher(selectedVoucher.code)}>Download Voucher</button>
            <button className="shop-btn" style={{ background: '#bbb', color: '#232323', fontWeight: 700, marginTop: 16 }} onClick={() => setSelectedVoucher(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [showReverse, setShowReverse] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentReversePage, setCurrentReversePage] = useState('recycle')
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQRValue] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [voucherLocation, setVoucherLocation] = useState(null);
  const [voucherHistory, setVoucherHistory] = useState(() => {
    const saved = localStorage.getItem('reverseVouchers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reverseVouchers', JSON.stringify(voucherHistory));
  }, [voucherHistory]);

  function addVoucherToHistory(voucher) {
    setVoucherHistory(prev => [...prev, voucher]);
  }

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email === 'admin@reverse.com' && password === 'reverse') {
      setIsAuthenticated(true)
      setShowReverse(false)
    } else {
      alert('Incorrect credentials')
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // For now, just simulate registration
    alert('Registration successful. Please log in.')
    setAuthMode('login')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  function getRandomVoucherValue() {
    const values = [5, 10, 15, 20];
    return values[Math.floor(Math.random() * values.length)];
  }

  function generateUUID() {
    return 'xxxxxxxxyxxxxyxxxyxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function handleGenerateQR() {
    const id = generateUUID();
    const now = new Date();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const qrData = JSON.stringify({
          id,
          date: now.toISOString(),
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setQRValue(qrData);
        setShowQR(true);
      }, () => {
        const qrData = JSON.stringify({ id, date: now.toISOString() });
        setQRValue(qrData);
        setShowQR(true);
      });
    } else {
      const qrData = JSON.stringify({ id, date: now.toISOString() });
      setQRValue(qrData);
      setShowQR(true);
    }
  }

  // Add reverse geocoding function
  async function getLocationName(lat, lng) {
    if (!lat || !lng) return '';
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      return data.address.city || data.address.town || data.address.village || data.address.state || data.address.country || '';
    } catch {
      return '';
    }
  }

  // Update handleScanQR to prevent duplicate vouchers
  async function handleScanQR(result) {
    if (result && result.text) {
      try {
        const data = JSON.parse(result.text);
        // Check if voucher already exists
        if (voucherHistory.some(v => v.code === data.id)) {
          alert('This QR code has already been redeemed.');
          setShowScanner(false);
          return;
        }
        const value = getRandomVoucherValue();
        let locationName = '';
        if (data.lat && data.lng) {
          locationName = await getLocationName(data.lat, data.lng);
        }
        const newVoucher = {
          code: data.id,
          value,
          date: data.date,
          lat: data.lat,
          lng: data.lng,
          locationName
        };
        setVoucher(newVoucher);
        setVoucherLocation({ lat: data.lat, lng: data.lng });
        setShowScanner(false);
        addVoucherToHistory(newVoucher);
      } catch (e) {
        alert('Invalid QR code');
      }
    }
  }

  function handleDownloadVoucher() {
    const voucherEl = document.getElementById('voucher-card');
    if (voucherEl) {
      html2canvas(voucherEl).then(canvas => {
        const link = document.createElement('a');
        link.download = `reverse-voucher-${voucher.code}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }

  function handleDownloadVoucherById(code) {
    const voucherEl = document.getElementById(`voucher-card-${code}`);
    const voucher = voucherHistory.find(v => v.code === code) || voucher;
    if (voucherEl) {
      html2canvas(voucherEl).then(canvas => {
        const link = document.createElement('a');
        link.download = `reverse-voucher-${voucher.code}.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  }

  // Render Reverse Dashboard
  const renderReverseDashboard = () => {
    if (!isAuthenticated) return null

    return (
      <div className="reverse-dashboard">
        <header className="reverse-header">
          <div className="reverse-header-content">
            <img src="/assets/images/logo.png" alt="Reverse Logo" className="reverse-dashboard-logo" />
            <nav className="reverse-nav">
              <button 
                className={`reverse-nav-btn ${currentReversePage === 'recycle' ? 'active' : ''}`}
                onClick={() => setCurrentReversePage('recycle')}
              >
                Recycle
              </button>
              <button 
                className={`reverse-nav-btn ${currentReversePage === 'reverse' ? 'active' : ''}`}
                onClick={() => setCurrentReversePage('reverse')}
              >
                Reverse
              </button>
              <button 
                className={`reverse-nav-btn ${currentReversePage === 'rewards' ? 'active' : ''}`}
                onClick={() => setCurrentReversePage('rewards')}
              >
                Rewards
              </button>
              <button 
                className={`reverse-nav-btn ${currentReversePage === 'maps' ? 'active' : ''}`}
                onClick={() => setCurrentReversePage('maps')}
              >
                Maps
              </button>
            </nav>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </header>

        <main className="reverse-main">
          {currentReversePage === 'recycle' && (
            <div className="reverse-page recycle-guide">
              <h2>How to Recycle with Reverse</h2>
              <video src="/assets/images/videoad.mp4" controls autoPlay loop muted style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem', background: '#232323' }} poster="/assets/images/logo.png" />
              <div className="recycle-steps">
                <div className="recycle-step">
                  <img src="/assets/images/recyclee.svg" alt="Collect" className="recycle-step-icon" />
                  <h3>1. Collect</h3>
                  <p>Gather your recyclable products and make sure they are clean.</p>
                </div>
                <div className="recycle-step">
                  <img src="/assets/images/Vector.svg" alt="Scan" className="recycle-step-icon" />
                  <h3>2. Scan</h3>
                  <p>Scan the QR code at the Reverse recycling point using your phone.</p>
                </div>
                <div className="recycle-step">
                  <img src="/assets/images/recyclenav.svg" alt="Drop" className="recycle-step-icon" />
                  <h3>3. Drop</h3>
                  <p>Drop your products in the Reverse container.</p>
                </div>
                <div className="recycle-step">
                  <img src="/assets/images/reward card.png" alt="Earn" className="recycle-step-icon" />
                  <h3>4. Earn</h3>
                  <p>Earn points and rewards for every item you recycle.</p>
                </div>
              </div>
            </div>
          )}
          {currentReversePage === 'reverse' && (
            <div className="reverse-page reverse-info">
              <h2>What is Reverse?</h2>
              <p className="reverse-lead">Reverse is an innovative recycling platform that rewards you for making a positive impact on the environment. Join the movement and turn your recycling actions into real benefits!</p>
              <div className="reverse-cards">
                <div className="reverse-card">
                  <img src="/assets/images/logo.png" alt="Reverse Logo" className="reverse-card-icon" />
                  <h3>How does it work?</h3>
                  <ul>
                    <li>Find a Reverse recycling point near you.</li>
                    <li>Scan the QR code with your phone.</li>
                    <li>Drop your recyclable products.</li>
                    <li>Earn points and unlock exclusive rewards.</li>
                  </ul>
                </div>
                <div className="reverse-card">
                  <img src="/assets/images/reward card.png" alt="Rewards" className="reverse-card-icon" />
                  <h3>Why use Reverse?</h3>
                  <ul>
                    <li>Get rewarded for every item you recycle.</li>
                    <li>Track your impact and progress.</li>
                    <li>Access exclusive offers and products.</li>
                    <li>Be part of a sustainable community.</li>
                  </ul>
                </div>
                <div className="reverse-card">
                  <img src="/assets/images/recyclee.svg" alt="Sustainability" className="reverse-card-icon" />
                  <h3>Our Mission</h3>
                  <ul>
                    <li>Promote responsible recycling habits.</li>
                    <li>Reduce waste and carbon footprint.</li>
                    <li>Empower users to make a difference.</li>
                  </ul>
                </div>
              </div>
              <div className="reverse-video-demo">
                <h3>See Reverse in action</h3>
                <video src="/assets/images/videoad.mp4" controls style={{ width: '100%', borderRadius: '12px', background: '#232323' }} poster="/assets/images/logo.png" />
              </div>
              <div style={{ margin: '2.5rem 0', textAlign: 'center' }}>
                <button className="shop-btn" style={{ background: '#00C37A', color: '#232323', fontWeight: 700 }} onClick={handleGenerateQR}>Generate QR</button>
                {showQR && (
                  <div style={{ marginTop: '2rem' }}>
                    <h3>Scan this QR code to get your voucher</h3>
                    <QRCodeSVG value={qrValue} size={180} bgColor="#fff" fgColor="#00C37A" includeMargin={true} />
                    <div style={{ marginTop: '1.5rem' }}>
                      <button className="shop-btn" style={{ background: '#F5B301', color: '#232323', fontWeight: 700 }} onClick={() => setShowScanner(true)}>Scan QR</button>
                    </div>
                  </div>
                )}
                {showScanner && (
                  <div style={{ marginTop: '2rem', background: '#232323', borderRadius: 12, padding: 20 }}>
                    <h3>Scan QR Code</h3>
                    <QrReader
                      constraints={{ facingMode: 'environment' }}
                      onResult={handleScanQR}
                      style={{ width: '100%' }}
                    />
                    <button className="shop-btn" style={{ marginTop: 16 }} onClick={() => setShowScanner(false)}>Close Scanner</button>
                  </div>
                )}
                {voucher && (
                  <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                    <div id="voucher-card" style={{ background: '#fff', color: '#232323', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', textAlign: 'center', position: 'relative' }}>
                      <img src="/assets/images/logo.png" alt="Reverse Logo" style={{ height: 40, marginBottom: 8 }} />
                      <img src="/assets/images/nike-swoosh.png" alt="Nike Logo" style={{ height: 32, marginBottom: 16, marginLeft: 12 }} />
                      <h2 style={{ color: '#00C37A', margin: '1rem 0 0.5rem 0' }}>Discount Voucher</h2>
                      <div style={{ fontSize: 32, fontWeight: 900, color: '#F5B301', margin: '1rem 0' }}>€{voucher.value}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Code: <span style={{ color: '#00C37A' }}>{voucher.code}</span></div>
                      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Issued: {new Date(voucher.date).toLocaleString()}</div>
                      {voucher.locationName && <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Location: {voucher.locationName}</div>}
                      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Valid at any Reverse x Nike location</div>
                      <div style={{ fontSize: 12, color: '#bbb', marginTop: 12 }}>Show this voucher at checkout to redeem your discount.</div>
                    </div>
                    <button className="shop-btn" style={{ background: '#00C37A', color: '#232323', fontWeight: 700, marginLeft: 24, height: 56, alignSelf: 'center' }} onClick={() => handleDownloadVoucherById(voucher.code)}>Download Voucher</button>
                  </div>
                )}
                {voucherHistory.length > 0 && (
                  <div style={{ margin: '3rem 0 0 0' }}>
                    <h3 style={{ color: '#F5B301', textAlign: 'center', marginBottom: 24 }}>Your Vouchers</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                      {voucherHistory.map((v, idx) => (
                        <div key={v.code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <VoucherCard voucher={v} />
                          <button className="shop-btn" style={{ background: '#00C37A', color: '#232323', fontWeight: 700, marginTop: 16 }} onClick={() => handleDownloadVoucherById(v.code)}>Download Voucher</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {currentReversePage === 'rewards' && (
            <div className="reverse-page reverse-rewards">
              <h2>Rewards Catalog</h2>
              <div className="rewards-user-info">
                <img src="/assets/images/profile-active.svg" alt="User" className="rewards-user-avatar" />
                <div>
                  <h3>Your Points</h3>
                  <div className="rewards-user-points">320 pts</div>
                  <div className="rewards-progress-bar">
                    <div className="rewards-progress" style={{ width: '64%' }}></div>
                  </div>
                  <span className="rewards-progress-label">64% to next reward</span>
                </div>
              </div>
              <div className="rewards-catalog">
                <div className="reward-card">
                  <img src="/assets/images/reward card.png" alt="Gift Card" className="reward-card-img" />
                  <h4>Gift Card $10</h4>
                  <div className="reward-points">500 pts</div>
                  <button className="reward-redeem-btn" disabled>Redeem</button>
                </div>
                <div className="reward-card">
                  <img src="/assets/images/£40 voucher.svg" alt="Voucher" className="reward-card-img" />
                  <h4>£40 Voucher</h4>
                  <div className="reward-points">1200 pts</div>
                  <button className="reward-redeem-btn" disabled>Redeem</button>
                </div>
                <div className="reward-card">
                  <img src="/assets/images/Untitled design (6) 2.png" alt="Nike T-shirt" className="reward-card-img" />
                  <h4>Nike T-shirt</h4>
                  <div className="reward-points">800 pts</div>
                  <button className="reward-redeem-btn" disabled>Redeem</button>
                </div>
              </div>
              <div className="rewards-history">
                <h3>Redemption History</h3>
                <ul>
                  <li>Gift Card $10 - 500 pts - 2024-06-01</li>
                  <li>Nike T-shirt - 800 pts - 2024-05-15</li>
                </ul>
              </div>
            </div>
          )}
          {currentReversePage === 'maps' && (
            <div className="reverse-page">
              <ReverseMap voucherHistory={voucherHistory} onDownloadVoucher={handleDownloadVoucherById} />
            </div>
          )}
        </main>
      </div>
    )
  }

  // If the user is authenticated, show the Reverse dashboard
  if (isAuthenticated) {
    return renderReverseDashboard()
  }

  return (
    <div className="App">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-links">
          <a href="#">Find a Store</a>
          <a href="#">Help</a>
          <a href="#">Join Us</a>
          <a href="#">Sign In</a>
        </div>
      </div>
      {/* Header */}
      <header className="nike-header">
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/assets/images/nike-swoosh.png" alt="Nike Swoosh Logo" />
          </a>
          <nav className="main-nav">
            <ul>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Jordan</a></li>
            </ul>
          </nav>
          <div className="header-icons">
            <span role="button" aria-label="reverse" onClick={() => setShowReverse(true)} className="reverse-link" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <img src="/assets/images/logo.png" alt="Reverse Logo" className="reverse-nav-logo" />
              <span style={{ fontWeight: 600, fontSize: 16 }}>Reverse</span>
            </span>
            <span role="img" aria-label="favorites">❤️</span>
            <span role="img" aria-label="cart">🛒</span>
          </div>
        </div>
      </header>

      {/* Hero Section (Swiper Carousel) */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="hero-swiper"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="hero-slide">
                {slide.type === 'video' ? (
                  <video
                    src={slide.src}
                    className="hero-media"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    poster="/assets/images/hero-bg.jpg"
                  />
                ) : (
                  <img src={slide.src} className="hero-media" alt={slide.headline} />
                )}
                <div className="hero-overlay">
                  <h1>{slide.headline}</h1>
                  <p>{slide.subtext}</p>
                  <a href={slide.link} className="hero-btn">{slide.cta}</a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid large-images">
          {featuredProducts.map((product, idx) => (
            <div
              className={`product-card large-card${product.isReverse ? ' reverse-card-balance' : ''}`}
              key={idx}
              onClick={product.isReverse ? () => setShowReverse(true) : undefined}
              style={product.isReverse ? { cursor: 'pointer', border: '2px solid #00C37A' } : {}}
            >
              {product.isReverse ? (
                <img src="/assets/images/logo.png" alt={product.name} className="reverse-featured-logo" />
              ) : (
                <img src={product.img} alt={product.name} />
              )}
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              {product.isReverse && (
                <button className="shop-btn" style={{ background: '#00C37A', color: '#232323', marginTop: '1rem' }}>Discover Reverse</button>
              )}
              {!product.isReverse && (
                <a href={product.link} className="shop-btn">Shop Now</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Membership Banner */}
      <section className="membership-banner">
        <p>Become a Nike Member for exclusive products, offers and events. <a href="#">Join Us</a></p>
      </section>

      {/* Trending Collections */}
      <section className="trending-section">
        <h2>Trending Collections</h2>
        <div className="trending-grid large-images">
          {trendingCollections.map((col, idx) => (
            <div className="trending-card large-card" key={idx}>
              <img src={col.img} alt={col.name} />
              <h3>{col.name}</h3>
              <a href={col.link} className="shop-btn">Explore</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Get Help</h4>
            <ul>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Nike</h4>
            <ul>
              <li><a href="#">News</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="https://twitter.com/nike" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://facebook.com/nike" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/nike" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nike, Inc. All rights reserved.</span>
        </div>
      </footer>

      {showReverse && (
        <div className="reverse-modal">
          <div className="reverse-content">
            <img src="/assets/images/logo.png" alt="Reverse Logo" className="reverse-logo" />
            <video src="/assets/images/videoad.mp4" controls className="reverse-video" />
            <h2>Welcome to Reverse</h2>
            <p>Discover the new way to recycle, earn rewards, and be part of the change. Join Reverse now!</p>
            <div className="reverse-auth-tabs">
              <button 
                className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => handleAuthModeChange('login')}
              >
                Login
              </button>
              <button 
                className={`auth-tab ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => handleAuthModeChange('register')}
              >
                Register
              </button>
            </div>
            <form className="reverse-login" style={{display: authMode === 'login' ? 'flex' : 'none'}} onSubmit={handleLogin}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <form className="reverse-register" style={{display: authMode === 'register' ? 'flex' : 'none'}} onSubmit={handleRegister}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit" className="auth-btn">Register</button>
            </form>
            <button className="close-btn" onClick={() => setShowReverse(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

function VoucherCard({ voucher, showLogos = true }) {
  return (
    <div id={`voucher-card-${voucher.code}`} style={{ background: '#fff', color: '#232323', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 2px 12px rgba(0,0,0,0.12)', textAlign: 'center', position: 'relative', margin: '0 auto' }}>
      {showLogos && <img src="/assets/images/logo.png" alt="Reverse Logo" style={{ height: 40, marginBottom: 8 }} />}
      {showLogos && <img src="/assets/images/nike-swoosh.png" alt="Nike Logo" style={{ height: 32, marginBottom: 16, marginLeft: 12 }} />}
      <h2 style={{ color: '#00C37A', margin: '1rem 0 0.5rem 0' }}>Discount Voucher</h2>
      <div style={{ fontSize: 32, fontWeight: 900, color: '#F5B301', margin: '1rem 0' }}>€{voucher.value}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Code: <span style={{ color: '#00C37A' }}>{voucher.code}</span></div>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Issued: {new Date(voucher.date).toLocaleString()}</div>
      {voucher.locationName && <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Location: {voucher.locationName}</div>}
      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Valid at any Reverse x Nike location</div>
      <div style={{ fontSize: 12, color: '#bbb', marginTop: 12 }}>Show this voucher at checkout to redeem your discount.</div>
    </div>
  );
}

export default App 