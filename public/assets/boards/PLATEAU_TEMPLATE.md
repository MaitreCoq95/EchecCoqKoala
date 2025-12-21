# 🎨 TEMPLATE DE GÉNÉRATION DE PLATEAU D'ÉCHECS

## 📐 SPÉCIFICATIONS TECHNIQUES OBLIGATOIRES

**TOUS les plateaux doivent respecter ces mesures exactes :**

```
Canvas total    : 2048 × 2048 pixels
Bordure         : 100 pixels (chaque côté)
Zone jouable    : 1848 × 1848 pixels
Position grille : X=100, Y=100 (top-left)
Taille case     : 231 × 231 pixels (1848 ÷ 8)
```

**Ces valeurs sont NON-NÉGOCIABLES** pour garantir l'alignement avec le code.

---

## 🎯 PROMPT BASE DALL-E

### Structure Standard

```
Chess board game asset, 8x8 grid, top-down view, EXACTLY 2048x2048 pixels.

TECHNICAL SPECIFICATIONS (CRITICAL):
- Total canvas size: 2048x2048px
- Decorative border: 100px thick on ALL four sides
- Playable grid area: 1848x1848px
- Grid starting position: X=100, Y=100 from top-left
- Each square size: 231x231px
- Perfect grid alignment with thin visible lines (2px) between squares

VISUAL THEME:
[PERSONNALISER ICI - Voir exemples ci-dessous]

COORDINATES & GUIDES:
- Chess notation (a-h, 1-8) displayed INSIDE border area
- Clear coordinate labels on all four sides
- Subtle grid lines for developer alignment

Clash of Clans aesthetic, vibrant colors, game asset quality,
perfect technical precision for programming implementation.
```

---

## 🎨 EXEMPLES DE THÈMES

### Thème 1 : Asymétrique (Koala vs Coq)

```
VISUAL THEME:
Split design divided horizontally:
- TOP HALF (rows 6-8): Kawaii aesthetic
  * Light squares: soft cream (#FFF8DC) with cloud patterns
  * Dark squares: gentle purple (#DDA0DD) with sparkles and hearts
  * Background ambiance: pastel clouds, subtle rainbow

- BOTTOM HALF (rows 1-3): Battle aesthetic
  * Light squares: warm sand (#F5DEB3) with stone texture
  * Dark squares: deep orange (#FF8C00) with flame effects
  * Background ambiance: embers, subtle smoke

- MIDDLE (rows 4-5): Smooth gradient transition between themes
  * Neutral zone blending both color palettes

Border decoration:
- Top border: cute elements (flowers, hearts, crowns)
- Bottom border: warrior elements (swords, shields, flames)
- Golden ornate frame with 3D embossed shine
```

### Thème 2 : Royaume Divisé

```
VISUAL THEME:
- LEFT side background: Magical kingdom with soft clouds
- RIGHT side background: Battle fortress with war banners
- Light squares: Ivory white (#FFFFF0) with marble texture
- Dark squares: Royal purple (#663399) gradient, alternating sides
- Ornate golden border with crown icons in corners
```

### Thème 3 : Neutre Élégant

```
VISUAL THEME:
- Light squares: Premium cream (#FFFAF0) with subtle shine
- Dark squares: Deep purple (#663399) with gentle gradient
- Minimalist aesthetic, no themed decorations
- Luxurious golden border with simple elegant patterns
- Professional clean look, suitable for both armies
```

### Thème 4 : Forêt Enchantée

```
VISUAL THEME:
- Light squares: Moss green (#98FB98) with leaf texture
- Dark squares: Forest green (#228B22) with tree bark pattern
- Background: Misty enchanted forest (very subtle, blurred)
- Border: Wooden frame with vine decorations
- Nature-themed corner ornaments (flowers, butterflies)
```

### Thème 5 : Arène Spatiale

