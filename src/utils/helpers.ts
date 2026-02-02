/**
 * Helper utility functions for Micro-Manager
 * Following BMAD methodology - Milestone 1
 */

import type { Task, TaskStatus, Column, BoardState } from '../types';

/**
 * Generates a unique ID for tasks
 * Uses timestamp + random string for uniqueness
 * @returns A unique string identifier
 */
export function generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 9);
    return `${timestamp}-${randomStr}`;
}

/**
 * Creates a new task with default values
 * @param title - The title of the task
 * @param status - The initial status/column (default: 'todo')
 * @param description - Optional description
 * @returns A new Task object
 */
export function createTask(
    title: string,
    status: TaskStatus = 'todo',
    description?: string
): Task {
    const now = new Date();

    return {
        id: generateUniqueId(),
        title,
        description,
        status,
        createdAt: now,
        updatedAt: now,
        order: 0, // Will be set based on column position
    };
}

/**
 * Sorts tasks by their order property
 * @param tasks - Array of tasks to sort
 * @returns Sorted array of tasks (ascending order)
 */
export function sortTasksByOrder(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.order - b.order);
}

/**
 * Reorders tasks after a position change
 * Updates the order property for all tasks in the array
 * @param tasks - Array of tasks to reorder
 * @returns Array of tasks with updated order values
 */
export function reorderTasks(tasks: Task[]): Task[] {
    return tasks.map((task, index) => ({
        ...task,
        order: index,
        updatedAt: new Date(),
    }));
}

/**
 * Finds a task by ID across all columns
 * @param boardState - The current board state
 * @param taskId - The ID of the task to find
 * @returns The task if found, undefined otherwise
 */
export function findTaskById(boardState: BoardState, taskId: string): Task | undefined {
    for (const column of boardState.columns) {
        const task = column.tasks.find(t => t.id === taskId);
        if (task) return task;
    }
    return undefined;
}

/**
 * Finds the column containing a specific task
 * @param boardState - The current board state
 * @param taskId - The ID of the task
 * @returns The column containing the task, undefined if not found
 */
export function findColumnByTaskId(boardState: BoardState, taskId: string): Column | undefined {
    return boardState.columns.find(column =>
        column.tasks.some(task => task.id === taskId)
    );
}

/**
 * Creates the initial/default board state
 * Three empty columns: To Do, Doing, Done
 * @returns A new BoardState with empty columns
 */
export function createInitialBoardState(): BoardState {
    return {
        columns: [
            {
                id: 'todo',
                title: 'To Do',
                tasks: [],
            },
            {
                id: 'doing',
                title: 'Doing',
                tasks: [],
            },
            {
                id: 'done',
                title: 'Done',
                tasks: [],
            },
        ],
    };
}

/**
 * Validates if a string is a valid TaskStatus
 * @param status - String to validate
 * @returns true if valid TaskStatus, false otherwise
 */
export function isValidTaskStatus(status: string): status is TaskStatus {
    return ['todo', 'doing', 'done'].includes(status);
}

/**
 * Gets the display title for a TaskStatus
 * @param status - The TaskStatus
 * @returns The display title
 */
export function getStatusTitle(status: TaskStatus): string {
    const titles: Record<TaskStatus, string> = {
        todo: 'To Do',
        doing: 'Doing',
        done: 'Done',
    };
    return titles[status];
}
