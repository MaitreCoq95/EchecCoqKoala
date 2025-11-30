import { create } from 'zustand';
import { BoardState, GameState, Move, Player, Position } from './types';
import { INITIAL_BOARD, getLegalMoves, makeMove, isCheck } from './chessEngine';

interface GameStore extends GameState {
  initGame: () => void;
  selectSquare: (pos: Position) => void;
  movePiece: (to: Position) => void;
  setWinner: (winner: Player) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  board: INITIAL_BOARD,
  turn: 'naomy', // White starts
  selectedSquare: null,
  validMoves: [],
  capturedByNaomy: [],
  capturedByPapa: [],
  isCheck: false,
  isCheckmate: false,
  winner: null,
  energyNaomy: 0,
  energyPapa: 0,
  status: 'idle',

  initGame: () => {
    set({
      board: createInitialBoard(), // Use a fresh board
      turn: 'naomy',
      selectedSquare: null,
      validMoves: [],
      capturedByNaomy: [],
      capturedByPapa: [],
      isCheck: false,
      isCheckmate: false,
      winner: null,
      energyNaomy: 0,
      energyPapa: 0,
      status: 'playing',
    });
  },

  selectSquare: (pos: Position) => {
    const { board, turn, selectedSquare } = get();
    const piece = board[pos.row][pos.col];

    // If clicking on a piece of current turn's color
    if (piece && piece.color === (turn === 'naomy' ? 'white' : 'black')) {
      const moves = getLegalMoves(board, pos);
      // Filter moves that would leave king in check (simple validation)
      const safeMoves = moves.filter(move => {
        const tempBoard = makeMove(board, { from: pos, to: move, piece });
        return !isCheck(tempBoard, piece.color);
      });
      
      set({ selectedSquare: pos, validMoves: safeMoves });
    } else if (!piece && selectedSquare) {
       // Clicking empty square while piece selected -> handled by movePiece usually, 
       // but here we just deselect if invalid
       set({ selectedSquare: null, validMoves: [] });
    } else {
       // Clicking enemy piece or empty without selection
       set({ selectedSquare: null, validMoves: [] });
    }
  },

  movePiece: (to: Position) => {
    const { board, turn, selectedSquare, validMoves, capturedByNaomy, capturedByPapa, energyNaomy, energyPapa } = get();
    
    if (!selectedSquare) return;

    // Check if move is valid
    if (!validMoves.some(m => m.row === to.row && m.col === to.col)) {
      // If clicking on another friendly piece, select it instead
      const targetPiece = board[to.row][to.col];
      if (targetPiece && targetPiece.color === (turn === 'naomy' ? 'white' : 'black')) {
        get().selectSquare(to);
      } else {
        set({ selectedSquare: null, validMoves: [] });
      }
      return;
    }

    const piece = board[selectedSquare.row][selectedSquare.col];
    if (!piece) return;

    const targetPiece = board[to.row][to.col];
    const move: Move = { from: selectedSquare, to, piece, captured: targetPiece || undefined };

    // Update board
    const newBoard = makeMove(board, move);

    // Handle captures & Energy
    const newCapturedNaomy = [...capturedByNaomy];
    const newCapturedPapa = [...capturedByPapa];
    let newEnergyNaomy = energyNaomy;
    let newEnergyPapa = energyPapa;

    if (targetPiece) {
      if (turn === 'naomy') {
        newCapturedNaomy.push(targetPiece);
        newEnergyNaomy = Math.min(100, newEnergyNaomy + 20);
      } else {
        newCapturedPapa.push(targetPiece);
        newEnergyPapa = Math.min(100, newEnergyPapa + 20);
      }
    }

    // Switch turn
    const nextTurn = turn === 'naomy' ? 'papa' : 'naomy';
    const nextColor = nextTurn === 'naomy' ? 'white' : 'black';

    // Check check/checkmate
    const check = isCheck(newBoard, nextColor);
    // TODO: Checkmate logic (if check and no legal moves)

    set({
      board: newBoard,
      turn: nextTurn,
      selectedSquare: null,
      validMoves: [],
      capturedByNaomy: newCapturedNaomy,
      capturedByPapa: newCapturedPapa,
      energyNaomy: newEnergyNaomy,
      energyPapa: newEnergyPapa,
      isCheck: check,
    });
  },

  setWinner: (winner) => set({ winner, status: 'ended' }),
  resetGame: () => get().initGame(),
}));

function createInitialBoard(): BoardState {
    // Re-importing or duplicating logic to avoid circular dependency issues if any, 
    // but better to export from chessEngine. 
    // Since I exported createInitialBoard in chessEngine but it wasn't exported in the snippet above (my bad),
    // I will fix chessEngine snippet or just use INITIAL_BOARD deep copy.
    // Actually INITIAL_BOARD is constant, need deep copy.
    return JSON.parse(JSON.stringify(INITIAL_BOARD));
}
