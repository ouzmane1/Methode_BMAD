/**
 * LocalStorage utility functions for Micro-Manager
 * Following BMAD methodology - Milestone 1
 */

import type { BoardState, SerializedBoardState, Task, SerializedTask } from '../types';

/** Key used to store board data in LocalStorage */
const STORAGE_KEY = 'micro-manager-board';

/**
 * Serializes a Task object to a format suitable for LocalStorage
 * Converts Date objects to ISO strings
 */
export function serializeTask(task: Task): SerializedTask {
    return {
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
    };
}

/**
 * Deserializes a Task object from LocalStorage format
 * Converts ISO strings back to Date objects
 */
export function deserializeTask(serializedTask: SerializedTask): Task {
    return {
        ...serializedTask,
        createdAt: new Date(serializedTask.createdAt),
        updatedAt: new Date(serializedTask.updatedAt),
    };
}

/**
 * Serializes the entire BoardState for LocalStorage
 */
export function serializeBoardState(boardState: BoardState): SerializedBoardState {
    return {
        columns: boardState.columns.map(column => ({
            id: column.id,
            title: column.title,
            tasks: column.tasks.map(serializeTask),
        })),
    };
}

/**
 * Deserializes the entire BoardState from LocalStorage
 */
export function deserializeBoardState(serializedState: SerializedBoardState): BoardState {
    return {
        columns: serializedState.columns.map(column => ({
            id: column.id,
            title: column.title,
            tasks: column.tasks.map(deserializeTask),
        })),
    };
}

/**
 * Saves the board state to LocalStorage
 * @param boardState - The current board state to save
 * @returns true if successful, false otherwise
 */
export function saveToLocalStorage(boardState: BoardState): boolean {
    try {
        const serialized = serializeBoardState(boardState);
        const jsonString = JSON.stringify(serialized);
        localStorage.setItem(STORAGE_KEY, jsonString);
        return true;
    } catch (error) {
        console.error('Error saving to LocalStorage:', error);
        return false;
    }
}

/**
 * Retrieves the board state from LocalStorage
 * @returns The board state if found, null otherwise
 */
export function getFromLocalStorage(): BoardState | null {
    try {
        const jsonString = localStorage.getItem(STORAGE_KEY);

        if (!jsonString) {
            return null;
        }

        const serialized = JSON.parse(jsonString) as SerializedBoardState;
        return deserializeBoardState(serialized);
    } catch (error) {
        console.error('Error reading from LocalStorage:', error);
        return null;
    }
}

/**
 * Clears the board data from LocalStorage
 * Useful for testing or resetting the application
 */
export function clearLocalStorage(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing LocalStorage:', error);
    }
}

/**
 * Checks if LocalStorage is available in the current environment
 * @returns true if LocalStorage is available, false otherwise
 */
export function isLocalStorageAvailable(): boolean {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}
