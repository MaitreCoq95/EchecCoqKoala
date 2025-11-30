import { BoardState, Move, PieceColor, PieceType, Position } from './types';

export const INITIAL_BOARD: BoardState = createInitialBoard();

function createInitialBoard(): BoardState {
  const board: BoardState = Array(8).fill(null).map(() => Array(8).fill(null));

  const setupRow = (row: number, color: PieceColor) => {
    const pieces: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    pieces.forEach((type, col) => {
      board[row][col] = { type, color, id: `${color}-${type}-${col}`, hasMoved: false };
    });
  };

  const setupPawns = (row: number, color: PieceColor) => {
    for (let col = 0; col < 8; col++) {
      board[row][col] = { type: 'pawn', color, id: `${color}-pawn-${col}`, hasMoved: false };
    }
  };

  setupRow(0, 'black'); // Papa
  setupPawns(1, 'black');
  setupPawns(6, 'white'); // Naomy
  setupRow(7, 'white');

  return board;
}

export function getLegalMoves(board: BoardState, pos: Position): Position[] {
  const piece = board[pos.row][pos.col];
  if (!piece) return [];

  const moves: Position[] = [];
  const { type, color } = piece;
  const direction = color === 'white' ? -1 : 1;

  // Helper to check if a position is on the board
  const isValidPos = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  // Helper to add move if empty or enemy
  const tryAddMove = (r: number, c: number): boolean => {
    if (!isValidPos(r, c)) return false;
    const target = board[r][c];
    if (!target) {
      moves.push({ row: r, col: c });
      return true; // Continue sliding
    } else if (target.color !== color) {
      moves.push({ row: r, col: c });
      return false; // Stop sliding (capture)
    }
    return false; // Stop sliding (blocked by friendly)
  };

  if (type === 'pawn') {
    // Forward 1
    if (isValidPos(pos.row + direction, pos.col) && !board[pos.row + direction][pos.col]) {
      moves.push({ row: pos.row + direction, col: pos.col });
      // Forward 2 (initial)
      if (!piece.hasMoved && isValidPos(pos.row + direction * 2, pos.col) && !board[pos.row + direction * 2][pos.col]) {
        moves.push({ row: pos.row + direction * 2, col: pos.col });
      }
    }
    // Captures
    const captureOffsets = [-1, 1];
    captureOffsets.forEach(offset => {
      const r = pos.row + direction;
      const c = pos.col + offset;
      if (isValidPos(r, c)) {
        const target = board[r][c];
        if (target && target.color !== color) {
          moves.push({ row: r, col: c });
        }
      }
    });
  } else if (type === 'knight') {
    const offsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    offsets.forEach(([dr, dc]) => tryAddMove(pos.row + dr, pos.col + dc));
  } else if (type === 'king') {
    const offsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    offsets.forEach(([dr, dc]) => tryAddMove(pos.row + dr, pos.col + dc));
  } else {
    // Sliding pieces (Rook, Bishop, Queen)
    const directions = [];
    if (type === 'rook' || type === 'queen') {
      directions.push([-1, 0], [1, 0], [0, -1], [0, 1]);
    }
    if (type === 'bishop' || type === 'queen') {
      directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
    }

    directions.forEach(([dr, dc]) => {
      let r = pos.row + dr;
      let c = pos.col + dc;
      while (tryAddMove(r, c)) {
        if (board[r][c]) break; // Should not happen due to tryAddMove logic but for safety
        r += dr;
        c += dc;
      }
    });
  }

  return moves;
}

export function makeMove(board: BoardState, move: Move): BoardState {
  const newBoard = board.map(row => [...row]);
  const { from, to } = move;
  
  const piece = newBoard[from.row][from.col];
  if (!piece) return newBoard;

  // Handle capture (implicitly handled by overwriting)
  
  // Move piece
  newBoard[to.row][to.col] = { ...piece, hasMoved: true };
  newBoard[from.row][from.col] = null;

  // Promotion (simplified: always Queen)
  if (piece.type === 'pawn') {
    if ((piece.color === 'white' && to.row === 0) || (piece.color === 'black' && to.row === 7)) {
      newBoard[to.row][to.col] = { ...piece, type: 'queen', hasMoved: true };
    }
  }

  return newBoard;
}

export function isCheck(board: BoardState, player: PieceColor): boolean {
  // Find King
  let kingPos: Position | null = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === 'king' && p.color === player) {
        kingPos = { row: r, col: c };
        break;
      }
    }
    if (kingPos) break;
  }

  if (!kingPos) return false; // Should not happen

  // Check if any enemy piece can attack King
  const enemyColor = player === 'white' ? 'black' : 'white';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === enemyColor) {
        const moves = getLegalMoves(board, { row: r, col: c });
        if (moves.some(m => m.row === kingPos!.row && m.col === kingPos!.col)) {
          return true;
        }
      }
    }
  }

  return false;
}
