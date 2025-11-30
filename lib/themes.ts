import { Theme } from './types';

export const THEME_NAOMY: Theme = {
  name: 'Koala Queen Army',
  colors: {
    primary: '#A855F7', // Violet
    secondary: '#F9A8D4', // Rose pastel
    accent: '#E9D5FF', // Lilas
    boardLight: '#F3E8FF', // Very light purple
    boardDark: '#D8B4FE', // Light purple
  },
  pieces: {
    king: { icon: '🐨👑', name: 'Koala Magique' },
    queen: { icon: '🦄✨', name: 'Licorne Reine' },
    rook: { icon: '🌳', name: 'Arbre Magique' },
    bishop: { icon: '🧚‍♀️', name: 'Fée Gymnaste' },
    knight: { icon: '🐨🤸', name: 'Koala Acrobate' },
    pawn: { icon: '🐨', name: 'Mini-Koala' },
  },
};

export const THEME_PAPA: Theme = {
  name: 'Coq Titan Army',
  colors: {
    primary: '#0F172A', // Bleu nuit
    secondary: '#3B82F6', // Bleu électrique
    accent: '#FACC15', // Or
    boardLight: '#E2E8F0', // Slate 200
    boardDark: '#94A3B8', // Slate 400
  },
  pieces: {
    king: { icon: '🐢⚔️', name: 'Carapuce Guerrier' },
    queen: { icon: '🐓👑', name: 'Coq Royal' },
    rook: { icon: '🏋️', name: 'Tour Muscu' },
    bishop: { icon: '🥋', name: 'Sensei' },
    knight: { icon: '🔔', name: 'Kettlebell' },
    pawn: { icon: '🐓', name: 'Mini-Coq' },
  },
};
