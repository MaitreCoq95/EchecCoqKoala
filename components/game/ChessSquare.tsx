import { Piece, Position } from '@/lib/types';
import { ChessPiece } from './ChessPiece';
import { clsx } from 'clsx';
import { THEME_NAOMY, THEME_PAPA } from '@/lib/themes';

interface ChessSquareProps {
  position: Position;
  piece: Piece | null;
  isSelected: boolean;
  isValidMove: boolean;
  isLastMove: boolean;
  onClick: () => void;
  playerTheme: 'naomy' | 'papa'; // The theme of the current player viewing the board
}

export const ChessSquare = ({
  position,
  piece,
  isSelected,
  isValidMove,
  onClick,
  playerTheme,
}: ChessSquareProps) => {
  const isLight = (position.row + position.col) % 2 === 0;
  
  // Determine base color based on player theme preference (or just standard board colors)
  // Here we use the player's theme to color the board slightly differently
  const theme = playerTheme === 'naomy' ? THEME_NAOMY : THEME_PAPA;
  
  const baseColor = isLight ? theme.colors.boardLight : theme.colors.boardDark;

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full h-full flex items-center justify-center relative transition-colors duration-200',
        'cursor-pointer',
        {
          'ring-4 ring-inset ring-yellow-400 z-10': isSelected,
          'ring-4 ring-inset ring-green-400/50': isValidMove && !piece, // Empty valid move
          'ring-4 ring-inset ring-red-400/50': isValidMove && piece, // Capture move
        }
      )}
      style={{ backgroundColor: baseColor }}
    >
      {/* Valid move indicator dot for empty squares */}
      {isValidMove && !piece && (
        <div className="absolute w-4 h-4 rounded-full bg-green-400/50" />
      )}
      
      {/* Capture indicator ring for occupied squares */}
      {isValidMove && piece && (
        <div className="absolute w-full h-full rounded-full border-4 border-red-400/50 animate-pulse" />
      )}

      {piece && <ChessPiece piece={piece} />}
      
      {/* Coordinates (optional, for debugging or learning) */}
      {position.col === 0 && (
        <span className={clsx("absolute left-0.5 top-0.5 text-[10px] font-bold opacity-50", isLight ? "text-slate-600" : "text-white")}>
          {8 - position.row}
        </span>
      )}
      {position.row === 7 && (
        <span className={clsx("absolute right-0.5 bottom-0 text-[10px] font-bold opacity-50", isLight ? "text-slate-600" : "text-white")}>
          {String.fromCharCode(97 + position.col)}
        </span>
      )}
    </div>
  );
};
