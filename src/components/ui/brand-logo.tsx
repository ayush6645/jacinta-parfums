import React from 'react';
import { cn } from '@/src/lib/utils';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className, 
  size = 'md',
  color = 'currentColor'
}) => {
  const sizeClasses = {
    sm: 'text-sm tracking-[0.3em]',
    md: 'text-xl md:text-2xl tracking-[0.4em]',
    lg: 'text-4xl md:text-5xl tracking-[0.5em]',
    xl: 'text-6xl md:text-8xl tracking-[0.6em]'
  };

  return (
    <div className={cn(
      "font-sans font-light flex items-start select-none", 
      sizeClasses[size], 
      className
    )} style={{ color }}>
      <span className="flex items-center">
        JΛCINTΛ
        <span className="text-[0.4em] translate-y-[-0.5em] ml-1 font-bold">TM</span>
      </span>
    </div>
  );
};
