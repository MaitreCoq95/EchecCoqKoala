import { useGameStore } from '@/lib/store';
import { ChessSquare } from './ChessSquare';
import { useEffect } from 'react';
import { Player } from '@/lib/types';

interface ChessBoardProps {
  playerView: Player; // 'naomy' or 'papa' - determines orientation
}

export const ChessBoard = ({ playerView }: ChessBoardProps) => {
  const { board, selectedSquare, validMoves, selectSquare, movePiece, initGame } = useGameStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleSquareClick = (row: number, col: number) => {
    // If clicking a valid move, execute it
    if (validMoves.some(m => m.row === row && m.col === col)) {
      movePiece({ row, col });
    } else {
      // Otherwise select (or deselect)
      selectSquare({ row, col });
    }
  };

  // If playerView is Papa (Black), we might want to rotate the board?
  // For local multiplayer, usually White is at bottom. 
  // If we want "hotseat" where board rotates, we can reverse rows based on turn.
  // For now, let's keep White at bottom as standard, or rotate based on prop.
  
  // Let's render standard (White at bottom) for now, 
  // but if playerView is 'papa', we could rotate. 
  // Given it's a shared screen, maybe just keep it fixed or add a "Rotate Board" button.
  // The prompt says "Responsive (tablette + PC) ... Jouable à deux ... même partie".
  // Let's stick to fixed orientation for MVP unless requested.
  
  return (
    <div className="w-full max-w-[600px] aspect-square grid grid-cols-8 border-8 border-slate-800 rounded-lg overflow-hidden shadow-2xl bg-slate-800">
      {board.map((row, r) => (
        row.map((piece, c) => (
          <ChessSquare
            key={`${r}-${c}`}
            position={{ row: r, col: c }}
            piece={piece}
            isSelected={selectedSquare?.row === r && selectedSquare?.col === c}
            isValidMove={validMoves.some(m => m.row === r && m.col === c)}
            isLastMove={false} // TODO: Track last move
            onClick={() => handleSquareClick(r, c)}
            playerTheme={playerView}
          />
        ))
      ))}
    </div>
  );
};
