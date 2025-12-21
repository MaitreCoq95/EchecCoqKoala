# 🐧 COCORICHEST V3 - LIBÉRER LE PINGOUIN

## 🎯 CONCEPT CORE

**Objectif:** Détruire la prison au centre du plateau pour libérer le Pingouin Royal

**Histoire:** Le Pingouin (gardien de paix) est emprisonné. Koalas et Coqs doivent coopérer OU se concurrencer pour le libérer.

---

## 🎮 3 MODES DE JEU

### MODE 1: COURSE (1v1 Compétitif)
- Premier à libérer le pingouin = victoire
- 4 murs de prison (3 HP chacun)
- Attaquer mur = 1 coup
- Défendre + bloquer adversaire

### MODE 2: COOPÉRATION (2P)
- Libérer ensemble avant timer (10 min)
- Gardiens IA + murs qui se réparent
- Score partagé

### MODE 3: CAMPAGNE (Solo)
- 5 chapitres narratifs
- Débloquer pouvoirs anti-prison
- Boss final + fins multiples

---

## 🏰 PRISON SYSTÈME

**Setup Centre Plateau:**
```
┌─────────┐
│ 🧱 🧱   │  Rangée 5
│ 🧱🐧🧱  │  Rangée 4 (pingouin case e4)
│   🧱 🧱 │  Rangée 3
└─────────┘
```

**Types de Murs:**
- Pierre: 3 HP, standard
- Glace: 2 HP, ralentit adjacents
- Flammes: 4 HP, brûle attaquants
- Régénérant: 3 HP, +1 HP/3 tours

**Difficulté:**
- Facile: 4 murs pierre (12 HP total)
- Normal: 4 murs mixtes (14 HP)
- Difficile: 6 murs spéciaux (20 HP)
- Extrême: 8 murs + boss (30 HP)

---

## ⚡ NOUVEAUX POUVOIRS V3

**Anti-Prison:**
- 🔨 Bélier: Détruit 1 mur instant (100% énergie)
- 💣 Explosion: 2 dégâts tous murs adjacents (100%)
- ⛏️ Percée: Traverse 1 mur sans détruire (80%)
- 🛡️ Immunité Murs: 2 tours protection (60%)

**Coopération:**
- 🤝 Combo: x3 dégâts si synchronisé (50% chacun)
- 🌟 Bénédiction: Tous murs -1 HP (100% partagé)

---

## 🐧 LE PINGOUIN

**Rôle:** Gardien de paix, sage, arbitre neutre

**Design:**
- Couronne des glaces (bleue/blanche)
- Écharpe arc-en-ciel
- Bâton de sagesse
- État: Triste (prison) / Joyeux (libre)

**Pouvoir (une fois libéré):**
- Pièce neutre mobile
- Déplacement 2 cases toutes directions
- Gèle 1 pièce adverse 1 tour
- +10% énergie/tour aux 2 joueurs

---

## 🎬 STRUCTURE NARRATIVE

**Chapitres:**
1. La Capture (Tutorial, 1 mur)
2. Premiers Alliés (Recruter pièces spéciales)
3. Les Gardiens (Combat IA)
4. La Trahison (Choix moral, branching)
5. Libération Finale (Boss fight, 6 murs 5 HP)

**Dialogues Clés:**
- Intro: "Aidez-moi ! Unis vous pouvez me sauver !"
- Victoire: "La paix est restaurée ! Merci champions !"
- Échec: "Peut-être qu'un jour..."

---

## 🏆 PROGRESSION

**Récompenses:**
- 🏅 Badge "Sauveur du Pingouin"
- ⚡ Victoire <15 tours: "Libération Éclair"
- 💎 Sans pertes: "Sauvetage Parfait"
- 👑 Mode difficile: Skin "Pingouin Empereur"

**Collectibles:**
- Plumes de Pingouin (drop des murs)
- 100 plumes = 1 skin pièce
- 500 plumes = Mode "Boss Rush"

---

## 🎯 INTÉGRATION MENU

```
COCORICHEST
├─ Jouer (Mode Classique) ← V2
├─ LIBÉRER LE PINGOUIN ← V3 NOUVEAU
│  ├─ Histoire (Solo)
│  ├─ Course (1v1)
│  └─ Coopération (2P)
├─ Multijoueur
└─ Paramètres
```

---

## 📊 SPECS TECHNIQUES

**Assets requis:**
- Pingouin emprisonné (256x256)
- Pingouin libéré (256x256)
- 4 types murs (231x231 chacun)
- Prison complète (4x4 cases)
- Effet libération (512x512)
- 5 cutscenes (illustrations)

**Nouveaux systèmes code:**
- HP tracking murs
- Prison placement système
- Timer countdown (coop)
- IA gardiens basique
- Système chapitres/save

---

**VERSION:** 3.0 Draft  
**DATE:** Décembre 2024  
**PRIORITÉ:** Post-V2 stable
