'use client';

import { Piece, Position } from '@/lib/types';
import { ChessPiece } from './ChessPiece';
import { useGameStore } from '@/lib/store';
import { clsx } from 'clsx';

interface ChessSquareProps {
  position: Position;
  piece: Piece | null;
  isSelected: boolean;
  isValidMove: boolean;
  isLastMove: boolean;
  onClick: () => void;
  playerTheme: 'naomy' | 'papa';
}

export const ChessSquare = ({
  position,
  piece,
  isSelected,
  isValidMove,
  onClick,
}: ChessSquareProps) => {
  const { frozenPieces, shieldedPieces } = useGameStore();
  const isFrozen = piece && frozenPieces[piece.id];
  const isShielded = piece && shieldedPieces[piece.id];

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full h-full flex items-center justify-center relative transition-all duration-200',
        'cursor-pointer hover:bg-white/10',
        {
          'ring-4 ring-inset ring-yellow-400 z-10 bg-yellow-400/20': isSelected,
          'ring-4 ring-inset ring-green-400/50 bg-green-400/10': isValidMove && !piece,
          'ring-4 ring-inset ring-red-400/50 bg-red-400/10': isValidMove && piece,
          'ring-4 ring-cyan-400 bg-cyan-100/30': isFrozen,
          'ring-4 ring-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)] bg-yellow-400/20': isShielded
        }
      )}
    >
      {/* Valid move indicator dot for empty squares */}
      {isValidMove && !piece && (
        <div className="absolute w-4 h-4 rounded-full bg-green-400/60 shadow-lg" />
      )}
      
      {/* Capture indicator ring for occupied squares */}
      {isValidMove && piece && (
        <div className="absolute w-full h-full rounded-full border-4 border-red-400/50 animate-pulse" />
      )}

      {piece && <ChessPiece piece={piece} isShielded={!!isShielded} isFrozen={!!isFrozen} />}
      
      {/* Coordinates */}
      {position.col === 0 && (
        <span className="absolute left-0.5 top-0.5 text-[10px] font-bold text-white/60">
          {8 - position.row}
        </span>
      )}
      {position.row === 7 && (
        <span className="absolute right-0.5 bottom-0 text-[10px] font-bold text-white/60">
          {String.fromCharCode(97 + position.col)}
        </span>
      )}
    </div>
  );
};
