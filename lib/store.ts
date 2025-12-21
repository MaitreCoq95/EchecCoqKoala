import { create } from 'zustand';
import { BoardState, GameState, Move, Player, Position } from './types';
import { INITIAL_BOARD, getLegalMoves, makeMove, isCheck } from './chessEngine';
import { Power, createNaomyPowers, createVivienPowers, chargePowers, consumePower } from './powers';
import { gameService } from './gameService';

interface GameStore extends GameState {
  // Super Powers
  frozenPieces: Record<string, number>; // pieceId -> turns remaining
  shieldedPieces: Record<string, number>; // pieceId -> turns remaining
  activePower: string | null;
  
  // New Power System
  naomyPowers: Power[];
  vivienPowers: Power[];
  selectedPowerTarget1: Position | null; // For 2-target powers like teleport

  // Actions
  initGame: () => void;
  selectSquare: (pos: Position) => void;
  movePiece: (to: Position) => void;
  setWinner: (winner: Player) => void;
  resetGame: () => void;
  setGameMode: (mode: 'classic' | 'powers') => void;
  
  // Power Actions
  setActivePower: (power: string | null) => void;
  activatePower: (powerId: string) => void;
  applyPower: (targetSquare: Position) => void;
  setBoardState: (board: BoardState) => void;
  setGameId: (id: string | null) => void;
  syncGameState: (newState: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameId: null,
  gameMode: 'powers', // Default to powers mode
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
  naomyPowers: createNaomyPowers(),
  vivienPowers: createVivienPowers(),
  selectedPowerTarget1: null,

  initGame: () => set({
    gameId: null,
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
    naomyPowers: createNaomyPowers(),
    vivienPowers: createVivienPowers(),
    selectedPowerTarget1: null,
    status: 'playing',
    isCheck: false,
    isCheckmate: false,
  }),

  setActivePower: (power) => set({ activePower: power, selectedSquare: null, validMoves: [], selectedPowerTarget1: null }),
  
  activatePower: (powerId: string) => {
    const { turn, naomyPowers, vivienPowers } = get();
    const powers = turn === 'naomy' ? naomyPowers : vivienPowers;
    const power = powers.find(p => p.id === powerId);
    
    if (!power || !power.isReady) return;
    
    set({ activePower: powerId, selectedSquare: null, validMoves: [], selectedPowerTarget1: null });
  },

  applyPower: (targetSquare: Position) => {
    const { board, turn, activePower, capturedByNaomy, capturedByPapa, frozenPieces, shieldedPieces, naomyPowers, vivienPowers, selectedPowerTarget1 } = get();
    const targetPiece = board[targetSquare.row][targetSquare.col];
    const turnColor = turn === 'naomy' ? 'white' : 'black';
    
    let success = false;
    const newFrozen = { ...frozenPieces };
    const newShielded = { ...shieldedPieces };
    const newBoard = [...board.map(row => [...row])];
    let newCapturedNaomy = [...capturedByNaomy];
    let newCapturedPapa = [...capturedByPapa];

    if (!activePower) return;

    // Handle each power type
    switch (activePower) {
      // Naomy Powers
      case 'charm':
        // Paralyze enemy piece for 1 turn
        if (targetPiece && targetPiece.color !== turnColor) {
          newFrozen[targetPiece.id] = 2;
          success = true;
        }
        break;
        
      case 'resurrect':
      case 'warrior-honor':
        // Revive a captured piece
        const lostPieces = turn === 'naomy' ? capturedByPapa : capturedByNaomy;
        if (!targetPiece && lostPieces.length > 0) {
          const pieceToRevive = lostPieces[lostPieces.length - 1];
          newBoard[targetSquare.row][targetSquare.col] = { ...pieceToRevive, color: turnColor };
          if (turn === 'naomy') {
            newCapturedPapa = newCapturedPapa.slice(0, -1);
          } else {
            newCapturedNaomy = newCapturedNaomy.slice(0, -1);
          }
          success = true;
        }
        break;
        
      case 'shield':
      case 'total-defense':
        // Shield own piece for 1 turn
        if (targetPiece && targetPiece.color === turnColor) {
          newShielded[targetPiece.id] = 2;
          success = true;
        }
        break;
        
      case 'teleport':
        // Swap 2 own pieces - needs 2 clicks
        if (!selectedPowerTarget1) {
          if (targetPiece && targetPiece.color === turnColor) {
            set({ selectedPowerTarget1: targetSquare });
          }
          return; // Wait for second selection
        } else {
          const firstPiece = board[selectedPowerTarget1.row][selectedPowerTarget1.col];
          if (targetPiece && targetPiece.color === turnColor && firstPiece) {
            newBoard[targetSquare.row][targetSquare.col] = firstPiece;
            newBoard[selectedPowerTarget1.row][selectedPowerTarget1.col] = targetPiece;
            success = true;
          }
        }
        break;
        
      case 'koala-power':
        // Double king movement - just mark it active, handled in move logic
        if (targetPiece && targetPiece.color === turnColor && targetPiece.type === 'king') {
          // This would need special handling in move calculation
          success = true;
        }
        break;
        
      // Vivien Powers
      case 'fury-attack':
        // Allow capturing 2 pieces - handled differently
        success = true;
        break;
        
      case 'rooster-rage':
        // +2 movement for a piece
        if (targetPiece && targetPiece.color === turnColor) {
          success = true;
        }
        break;
        
      case 'decupled-force':
        // Pawn becomes Queen temporarily
        if (targetPiece && targetPiece.color === turnColor && targetPiece.type === 'pawn') {
          newBoard[targetSquare.row][targetSquare.col] = {
            ...targetPiece,
            type: 'queen'
          };
          success = true;
        }
        break;
    }

    if (success) {
      const powers = turn === 'naomy' ? naomyPowers : vivienPowers;
      const updatedPowers = consumePower(powers, activePower);
      
      const nextTurn = turn === 'naomy' ? 'papa' : 'naomy';

      // Decrement effect counters
      Object.keys(newFrozen).forEach(key => {
        if (newFrozen[key] > 0) newFrozen[key]--;
        if (newFrozen[key] === 0) delete newFrozen[key];
      });
      Object.keys(newShielded).forEach(key => {
        if (newShielded[key] > 0) newShielded[key]--;
        if (newShielded[key] === 0) delete newShielded[key];
      });
      
      // Charge opponent powers
      const opponentPowers = turn === 'naomy' ? vivienPowers : naomyPowers;
      const chargedOpponentPowers = chargePowers(opponentPowers);

      set({
        board: newBoard,
        turn: nextTurn,
        frozenPieces: newFrozen,
        shieldedPieces: newShielded,
        capturedByNaomy: newCapturedNaomy,
        capturedByPapa: newCapturedPapa,
        activePower: null,
        selectedSquare: null,
        validMoves: [],
        selectedPowerTarget1: null,
        ...(turn === 'naomy' 
          ? { naomyPowers: updatedPowers, vivienPowers: chargedOpponentPowers }
          : { vivienPowers: updatedPowers, naomyPowers: chargedOpponentPowers }
        )
      });

      // Multiplayer Synchronization for Powers
      const { gameId } = get();
      if (gameId) {
        // We use playMove to sync the board state change caused by the power
        // We might want to pass specific metadata later, but for now board_state is key
        gameService.playMove(
          gameId,
          turn, // Player who used the power
          { from: {row: -1, col: -1}, to: {row: -1, col: -1} }, // Dummy move data for power
          newBoard
        ).catch(err => console.error("Failed to sync power usage:", err));
      }
    }
  },

  selectSquare: (pos: Position) => {
    const { activePower } = get();
    
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

    const turnColor = turn === 'naomy' ? 'white' : 'black';
    if (piece && piece.color === turnColor) {
      if (frozenPieces[piece.id]) return;

      const moves = getLegalMoves(board, pos);
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
    const { board, selectedSquare, turn, capturedByNaomy, capturedByPapa, frozenPieces, shieldedPieces, naomyPowers, vivienPowers } = get();
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

    if (targetPiece) {
      if (turn === 'naomy') {
        newCapturedNaomy.push(targetPiece);
      } else {
        newCapturedPapa.push(targetPiece);
      }
    }

    const nextTurn = turn === 'naomy' ? 'papa' : 'naomy';

    // Decrement effect counters
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

    // Charge current player's powers after their move
    const currentPowers = turn === 'naomy' ? naomyPowers : vivienPowers;
    const chargedPowers = chargePowers(currentPowers);

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
      winner,
      frozenPieces: newFrozen,
      shieldedPieces: newShielded,
      ...(turn === 'naomy' 
        ? { naomyPowers: chargedPowers }
        : { vivienPowers: chargedPowers }
      )
    });

    // Multiplayer Synchronization
    const { gameId } = get();
    if (gameId) {
      gameService.playMove(
        gameId,
        turn, // The player who just moved
        { from: from, to: to },
        newBoard
      ).catch(err => console.error("Failed to sync move:", err));
    }
  },

  setWinner: (winner) => set({ winner, status: 'ended' }),
  resetGame: () => get().initGame(),
  setBoardState: (board) => set({ board }),
  setGameId: (id) => set({ gameId: id }),
  setGameMode: (mode) => set({ gameMode: mode }),
  syncGameState: (newState) => set((state) => ({ ...state, ...newState })),
}));
