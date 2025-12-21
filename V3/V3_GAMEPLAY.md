# 🎮 COCORICHEST V3 - GAMEPLAY DÉTAILLÉ

## 🏰 SYSTÈME PRISON

### Placement Initial
```
Position Centre (cases d4, e4, d5, e5):
  
  5  [ ]  🧱  🧱  [ ]
  4  🧱 [🐧] 🧱  [ ]
  3  [ ]  🧱  🧱  [ ]

Légende:
🐧 = Pingouin (case e4)
🧱 = Mur (HP selon difficulté)
[ ] = Case vide accessible
```

### Mécanique HP Murs
```typescript
interface Wall {
  position: { row: number, col: number }
  type: 'stone' | 'ice' | 'fire' | 'regen'
  currentHP: number
  maxHP: number
  abilities: WallAbility[]
}

// Attaque mur
function attackWall(piece: Piece, wall: Wall) {
  if (isAdjacent(piece.position, wall.position)) {
    wall.currentHP -= 1
    
    // Capacités spéciales
    if (wall.type === 'fire') {
      piece.hp -= 10 // Brûlure
    }
    
    if (wall.currentHP <= 0) {
      destroyWall(wall)
      playEffect('wall-destroyed')
    }
  }
}
```

---

## 🎯 MODE 1: COURSE (Compétitif)

### Setup
- 4 murs pierre (3 HP chacun = 12 HP total)
- Position pingouin: case e4 (centre exact)
- Règles échecs normales SAUF:
  - Attaquer mur = consomme 1 tour
  - Pas de capture du pingouin (case protégée)

### Flow de Jeu
```
1. Joueur bouge pièce OU attaque mur
2. Si tous murs détruits → case e4 accessible
3. Premier à atteindre e4 = VICTOIRE
4. Sinon: échec & mat classique aussi valide
```

### Stratégies
- **Rusheur:** Fonce sur les murs, ignore adversaire
- **Défenseur:** Bloque accès e4, capture pièces adverses
- **Équilibré:** Alterne attaque murs / pression adverse

### Conditions Victoire
1. **Libération:** Atteindre e4 après destruction murs
2. **Échec & Mat:** Roi adverse mat
3. **Abandon:** Adversaire quitte/abandonne

---

## 🤝 MODE 2: COOPÉRATION

### Setup Spécial
- Timer: 10 minutes countdown
- 6 murs mixtes (glace + flammes)
- Gardiens IA: 2 fantômes apparaissent tour 5

### Gardiens IA
```typescript
interface Guardian {
  hp: 30
  position: { row: number, col: number }
  behavior: 'patrol' | 'attack' | 'repair'
}

// Comportement
function guardianTurn(guardian: Guardian) {
  if (anyWallDamaged()) {
    moveTowards(nearestDamagedWall)
    repairWall(+1 HP)
  } else {
    moveTowards(nearestPlayerPiece)
    attackIfAdjacent()
  }
}
```

### Mécanique Réparation
- Gardiens réparent +1 HP/tour aux murs
- Murs régénérants +1 HP tous les 3 tours
- Timer accéléré si gardiens vivants

### Score Coopératif
```typescript
interface CoopScore {
  timeBonus: number        // Secondes restantes × 10
  piecesAlive: number      // Pièces survivantes × 50
  wallsDestroyed: number   // Murs détruits × 100
  guardiansKilled: number  // Gardiens tués × 200
  comboMoves: number       // Attaques synchronisées × 30
  
  total: number
}

// Rang
S: 2000+ points
A: 1500-1999
B: 1000-1499
C: 500-999
D: <500
```

### Communication
- Ping système: Marquer case cible
- Emotes: 4 réactions (OK, Aide, Attention, GG)
- Chat texte (optionnel)

---

## 📖 MODE 3: CAMPAGNE

### Structure Chapitres

**CHAPITRE 1: LA CAPTURE**
- Difficulté: ★☆☆☆☆
- Prison: 1 mur pierre (3 HP)
- Objectif: Tutorial + détruire le mur
- Récompense: Pouvoir "Bélier" débloqué
- Cutscene: Intro capture du pingouin

**CHAPITRE 2: PREMIERS ALLIÉS**
- Difficulté: ★★☆☆☆
- Prison: 3 murs mixtes (10 HP total)
- Objectif: Recruter 3 pièces spéciales (puzzles)
- Récompense: +1 slot pouvoir
- Nouvelle mécanique: Murs glace

