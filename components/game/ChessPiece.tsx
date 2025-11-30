'use client';

import { motion } from 'framer-motion';
import { Piece } from '@/lib/types';
import { Crown, Sparkles, Shield, Castle, Heart, Zap, Rabbit, Sword, Hexagon, Flower } from 'lucide-react';

interface ChessPieceProps {
  piece: Piece;
}

export const ChessPiece = ({ piece }: ChessPieceProps) => {
  const isNaomy = piece.color === 'naomy';
  
  const getIcon = () => {
    if (isNaomy) {
      switch (piece.type) {
        case 'king': return <Crown className="w-full h-full text-naomy-primary drop-shadow-md" />;
        case 'queen': return <Sparkles className="w-full h-full text-naomy-secondary drop-shadow-md" />;
        case 'rook': return <Castle className="w-full h-full text-naomy-primary drop-shadow-md" />;
        case 'bishop': return <Heart className="w-full h-full text-naomy-secondary drop-shadow-md" />;
        case 'knight': return <Rabbit className="w-full h-full text-naomy-primary drop-shadow-md" />;
        case 'pawn': return <Flower className="w-full h-full text-naomy-secondary drop-shadow-md" />;
      }
    } else {
      switch (piece.type) {
        case 'king': return <Crown className="w-full h-full text-papa-primary drop-shadow-md" />;
        case 'queen': return <Shield className="w-full h-full text-papa-secondary drop-shadow-md" />;
        case 'rook': return <Castle className="w-full h-full text-papa-primary drop-shadow-md" />;
        case 'bishop': return <Zap className="w-full h-full text-papa-secondary drop-shadow-md" />;
        case 'knight': return <Sword className="w-full h-full text-papa-primary drop-shadow-md" />;
        case 'pawn': return <Hexagon className="w-full h-full text-papa-secondary drop-shadow-md" />;
      }
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-4/5 h-4/5 flex items-center justify-center relative z-10"
    >
      {/* Glass effect background */}
      <div className={`absolute inset-0 rounded-full opacity-20 blur-sm ${isNaomy ? 'bg-naomy-primary' : 'bg-papa-primary'}`} />
      {getIcon()}
    </motion.div>
  );
};
