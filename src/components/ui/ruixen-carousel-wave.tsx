'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { products } from '@/src/data/products';

interface RuixenCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  badge?: {
    text: string;
    variant: 'gold' | 'luxury';
  };
  href?: string;
  id?: string;
}

const cards: RuixenCardProps[] = products.map(p => ({
  id: p.id,
  title: p.name,
  subtitle: p.description.substring(0, 40) + '...',
  image: p.image,
  badge: { text: p.category, variant: 'gold' },
  href: `/product/${p.id}`,
}));

export default function RuixenCarouselWave() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const shift = useCallback((direction: 'next' | 'prev') => {
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(nextIndex);
  }, [currentIndex]);

  // Auto-play logic
  useEffect(() => {
    autoPlayTimer.current = setInterval(() => {
      shift('next');
    }, 4000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [shift]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      let position = i - currentIndex;
      if (position < -Math.floor(cards.length / 2)) {
        position += cards.length;
      } else if (position > Math.floor(cards.length / 2)) {
        position -= cards.length;
      }

      const x = position * 280; // Adjusted for better mobile fit
      const y = position === 0 ? 0 : 20;
      const scale = position === 0 ? 1.05 : 0.85;
      const opacity = position === 0 ? 1 : 0.4;
      const zIndex = position === 0 ? 50 : 10 - Math.abs(position);

      if (Math.abs(position) > 2) {
        gsap.set(card, { x, y, scale, opacity, zIndex });
      } else {
        gsap.to(card, {
          x,
          y,
          scale,
          opacity,
          zIndex,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });
  }, [currentIndex]);

  return (
    <div className="h-full w-full relative px-4 py-8 overflow-hidden flex flex-col items-center">
      <div className="relative flex items-center justify-center h-[450px] w-full max-w-4xl">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute transition-all"
            style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
          >
            <div className="flex flex-col group">
              <Link
                to={card.href ?? '#'}
                className="relative block overflow-hidden rounded-[2rem] shadow-2xl border border-gold/10 bg-luxury-dark/40 backdrop-blur-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-[320px] w-[240px] md:h-[400px] md:w-[300px]">
                  <img
                    src={card.image ?? ''}
                    alt={card.title ?? ''}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-1 text-[8px] font-bold tracking-[0.3em] uppercase bg-gold/90 text-black shadow-lg rounded-full">
                      {card.badge.text}
                    </div>
                  </div>
                )}

                {/* Text Overlay */}
                <div className="absolute bottom-6 left-6 right-6 transform transition-all duration-500 bg-luxury-black/60 backdrop-blur-md rounded-2xl p-5 border border-gold/10 shadow-luxury">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-serif italic text-luxury-white">
                      {card.title}
                    </h3>
                    <p className="text-[10px] text-luxury-white/40 leading-snug tracking-wide uppercase">
                      {card.subtitle}
                    </p>
                    <div className="flex justify-end mt-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 border border-gold/20 text-gold transition-all duration-300 hover:bg-gold hover:text-black">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex gap-4 z-50">
        <button
          onClick={() => {
            if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
            shift('prev');
          }}
          className="p-4 rounded-full border border-gold/20 bg-luxury-black/40 backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
            shift('next');
          }}
          className="p-4 rounded-full border border-gold/20 bg-luxury-black/40 backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
