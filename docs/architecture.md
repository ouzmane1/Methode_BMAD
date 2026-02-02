# Tech Stack & Architecture
- **Frontend** : React + Tailwind CSS
- **State Management** : Hooks natifs (useState/useContext)
- **Persistance** : Browser LocalStorage
- **Contraintes** : 
  - Code modulaire (un composant par fichier).
  - Utilisation de TypeScript pour la robustesse.

## Structure TypeScript (Types)
export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;                    
  title: string;                 
  description?: string;          
  status: TaskStatus;            
  createdAt: Date;               
  updatedAt: Date;               
  order: number;                 
}

export interface Column {
  id: TaskStatus;                
  title: string;                 
  tasks: Task[];                 
}

export interface BoardState {
  columns: Column[];             
}

## Arborescence cible (/src)
```text
src/
├── index.tsx                    # Point d'entrée
├── App.tsx                      # Composant racine
├── types/
│   └── index.ts                 # Définitions TypeScript
├── components/
│   ├── Board.tsx                # Tableau
│   ├── Column.tsx               # Colonne
│   ├── TaskCard.tsx             # Carte
│   └── AddTaskButton.tsx        # Bouton d'ajout
├── hooks/
│   ├── useLocalStorage.ts       # Persistance
│   └── useDragAndDrop.ts        # Drag & drop
├── context/
│   └── TaskContext.tsx          # État global
└── utils/
    ├── storage.ts               # LocalStorage helpers
    └── helpers.ts               # Divers

