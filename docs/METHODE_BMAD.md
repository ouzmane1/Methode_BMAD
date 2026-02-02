# Aide-mémoire : La Méthode BMAD (Breakthrough Method)

Ce document récapitule les principes fondamentaux de la méthode BMAD pour structurer le développement assisté par IA.

---

## Les 4 Piliers (L'Acronyme)

| Lettre | Phase | Rôle de l'IA | Objectif |
| :--- | :--- | :--- | :--- |
| **B** | **Brief** | Analyste | Définir le **"Quoi"** et le **"Pourquoi"**. Éviter les malentendus. |
| **M** | **Model** | Architecte | Définir la structure technique et les **Types** (la source de vérité). |
| **A** | **Agile** | Product Manager | Découper le projet en **Milestones** digestes pour l'IA. |
| **D** | **Develop** | Développeur | Écrire le code en respectant strictement les plans établis. |

---

## Rôle des fichiers de "Mémoire" (Dossier `/docs`)

Le succès du BMAD repose sur la **mémoire externe**. L'IA a une fenêtre de contexte limitée ; ces fichiers servent d'ancres :

### 1. `product_context.md` (La Vision)
- **Rôle** : Définit le périmètre (Features).
- **Point fort** : Empêche le "Scope Creep" (quand le projet devient trop gros et flou). Si une feature n'est pas ici, elle n'existe pas.

### 2. `architecture.md` (La Source de Vérité)
- **Rôle** : Liste l'arborescence des fichiers et les interfaces TypeScript.
- **Point fort** : Garantit la cohérence. L'IA utilisera toujours les mêmes noms de propriétés (ex: `task.id` et non `task.uuid`) car elle relit ce fichier avant chaque action.

### 3. `progress.md` (Le Tableau de Bord)
- **Rôle** : Suit l'état d'avancement via des cases à cocher `[ ]`.
- **Point fort** : Permet de savoir exactement où on en est après une coupure. C'est le "GPS" du projet.

---

## Concepts Clés à Retenir

### 🔹 C'est quoi une "Milestone" ?
Une **Milestone** (Jalon) est une étape de développement qui produit un résultat testable. 
- On ne code pas tout d'un coup.
- On valide une Milestone avant de passer à la suivante.
- *Avantage :* Si un bug apparaît, on sait exactement dans quelle étape il a été introduit.

### 🔹 Pourquoi utiliser des "Personas" ?
L'IA est plus performante quand son rôle est restreint :
- **L'Architecte** : Ne code pas, il conçoit (fichiers `.md`).
- **Le Product Manager** : Ne code pas, il planifie (`progress.md`).
- **Le Développeur** : Ne discute pas la stratégie, il implémente (`/src`).

---

## Pourquoi ça marche ?

1. **Moins d'erreurs** : L'IA n'invente rien, elle suit tes documents.
2. **Scalabilité** : Tu peux construire des apps complexes en les découpant intelligemment.
3. **Collaboration** : Un humain ou une autre IA peut reprendre le projet instantanément en lisant le dossier `/docs`.

---
*Document généré pour le projet Micro-Manager - 2026*