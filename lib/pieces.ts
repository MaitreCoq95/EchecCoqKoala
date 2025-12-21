import { PieceType } from './types';

export type Army = 'naomy' | 'vivien';

// Mapping des assets pièces pour chaque armée
export const pieceAssets: Record<Army, Record<PieceType, string>> = {
  naomy: {
    king: '/assets/pieces/naomy/king-koala.png',
    queen: '/assets/pieces/naomy/queen-corgi.png',
    rook: '/assets/pieces/naomy/rook-tower-corgi.png',
    bishop: '/assets/pieces/naomy/bishop-parrot.png',
    knight: '/assets/pieces/naomy/knight-cat-horse.png',
    pawn: '/assets/pieces/naomy/pawn-corgi.png',
  },
  vivien: {
    king: '/assets/pieces/vivien/king-rooster.png',
    queen: '/assets/pieces/vivien/queen-hen.png',
    rook: '/assets/pieces/vivien/rook-tower-rooster.png',
    bishop: '/assets/pieces/vivien/bishop-jester.png',
    knight: '/assets/pieces/vivien/knight-horse-rooster.png',
    pawn: '/assets/pieces/vivien/pawn-turtle.png',
  }
};

// Noms des pièces par armée
export const pieceNames: Record<Army, Record<PieceType, string>> = {
  naomy: {
    king: 'Koala King',
    queen: 'Corgi Queen',
    rook: 'Tour Corgi',
    bishop: 'Fou Perroquet',
    knight: 'Cavalier Chat',
    pawn: 'Pion Corgi',
  },
  vivien: {
    king: 'Roi Coq',
    queen: 'Reine Poule',
    rook: 'Tour Coq',
    bishop: 'Fou Bouffon',
    knight: 'Chevalier Coq',
    pawn: 'Pion Tortue',
  }
};

// Helper pour obtenir l'armée depuis la couleur
export function getArmyFromColor(color: 'white' | 'black'): Army {
  return color === 'white' ? 'naomy' : 'vivien';
}

// Helper pour obtenir le chemin d'une pièce
export function getPieceImagePath(color: 'white' | 'black', type: PieceType): string {
  const army = getArmyFromColor(color);
  return pieceAssets[army][type];
}

// Configuration des plateaux
export interface BoardConfig {
  id: string;
  name: string;
  imagePath: string;
  description: string;
  gridColor?: string; // Optional custom grid color
  gridOpacity?: number; // Optional custom grid opacity
}

export const boardConfigs: BoardConfig[] = [
  {
    id: 'split-dual',
    name: 'Royaume Divisé',
    imagePath: '/assets/boards/board-split-dual.png',
    description: 'Deux territoires distincts',
    gridColor: 'border-white/30',
  },
  {
    id: 'asymmetric',
    name: 'Arène Asymétrique',
    imagePath: '/assets/boards/board-asymmetric.png',
    description: 'Combat déséquilibré',
    gridColor: 'border-white/30',
  },
  {
    id: 'neutral',
    name: 'Neutre Élégant',
    imagePath: '/assets/boards/board-neutral.png',
    description: 'Style minimaliste',
    gridColor: 'border-slate-800/50',
  },
  {
    id: 'simple',
    name: 'Classique Royal',
    imagePath: '/assets/boards/board-simple.png',
    description: 'Tradition pure',
    gridColor: 'border-slate-800/80',
  }
];

export function getBoardConfig(boardId: string): BoardConfig | undefined {
  return boardConfigs.find(b => b.id === boardId);
}
