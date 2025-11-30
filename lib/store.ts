import { create } from 'zustand';
import { BoardState, GameState, Move, Player, Position, Piece } from './types';
import { INITIAL_BOARD, getLegalMoves, makeMove, isCheck } from './chessEngine';

interface GameStore extends GameState {
  // Super Powers
  frozenPieces: Record<string, number>; // pieceId -> turns remaining
  shieldedPieces: Record<string, number>; // pieceId -> turns remaining
  activePower: 'freeze' | 'shield' | 'teleport' | 'charm' | 'revive' | null;

  // Actions
  initGame: () => void;
  selectSquare: (pos: Position) => void;
  movePiece: (to: Position) => void;
  setWinner: (winner: Player) => void;
  resetGame: () => void;
  
  // Power Actions
  setActivePower: (power: 'freeze' | 'shield' | 'teleport' | 'charm' | 'revive' | null) => void;
  applyPower: (targetSquare: Position) => void;
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
  frozenPieces: {},
  shieldedPieces: {},
  activePower: null,

  initGame: () => set({
    board: JSON.parse(JSON.stringify(INITIAL_BOARD)),
    turn: 'naomy',
    selectedSquare: null,
    validMoves: [],
    capturedByNaomy: [],
    capturedByPapa: [],
    energyNaomy: 0,
    energyPapa: 0,
    winner: null,
    frozenPieces: {},
    shieldedPieces: {},
    activePower: null,
    status: 'playing',
    isCheck: false,
    isCheckmate: false,
  }),

  setActivePower: (power) => set({ activePower: power, selectedSquare: null, validMoves: [] }),

  applyPower: (targetSquare: Position) => {
    const { board, turn, activePower, energyNaomy, energyPapa, capturedByNaomy, capturedByPapa, frozenPieces, shieldedPieces } = get();
    const targetPiece = board[targetSquare.row][targetSquare.col];
    const currentEnergy = turn === 'naomy' ? energyNaomy : energyPapa;
    
    let cost = 0;
    let success = false;
    const newFrozen = { ...frozenPieces };
    const newShielded = { ...shieldedPieces };
    const newBoard = [...board.map(row => [...row])];
    let newCapturedNaomy = [...capturedByNaomy];
    let newCapturedPapa = [...capturedByPapa];

    if (!activePower) return;

    // 1. Freeze (30%)
    if (activePower === 'freeze') {
      cost = 30;
      if (currentEnergy >= cost && targetPiece && targetPiece.color !== turn) {
        newFrozen[targetPiece.id] = 2; // Freeze for 2 turns
        success = true;
      }
    }

    // 2. Shield (50%)
    else if (activePower === 'shield') {
      cost = 50;
      if (currentEnergy >= cost && targetPiece && targetPiece.color === turn) {
        newShielded[targetPiece.id] = 1; // Shield for 1 turn
        success = true;
      }
    }

    // 3. Teleport (60%)
    else if (activePower === 'teleport') {
      cost = 60;
      const { selectedSquare } = get();
      if (currentEnergy >= cost && selectedSquare && !targetPiece) {
        const sourcePiece = board[selectedSquare.row][selectedSquare.col];
        if (sourcePiece && sourcePiece.color === turn) {
          newBoard[targetSquare.row][targetSquare.col] = sourcePiece;
          newBoard[selectedSquare.row][selectedSquare.col] = null;
          success = true;
        }
      }
    }

    // 4. Charm (80%)
    else if (activePower === 'charm') {
      cost = 80;
      if (currentEnergy >= cost && targetPiece && targetPiece.color !== turn && targetPiece.type !== 'king' && targetPiece.type !== 'queen') {
        newBoard[targetSquare.row][targetSquare.col] = { ...targetPiece, color: turn };
        success = true;
      }
    }

    // 5. Revive (100%)
    else if (activePower === 'revive') {
      cost = 100;
      const lostPieces = turn === 'naomy' ? capturedByPapa : capturedByNaomy;
      
      if (currentEnergy >= cost && !targetPiece && lostPieces.length > 0) {
        const pieceToRevive = lostPieces[lostPieces.length - 1];
        newBoard[targetSquare.row][targetSquare.col] = { ...pieceToRevive, color: turn };
        
        if (turn === 'naomy') {
          newCapturedPapa = newCapturedPapa.slice(0, -1);
        } else {
          newCapturedNaomy = newCapturedNaomy.slice(0, -1);
        }
        success = true;
      }
    }

    if (success) {
      const finalEnergyNaomy = turn === 'naomy' ? energyNaomy - cost : energyNaomy;
      const finalEnergyPapa = turn === 'papa' ? energyPapa - cost : energyPapa;
      const nextTurn = turn === 'naomy' ? 'papa' : 'naomy';

      Object.keys(newFrozen).forEach(key => {
        if (newFrozen[key] > 0) newFrozen[key]--;
        if (newFrozen[key] === 0) delete newFrozen[key];
      });
      Object.keys(newShielded).forEach(key => {
        if (newShielded[key] > 0) newShielded[key]--;
        if (newShielded[key] === 0) delete newShielded[key];
      });

      set({
        board: newBoard,
        turn: nextTurn,
        energyNaomy: finalEnergyNaomy,
        energyPapa: finalEnergyPapa,
        frozenPieces: newFrozen,
        shieldedPieces: newShielded,
        capturedByNaomy: newCapturedNaomy,
        capturedByPapa: newCapturedPapa,
        activePower: null,
        selectedSquare: null,
        validMoves: []
      });
    }
  },

