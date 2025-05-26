"use client";

import { useState } from 'react';
import Link from 'next/link';

const slides = [
  { type: 'video', src: '/Products/nike-hero.mp4' },
  { type: 'image', src: '/Products/Mbappe.png', alt: 'Kylian Mbappé for Nike' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative w-full h-screen bg-black">
      <div className="absolute inset-0">
        {slides[current].type === 'video' ? (
          <video
            src={slides[current].src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <img
            src={slides[current].src}
            alt={slides[current].alt}
            className="w-full h-full object-cover opacity-90"
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="text-white max-w-xl">
          <h1 className="text-6xl font-bold mb-4 tracking-tight"> NIKE AIR MAX 2025 </h1>
          <p className="text-xl mb-8 text-gray-200"> Discover new freedom. Designed for movement, built for comfort. </p>
          <div className="flex gap-4">
            <Link
              href="/shop/air-max-2025"
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/air-max-2025/details"
              className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              View Details
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-gray-300">Also available in:</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white" />
              <button className="w-8 h-8 rounded-full bg-red-500" />
              <button className="w-8 h-8 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 