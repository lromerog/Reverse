import React, { useState } from 'react'
import './App.css'
import './index.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
    src: '/assets/images/hero-bg.jpg',
    headline: 'Best Sellers',
    subtext: 'Shop the most popular Nike products.',
    cta: 'Shop Bestsellers',
    link: '#',
  },
]

const featuredProducts = [
  {
    name: 'Nike Air Max',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(3).jpg',
    desc: 'Legendary comfort and style.',
    link: '#',
  },
  {
    name: 'Nike Air Force 1',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(8).png',
    desc: 'The icon lives on.',
    link: '#',
  },
  {
    name: 'Nike React',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(2).jpg',
    desc: 'Innovation for every day.',
    link: '#',
  },
  {
    name: 'Nike Pegasus',
    img: '/Nuevo/Nike. Just Do It. Nike BE_files/nike-just-do-it(1).jpg',
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

function App() {
  const [showReverse, setShowReverse] = useState(false)

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
              <li>
                <a href="#" onClick={() => setShowReverse(true)} style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                  <img src="/assets/images/logo.png" alt="Reverse Logo" style={{height:'22px',verticalAlign:'middle'}} />
                  Reverse
                </a>
              </li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Jordan</a></li>
            </ul>
          </nav>
          <div className="header-icons">
            <span role="img" aria-label="search">🔍</span>
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
            <div className="product-card large-card" key={idx}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <a href={product.link} className="shop-btn">Shop Now</a>
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
            <img src="/assets/images/logo.png" alt="Reverse Logo" className="reverse-logo" style={{marginBottom:'1rem'}} />
            <form className="reverse-login">
              <input type="text" placeholder="Username" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
            <button className="close-btn" onClick={() => setShowReverse(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App 