```
VISUAL THEME:
- Light squares: Metallic silver (#C0C0C0) with tech panels
- Dark squares: Deep space blue (#191970) with star field
- Background: Cosmic nebula (very subtle, blurred)
- Border: Futuristic metallic frame with LED accents
- Sci-fi aesthetic, glowing elements
```

---

## 🔄 PROCESSUS DE CRÉATION

### Étape 1 : Copier le Prompt Base

Copie la "Structure Standard" ci-dessus.

### Étape 2 : Choisir/Créer un Thème

Remplace `[PERSONNALISER ICI]` par un des exemples OU crée ton propre thème.

### Étape 3 : Générer dans DALL-E

- Colle le prompt complet dans DALL-E 3
- Génère l'image
- Vérifie que la taille est bien 2048x2048px

### Étape 4 : Vérifier les Mesures

Ouvre dans un éditeur d'image et vérifie :

- Canvas total = 2048x2048 ✓
- Bordure = ~100px de chaque côté ✓
- Grille commence à X=100, Y=100 ✓

### Étape 5 : Nommer et Sauvegarder

```
/public/assets/boards/
  board-[nom-du-theme].png
```

Exemple : `board-forest-enchanted.png`

### Étape 6 : Tester l'Alignement

- Utilise le plateau dans le jeu
- Active le mode debug
- Vérifie l'alignement parfait avec la grille de code

---

## 📊 CHECKLIST QUALITÉ

Avant de valider un nouveau plateau, vérifier :

- [ ] Taille exacte : 2048x2048px
- [ ] Bordure uniforme : ~100px de chaque côté
- [ ] Grille 8x8 clairement visible
- [ ] Cases de taille égale
- [ ] Coordonnées (a-h, 1-8) lisibles
- [ ] Style cohérent avec l'univers du jeu
- [ ] Couleurs suffisamment contrastées
- [ ] Pas de détails distrayants dans les cases
- [ ] Format PNG transparent si bordure
- [ ] Testé avec le code d'alignement

---

## 🎯 RÈGLES DE DESIGN

### ✅ À FAIRE

- Respecter les mesures techniques EXACTEMENT
- Garder les cases suffisamment neutres (pas de détails complexes)
- Assurer un bon contraste entre cases claires/foncées
- Bordure décorative mais pas envahissante
- Thème cohérent et immersif

### ❌ À ÉVITER

- Modifier les dimensions du canvas
- Rendre les cases trop chargées visuellement
- Mauvais contraste (cases difficiles à distinguer)
- Bordures trop épaisses (>150px)
- Détails qui masquent les pièces
- Effets trop brillants/flashy

---

## 💡 CONSEILS

**Pour un plateau réussi :**

1. Commence simple (couleurs unies)
2. Ajoute subtilement des textures (10-20% opacity)
3. Teste avec les vraies pièces de jeu
4. Demande des retours visuels
5. Itère si besoin

**Si DALL-E génère mal :**

- Simplifie le prompt
- Génère plusieurs versions
- Retouche dans Photoshop/Figma si besoin
- L'important = les bonnes dimensions

---

## 🔗 FICHIERS RÉFÉRENCE

- `plateau-de-reglage.png` : Plateau technique avec mesures
- `board-asymmetric.png` : Plateau production principal
- `board-split.png` : Variante split dual theme
- `board-neutral.png` : Variante neutre élégant

---

## 📝 HISTORIQUE DES PLATEAUX

| Nom                | Date       | Thème        | Statut        |
| ------------------ | ---------- | ------------ | ------------- |
| plateau-de-reglage | 2024-12-21 | Technique    | ✅ Référence  |
| board-asymmetric   | 2024-12-21 | Koala vs Coq | ✅ Production |
| board-split        | 2024-12-21 | Dual Kingdom | ✅ Production |
| board-neutral      | 2024-12-21 | Élégant      | ✅ Production |

---

**VERSION :** 1.0  
**DERNIÈRE MAJ :** 21 Décembre 2024  
**AUTEUR :** Vivien @ VYXO Consulting

---

# ✨ PRÊT À CRÉER DE NOUVEAUX PLATEAUX !