  selectSquare: (pos: Position) => {
    const { activePower } = get();
    
    if (activePower === 'teleport') {
       const { selectedSquare, board } = get();
       if (!selectedSquare) {
         const piece = board[pos.row][pos.col];
         if (piece && piece.color === get().turn) {
           set({ selectedSquare: pos, validMoves: [] });
         }
       } else {
         get().applyPower(pos);
       }
       return;
    }

    if (activePower) {
      get().applyPower(pos);
      return;
    }

    const { board, turn, selectedSquare, validMoves, frozenPieces } = get();
    const piece = board[pos.row][pos.col];

    if (selectedSquare && validMoves.some(m => m.row === pos.row && m.col === pos.col)) {
      get().movePiece(pos);
      return;
    }

    if (piece && piece.color === turn) {
      if (frozenPieces[piece.id]) return;

      const moves = getLegalMoves(board, pos);
      // Filter moves that would leave king in check
      const safeMoves = moves.filter(move => {
        const tempBoard = makeMove(board, { from: pos, to: move, piece });
        return !isCheck(tempBoard, piece.color);
      });

      set({ selectedSquare: pos, validMoves: safeMoves });
    } else {
      set({ selectedSquare: null, validMoves: [] });
    }
  },

  movePiece: (to: Position) => {
    const { board, selectedSquare, turn, capturedByNaomy, capturedByPapa, energyNaomy, energyPapa, frozenPieces, shieldedPieces } = get();
    if (!selectedSquare) return;

    const from = selectedSquare;
    const piece = board[from.row][from.col];
    const targetPiece = board[to.row][to.col];

    if (!piece) return;

    if (targetPiece && shieldedPieces[targetPiece.id]) return;

    const move: Move = { from, to, piece, captured: targetPiece || undefined };
    const newBoard = makeMove(board, move);

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
    } else {
       if (turn === 'naomy') newEnergyNaomy = Math.min(100, newEnergyNaomy + 5);
       else newEnergyPapa = Math.min(100, newEnergyPapa + 5);
    }

    const nextTurn = turn === 'naomy' ? 'papa' : 'naomy';

    const newFrozen = { ...frozenPieces };
    const newShielded = { ...shieldedPieces };
    
    Object.keys(newFrozen).forEach(key => {
        if (newFrozen[key] > 0) newFrozen[key]--;
        if (newFrozen[key] === 0) delete newFrozen[key];
    });
    Object.keys(newShielded).forEach(key => {
        if (newShielded[key] > 0) newShielded[key]--;
        if (newShielded[key] === 0) delete newShielded[key];
    });

    let winner = null;
    if (targetPiece?.type === 'king') {
      winner = turn;
    }

    set({
      board: newBoard,
      turn: nextTurn,
      selectedSquare: null,
      validMoves: [],
      capturedByNaomy: newCapturedNaomy,
      capturedByPapa: newCapturedPapa,
      energyNaomy: newEnergyNaomy,
      energyPapa: newEnergyPapa,
      winner,
      frozenPieces: newFrozen,
      shieldedPieces: newShielded
    });
  },

  setWinner: (winner) => set({ winner, status: 'ended' }),
  resetGame: () => get().initGame(),
}));
