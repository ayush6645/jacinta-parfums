import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              "relative w-full max-w-lg bg-luxury-black border border-gold/20 p-8 md:p-12 shadow-[0_0_50px_rgba(201,161,74,0.1)] z-10",
              className
            )}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-luxury-white/40 hover:text-gold transition-colors no-flow"
            >
              <X size={20} />
            </button>
            
            <div className="mb-8">
              <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-2 block font-bold italic">The Atelier</span>
              <h2 className="text-3xl font-serif italic">{title}</h2>
            </div>
            
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
