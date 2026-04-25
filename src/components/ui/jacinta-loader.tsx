'use client';

import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface JacintaLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
}

export const JacintaLoader: React.FC<JacintaLoaderProps> = ({ 
  className, 
  color = "#C9A14A", 
  size = 200,
  ...props 
}) => {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="perfume-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="relative w-full h-full" style={{ filter: "url(#perfume-goo)" }}>
        <style>
          {`
            @keyframes drop-flow {
              0%, 100% { transform: translate(0, 0) scale(1); }
              25% { transform: translate(15%, 15%) scale(1.1); }
              50% { transform: translate(-10%, 25%) scale(0.9); }
              75% { transform: translate(-20%, -10%) scale(1.2); }
            }
            .drop {
              position: absolute;
              border-radius: 50%;
              background: ${color};
              opacity: 0.8;
              box-shadow: inset -5px -5px 15px rgba(0,0,0,0.3), 0 0 20px ${color}44;
            }
          `}
        </style>
        <div className="drop w-24 h-24 top-1/4 left-1/4 animate-[drop-flow_8s_infinite_ease-in-out]" />
        <div className="drop w-16 h-16 top-1/2 left-1/2 animate-[drop-flow_6s_infinite_ease-in-out_1s]" />
        <div className="drop w-20 h-20 bottom-1/4 right-1/4 animate-[drop-flow_7s_infinite_ease-in-out_2s]" />
      </div>
      
      <div className="absolute z-20 text-center pointer-events-none">
        <span className="text-[12px] md:text-sm tracking-[0.8em] uppercase text-luxury-white font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Jacinta
        </span>
      </div>
    </div>
  );
};
