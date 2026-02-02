# Micro-Manager

Application web simple pour gérer des tâches par colonnes (To Do, Doing, Done).

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
```

## 🛠️ Stack technique

- **Frontend** : React + TypeScript
- **Styling** : Tailwind CSS
- **Build** : Vite
- **State Management** : Context API (hooks natifs)
- **Persistance** : LocalStorage

## 📁 Structure du projet

```
src/
├── components/       # Composants React
│   ├── Board.tsx
│   ├── Column.tsx
│   └── TaskCard.tsx
├── context/          # Context API
│   └── TaskContext.tsx
├── hooks/            # Hooks personnalisés
│   └── useLocalStorage.ts
├── types/            # Définitions TypeScript
│   └── index.ts
├── utils/            # Fonctions utilitaires
│   ├── helpers.ts
│   └── storage.ts
├── styles/           # Styles globaux
│   └── index.css
├── App.tsx           # Composant racine
└── index.tsx         # Point d'entrée
```

## ✨ Fonctionnalités

- ✅ Création de colonnes (To Do, Doing, Done)
- ✅ Ajout de tâches avec titre et description
- ✅ Suppression de tâches
- ✅ Persistance locale (LocalStorage)
- ✅ Design moderne et responsive
- 🔄 Drag & drop (à venir - Milestone 4)

## 📝 Développement selon BMAD

Ce projet suit la méthode BMAD (Build, Measure, Analyze, Deploy) :

- **Milestone 1** : Fondations TypeScript & Stockage ✅
- **Milestone 2** : Context & État Global ✅
- **Milestone 3** : Composants UI de Base ✅
- **Milestone 4** : Drag & Drop et Finitions 🔄

Voir `docs/progress.md` pour le suivi détaillé.
