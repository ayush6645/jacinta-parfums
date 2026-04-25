'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      const layers = [
        { layer: "1", yPercent: 40 },
        { layer: "2", yPercent: 30 },
        { layer: "3", yPercent: 15 },
        { layer: "4", yPercent: 5 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax overflow-hidden bg-black py-40" ref={parallaxRef}>
      <style>
        {`
          .parallax__header {
            position: relative;
            height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .parallax__visuals {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .parallax__layers {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .parallax__layer-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 120%;
            object-fit: cover;
            filter: brightness(0.6) contrast(1.1);
          }
          .parallax__layer-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            text-align: center;
            width: 100%;
          }
          .parallax__title {
            font-family: serif;
            font-style: italic;
            font-size: clamp(4rem, 15vw, 12rem);
            color: #C9A14A;
            line-height: 0.8;
            text-transform: uppercase;
            letter-spacing: -0.05em;
            text-shadow: 0 0 40px rgba(0,0,0,0.5);
          }
          .parallax__subtitle {
            color: white;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5em;
            margin-top: 2rem;
            opacity: 0.6;
          }
          .parallax__fade-bottom {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(to top, black, transparent);
            z-index: 5;
          }
          .parallax__fade-top {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(to bottom, black, transparent);
            z-index: 5;
          }
        `}
      </style>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__fade-top"></div>
          <div data-parallax-layers className="parallax__layers">
            {/* Background Layer: Summer Ice themed background */}
            <img src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" loading="eager" data-parallax-layer="1" alt="" className="parallax__layer-img opacity-40 scale-110" />
            
            {/* Mid Layer: Noir Libre themed background */}
            <img src="/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg" loading="eager" data-parallax-layer="2" alt="" className="parallax__layer-img mix-blend-multiply opacity-50" />
            
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">JACINTA</h2>
              <p className="parallax__subtitle">The Art of Olfaction</p>
            </div>
            
            {/* Foreground Layer: Elegant Texture */}
            <img src="https://images.unsplash.com/photo-1550686041-366ad85a1355?q=80&w=2000&auto=format&fit=crop" loading="eager" data-parallax-layer="4" alt="" className="parallax__layer-img mix-blend-overlay opacity-30" />
          </div>
          <div className="parallax__fade-bottom"></div>
        </div>
      </section>
    </div>
  );
}
