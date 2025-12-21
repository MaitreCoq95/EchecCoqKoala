'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Piece } from '@/lib/types';
import { getPieceImagePath } from '@/lib/pieces';

interface ChessPieceProps {
  piece: Piece;
  isShielded?: boolean;
  isFrozen?: boolean;
  isPoweredUp?: boolean;
}

export const ChessPiece = ({ piece, isShielded, isFrozen, isPoweredUp }: ChessPieceProps) => {
  const isNaomy = piece.color === 'white';
  const imagePath = getPieceImagePath(piece.color, piece.type);
  
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        filter: isFrozen ? 'brightness(0.7) saturate(0.5)' : 'none'
      }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`
        w-[70%] h-[70%] relative
        cursor-pointer transition-all duration-200
        ${isFrozen ? 'opacity-60' : ''}
      `}
    >
      {/* Glow effect background */}
      <div className={`
        absolute inset-0 rounded-full opacity-30 blur-md transition-all
        ${isNaomy ? 'bg-naomy-primary' : 'bg-papa-primary'}
        ${isPoweredUp ? 'animate-pulse scale-125' : ''}
      `} />
      
      {/* Shield effect */}
      {isShielded && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          className="absolute inset-0 flex items-center justify-center text-3xl z-30"
        >
          <span className="animate-pulse">🌈</span>
        </motion.div>
      )}
      
      {/* Frozen effect */}
      {isFrozen && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          className="absolute inset-0 flex items-center justify-center text-2xl z-30"
        >
          <span className="animate-bounce">❄️</span>
        </motion.div>
      )}
      
      {/* Piece Image - using 70% of square size with object-contain */}
      <Image
        src={imagePath}
        alt={`${piece.color} ${piece.type}`}
        fill
        className="object-contain drop-shadow-lg"
        sizes="100px"
        priority
      />
      
      {/* Highlight ring for selection feedback */}
      <div className={`
        absolute inset-0 rounded-full border-2 border-transparent
        group-hover:border-white/50 transition-colors
      `} />
    </motion.div>
  );
};
