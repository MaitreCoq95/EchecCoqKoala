# 🗺️ COCORICHEST V3 - ROADMAP

## 📅 TIMELINE RECOMMANDÉE

**PRÉ-REQUIS:** V2 stable + multijoueur fonctionnel

---

## PHASE 1: PROTOTYPE CORE (2-3 semaines)

### Semaine 1: Prison Système
- [ ] Prison placement centre plateau
- [ ] 4 murs pierre basiques (HP tracking)
- [ ] Mécanique attaque mur (consomme tour)
- [ ] Pingouin statique case e4
- [ ] Condition victoire: atteindre e4

### Semaine 2: Assets & Visuel
- [ ] Générer pingouin emprisonné/libéré
- [ ] Générer 1 type mur (pierre)
- [ ] Prison complète (4 cases)
- [ ] Effet destruction simple
- [ ] Intégration plateau

### Semaine 3: Mode Course MVP
- [ ] Setup 1v1 avec prison
- [ ] UI HP murs visible
- [ ] Animation libération
- [ ] Test gameplay équilibrage
- [ ] Debug & polish

**LIVRABLE:** Mode Course jouable (basique)

---

## PHASE 2: MODES ALTERNATIFS (3-4 semaines)

### Semaine 4-5: Mode Coopération
- [ ] Timer countdown UI
- [ ] Gardiens IA (pathfinding simple)
- [ ] Système réparation murs
- [ ] Score coopératif calculé
- [ ] Ping/communication basique

### Semaine 6: Murs Spéciaux
- [ ] Mur glace (ralentissement)
- [ ] Mur flammes (brûlure)
- [ ] Mur régénérant (+1 HP)
- [ ] Assets pour 3 types
- [ ] Équilibrage HP/capacités

### Semaine 7: Polish Modes
- [ ] UI sélection mode
- [ ] Difficulté ajustable
- [ ] Stats fin de partie
- [ ] Leaderboards basiques
- [ ] Tests utilisateurs

**LIVRABLE:** 2 modes complets (Course + Coop)

---

## PHASE 3: CAMPAGNE (4-6 semaines)

### Semaine 8-9: Infrastructure
- [ ] Système chapitres/navigation
- [ ] Sauvegarde progression
- [ ] Unlock pouvoirs progressif
- [ ] Dialogues/textes narratifs
- [ ] 3 cutscenes illustrations

### Semaine 10-11: Contenu
- [ ] Chapitre 1 complet (tutorial)
- [ ] Chapitre 2 (puzzles)
- [ ] Chapitre 3 (gardiens)
- [ ] Chapitre 4 (branching)
- [ ] Chapitre 5 (boss fight)

### Semaine 12: Boss & Fin
- [ ] IA Boss (3 phases)
- [ ] Fins multiples (3 endings)
- [ ] Achievements système
- [ ] Cutscene finale
- [ ] Équilibrage difficulté

**LIVRABLE:** Campagne 5 chapitres complète

---

## PHASE 4: POUVOIRS & FEATURES (2-3 semaines)

### Semaine 13: Pouvoirs V3
- [ ] Bélier (destruction instant)
- [ ] Explosion (AoE)
- [ ] Percée (traverse mur)
- [ ] Combo (coop sync)
- [ ] Bénédiction (global debuff)
- [ ] UI/UX pouvoirs

### Semaine 14: Collectibles
- [ ] Plumes de pingouin (drops)
- [ ] Shop déblocables
- [ ] Skins pièces alternatifs
- [ ] Cosmétiques prison
- [ ] Système progression

### Semaine 15: Polish Final
- [ ] Animations fluides
- [ ] Effets particules
- [ ] Sons/musique
- [ ] Tutorial interactif
- [ ] Optimisations perfs

**LIVRABLE:** V3 feature-complete

---

## PHASE 5: TESTS & RELEASE (2 semaines)

### Semaine 16: Beta Testing
- [ ] Tests QA internes
- [ ] Balance gameplay
- [ ] Fix bugs critiques
- [ ] Feedback utilisateurs
- [ ] Ajustements dernière minute

