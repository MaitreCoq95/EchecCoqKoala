import { Piece } from '@/lib/types';
import { THEME_NAOMY, THEME_PAPA } from '@/lib/themes';
import { motion } from 'framer-motion';

interface ChessPieceProps {
  piece: Piece;
}

export const ChessPiece = ({ piece }: ChessPieceProps) => {
  const theme = piece.color === 'white' ? THEME_NAOMY : THEME_PAPA;
  const pieceInfo = theme.pieces[piece.type];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-full h-full flex items-center justify-center text-4xl md:text-5xl select-none cursor-pointer hover:scale-110 transition-transform"
      style={{
        filter: piece.color === 'white' 
          ? 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.5))' 
          : 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))'
      }}
    >
      {pieceInfo.icon}
    </motion.div>
  );
};
