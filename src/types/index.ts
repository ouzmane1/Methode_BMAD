/**
 * Type definitions for Micro-Manager application
 * Following BMAD methodology - Milestone 1
 */

/**
 * Possible status values for a task
 * Corresponds to the three columns: To Do, Doing, Done
 */
export type TaskStatus = 'todo' | 'doing' | 'done';

/**
 * Task interface representing a single task card
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  
  /** Title of the task */
  title: string;
  
  /** Optional description providing more details */
  description?: string;
  
  /** Current status/column of the task */
  status: TaskStatus;
  
  /** Timestamp when the task was created */
  createdAt: Date;
  
  /** Timestamp when the task was last updated */
  updatedAt: Date;
  
  /** Order/position of the task within its column (for sorting) */
  order: number;
}

/**
 * Column interface representing a single column in the board
 */
export interface Column {
  /** Unique identifier matching TaskStatus */
  id: TaskStatus;
  
  /** Display title for the column */
  title: string;
  
  /** Array of tasks belonging to this column */
  tasks: Task[];
}

/**
 * BoardState interface representing the entire board state
 */
export interface BoardState {
  /** Array of all columns in the board */
  columns: Column[];
}

/**
 * Serialized version of Task for LocalStorage
 * Dates are stored as ISO strings
 */
export interface SerializedTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  order: number;
}

/**
 * Serialized version of BoardState for LocalStorage
 */
export interface SerializedBoardState {
  columns: {
    id: TaskStatus;
    title: string;
    tasks: SerializedTask[];
  }[];
}