### Semaine 17: Release Prep
- [ ] Marketing assets
- [ ] Trailer vidéo
- [ ] Documentation finale
- [ ] App store submission
- [ ] Déploiement production

**LIVRABLE:** V3 Release publique

---

## 📊 ALLOCATION RESSOURCES

**Dev Frontend:**
- 60% temps sur gameplay/UI
- 20% sur intégration assets
- 20% sur polish/animations

**Dev Backend:**
- 40% système sauvegarde
- 30% IA gardiens/boss
- 30% multijoueur sync

**Design/Assets:**
- 50% génération prompts DALL-E
- 30% intégration/ajustements
- 20% animations/effets

**Game Design:**
- 40% équilibrage gameplay
- 30% narrative/dialogues
- 30% progression/achievements

---

## 🎯 MILESTONES CRITIQUES

| Date | Milestone | Validation |
|------|-----------|------------|
| Sem 3 | Mode Course jouable | ✅ 1v1 fonctionnel |
| Sem 7 | Modes complets | ✅ Course + Coop OK |
| Sem 12 | Campagne terminée | ✅ 5 chapitres jouables |
| Sem 15 | Feature complete | ✅ Tous pouvoirs/features |
| Sem 17 | Release V3 | ✅ Déploiement public |

---

## ⚠️ RISQUES & MITIGATION

**Risque 1:** Équilibrage prison trop dur/facile
- **Mitigation:** Tests utilisateurs early, ajustement HP

**Risque 2:** IA gardiens trop complexe
- **Mitigation:** Pathfinding simple A*, comportements basiques

**Risque 3:** Campagne trop longue à développer
- **Mitigation:** Prioriser Ch1-3, Ch4-5 post-launch

**Risque 4:** Assets DALL-E pas parfaits
- **Mitigation:** Générer multiples versions, retouches Figma

**Risque 5:** Scope creep features
- **Mitigation:** Lock scope après Phase 2, features → V4

---

## 🚀 POST-LAUNCH (V3.1+)

**Quick Wins:**
- [ ] Nouveaux skins pingouin
- [ ] Challenges hebdomadaires
- [ ] Mode "Boss Rush"
- [ ] Replay système

**Moyen Terme:**
- [ ] Tournois multijoueur
- [ ] Éditeur de niveaux custom
- [ ] Partage niveaux communauté
- [ ] Cross-platform save

**Long Terme (V4):**
- [ ] Nouveaux modes (Tower Defense?)
- [ ] Nouveaux personnages prisonniers
- [ ] Méta-progression global
- [ ] Esport features

---

## 📦 DÉPENDANCES TECHNIQUES

**Nouvelles librairies:**
```json
{
  "pathfinding": "^0.4.18",
  "matter-js": "^0.19.0",
  "howler": "^2.2.3"
}
```

**Assets requis:**
- 15 images PNG (pièces/murs/effets)
- 5 illustrations cutscenes
- 10 icônes UI/badges
- 20 effets sonores
- 3 musiques (menu/jeu/victoire)

**Stockage données:**
- LocalStorage: 2-5 MB (saves campagne)
- Supabase: Leaderboards + stats globales

---

## ✅ DEFINITION OF DONE

**Une feature V3 est "DONE" si:**
- [ ] Code fonctionnel sans bugs critiques
- [ ] Assets intégrés et visuellement cohérents
- [ ] Testé sur 3+ appareils (PC/mobile/tablette)
- [ ] Documentation code/gameplay mise à jour
- [ ] Validé par 2+ testeurs externes

---

## 📈 MÉTRIQUES SUCCÈS

**Objectifs V3 Launch:**
- 70%+ completion rate Chapitre 1
- 40%+ joueurs essaient mode coop
- <5% taux abandon prison (trop difficile)
- 4.5+ rating moyen user feedback
- 50+ parties/jour mode Course

**KPIs à tracker:**
- Temps moyen libération pingouin
- Taux victoire par mode
- Pouvoirs les plus utilisés
- Chapitres abandonnés
- Satisfaction narrative (sondages)

---

**VERSION:** 1.0  
**OWNER:** Vivien @ VYXO  
**STATUS:** Draft - Pré-production  
**NEXT REVIEW:** Post V2 stable
