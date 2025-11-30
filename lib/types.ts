export type Player = 'naomy' | 'papa';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black'; // white = naomy, black = papa

export interface Position {
  row: number;
  col: number;
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
  id: string; // Unique ID for React keys and animations
  hasMoved?: boolean; // For castling/pawn initial move
}

export type BoardState = (Piece | null)[][];

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  captured?: Piece;
  isCheck?: boolean;
  isCheckmate?: boolean;
  isCastling?: boolean;
  isEnPassant?: boolean;
  promotion?: PieceType;
}

export interface GameState {
  board: BoardState;
  turn: Player;
  selectedSquare: Position | null;
  validMoves: Position[];
  capturedByNaomy: Piece[];
  capturedByPapa: Piece[];
  isCheck: boolean;
  isCheckmate: boolean;
  winner: Player | null;
  energyNaomy: number;
  energyPapa: number;
  status: 'idle' | 'playing' | 'ended';
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    boardLight: string;
    boardDark: string;
  };
  pieces: Record<PieceType, { icon: string; name: string }>;
}