**CHAPITRE 3: LES GARDIENS**
- Difficulté: ★★★☆☆
- Prison: 4 murs + 2 gardiens IA
- Objectif: Vaincre gardiens ET libérer pingouin
- Récompense: Pouvoir "Combo" débloqué
- Boss: Gardien Chef (50 HP)

**CHAPITRE 4: LA TRAHISON**
- Difficulté: ★★★★☆
- Prison: 5 murs régénérants (20 HP total)
- Objectif: Choix moral (pardonner vs punir)
- Branching: 2 chemins différents
- Impact: Change boss final + fin

**CHAPITRE 5: LIBÉRATION FINALE**
- Difficulté: ★★★★★
- Prison: 6 murs spéciaux (30 HP)
- Boss: Roi des Ombres (100 HP, 3 phases)
- Tous pouvoirs disponibles
- 3 fins possibles selon choix Ch.4

### Système Sauvegarde
```typescript
interface CampaignSave {
  currentChapter: number
  unlockedPowers: string[]
  collectedFeathers: number
  moralChoice: 'forgive' | 'punish' | null
  completedChapters: {
    id: number
    score: number
    rank: 'S' | 'A' | 'B' | 'C' | 'D'
  }[]
}
```

---

## ⚡ POUVOIRS DÉTAILLÉS

### 🔨 Bélier
```typescript
{
  id: 'ram',
  name: 'Bélier',
  cost: 100,
  cooldown: 8,
  effect: (target: Wall) => {
    if (target.type === 'wall') {
      destroyWall(target)
      playAnimation('ram-smash')
    }
  },
  unlocked: 'Chapter 1'
}
```

### 💣 Explosion
```typescript
{
  id: 'explosion',
  cost: 100,
  cooldown: 10,
  effect: (epicenter: Position) => {
    const adjacentWalls = getAdjacentWalls(epicenter)
    adjacentWalls.forEach(wall => {
      wall.currentHP -= 2
      if (wall.currentHP <= 0) destroyWall(wall)
    })
    playAnimation('explosion-blast')
  }
}
```

### 🤝 Attaque Combo (Coop)
```typescript
{
  id: 'combo',
  cost: 50, // per player
  cooldown: 0,
  requirement: 'both_players_same_turn',
  effect: (wall: Wall) => {
    if (bothPlayersTargetSame(wall)) {
      wall.currentHP -= (1 × 3) // Triple damage
      showText('COMBO x3!')
    }
  }
}
```

---

## 🎯 CONFIGURATIONS DIFFICULTÉ

| Niveau | Murs | HP Total | Spéciaux | IA | Timer |
|--------|------|----------|----------|----|----|
| Facile | 4 | 12 | 0 | Non | Aucun |
| Normal | 4 | 14 | 2 | Non | Aucun |
| Difficile | 6 | 20 | 4 | 1 gardien | 15 min |
| Extrême | 8 | 30 | 6 | 2 gardiens | 10 min |
| Boss | 6 | 30 | All | Boss AI | Phases |

---

## 🏆 ACHIEVEMENTS

```typescript
const achievements = [
  {
    id: 'first_rescue',
    name: 'Sauveur du Pingouin',
    description: 'Libérer le pingouin pour la première fois',
    icon: 'badge-savior.png'
  },
  {
    id: 'speed_run',
    name: 'Libération Éclair',
    description: 'Victoire en moins de 15 tours',
    icon: 'badge-lightning.png'
  },
  {
    id: 'flawless',
    name: 'Sauvetage Parfait',
    description: 'Aucune pièce perdue',
    icon: 'badge-flawless.png'
  },
  {
    id: 'coop_master',
    name: 'Duo Légendaire',
    description: '10 victoires coop rang S',
    icon: 'badge-legendary.png'
  },
  {
    id: 'campaign_complete',
    name: 'Héros du Royaume',
    description: 'Terminer les 5 chapitres',
    icon: 'badge-hero.png'
  }
]
```

---

## 💾 DONNÉES PERSISTANTES

```typescript
interface PlayerProgress {
  // Campaign
  campaignProgress: CampaignSave
  
  // Stats
  totalRescues: number
  fastestRescue: number // tours
  wallsDestroyed: number
  feathersCollected: number
  
  // Unlocks
  unlockedPowers: string[]
  unlockedSkins: string[]
  unlockedModes: string[]
  
  // Achievements
  achievements: string[]
  achievementProgress: Record<string, number>
}
```

---

**NOTES TECHNIQUES:**
- Prison toujours centrée (d4-e5)
- Murs destructibles mais pas traversables
- Pingouin = case spéciale (pas de capture)
- Gardiens IA = pathfinding simple A*
- Timer précis au dixième de seconde
- Saves auto après chaque chapitre
