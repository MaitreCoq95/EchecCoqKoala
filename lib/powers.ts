// Power System Types and Data for Chess V2

export interface Power {
  id: string;
  name: string;
  emoji: string;
  description: string;
  chargeRate: number;      // % gained per turn (10-33)
  currentCharge: number;   // 0-100
  maxCharge: number;       // Always 100
  color: string;           // Bar color
  isReady: boolean;        // currentCharge >= 100
}

export type PowerId = 
  // Naomy powers
  | 'charm' | 'resurrect' | 'shield' | 'teleport' | 'koala-power'
  // Vivien powers  
  | 'fury-attack' | 'warrior-honor' | 'total-defense' | 'rooster-rage' | 'decupled-force';

// Armée Naomy (Koala Queen) - Soft magical powers
export const createNaomyPowers = (): Power[] => [
  {
    id: 'charm',
    name: 'Charme Mignon',
    emoji: '💖',
    description: 'Paralyse un adversaire pendant 1 tour',
    chargeRate: 20,
    currentCharge: 0,
    maxCharge: 100,
    color: '#FF69B4',
    isReady: false
  },
  {
    id: 'resurrect',
    name: 'Résurrection Magique',
    emoji: '✨',
    description: 'Ramène une pièce capturée',
    chargeRate: 10,
    currentCharge: 0,
    maxCharge: 100,
    color: '#FFD700',
    isReady: false
  },
  {
    id: 'shield',
    name: 'Bouclier Arc-en-ciel',
    emoji: '🌈',
    description: 'Protège une pièce de la capture',
    chargeRate: 25,
    currentCharge: 0,
    maxCharge: 100,
    color: '#9370DB',
    isReady: false
  },
  {
    id: 'teleport',
    name: 'Téléportation',
    emoji: '🌟',
    description: 'Échange 2 pièces de position',
    chargeRate: 33,
    currentCharge: 0,
    maxCharge: 100,
    color: '#87CEEB',
    isReady: false
  },
  {
    id: 'koala-power',
    name: 'Pouvoir Koala',
    emoji: '🦄',
    description: 'Double le mouvement du Roi',
    chargeRate: 25,
    currentCharge: 0,
    maxCharge: 100,
    color: '#98FB98',
    isReady: false
  }
];

// Armée Vivien (Titan Rooster) - Strong warrior powers
export const createVivienPowers = (): Power[] => [
  {
    id: 'fury-attack',
    name: 'Attaque Furie',
    emoji: '⚔️',
    description: 'Capture 2 pièces en 1 tour',
    chargeRate: 11,
    currentCharge: 0,
    maxCharge: 100,
    color: '#DC143C',
    isReady: false
  },
  {
    id: 'warrior-honor',
    name: 'Honneur Guerrier',
    emoji: '🏆',
    description: 'Ramène une pièce capturée',
    chargeRate: 10,
    currentCharge: 0,
    maxCharge: 100,
    color: '#FFD700',
    isReady: false
  },
  {
    id: 'total-defense',
    name: 'Défense Totale',
    emoji: '🛡️',
    description: 'Rend une pièce invincible 1 tour',
    chargeRate: 14,
    currentCharge: 0,
    maxCharge: 100,
    color: '#4682B4',
    isReady: false
  },
  {
    id: 'rooster-rage',
    name: 'Rage du Coq',
    emoji: '🔥',
    description: '+2 cases de déplacement temporaire',
    chargeRate: 20,
    currentCharge: 0,
    maxCharge: 100,
    color: '#FF4500',
    isReady: false
  },
  {
    id: 'decupled-force',
    name: 'Force Décuplée',
    emoji: '💪',
    description: 'Un pion devient temporairement Reine',
    chargeRate: 17,
    currentCharge: 0,
    maxCharge: 100,
    color: '#FF8C00',
    isReady: false
  }
];

// Function to charge all powers for a player after their turn
export function chargePowers(powers: Power[]): Power[] {
  return powers.map(power => {
    const newCharge = Math.min(power.currentCharge + power.chargeRate, 100);
    return {
      ...power,
      currentCharge: newCharge,
      isReady: newCharge >= 100
    };
  });
}

// Function to use a power (reset its charge)
export function consumePower(powers: Power[], powerId: string): Power[] {
  return powers.map(power => {
    if (power.id === powerId) {
      return {
        ...power,
        currentCharge: 0,
        isReady: false
      };
    }
    return power;
  });
}

// Get power by ID
export function getPowerById(powers: Power[], powerId: string): Power | undefined {
  return powers.find(p => p.id === powerId);
}
