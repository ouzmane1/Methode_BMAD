/**
 * TaskContext - Global state management for Micro-Manager
 * Following BMAD methodology - Milestone 2
 */

import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import type { BoardState, Task, TaskStatus } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { createTask, reorderTasks, findTaskById, findColumnByTaskId } from '../utils/helpers';

/**
 * Shape of the Task Context value
 */
interface TaskContextValue {
    /** Current board state */
    boardState: BoardState;

    /** Add a new task to a specific column */
    addTask: (title: string, status: TaskStatus, description?: string) => void;

    /** Update an existing task */
    updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;

    /** Delete a task by ID */
    deleteTask: (taskId: string) => void;

    /** Move a task to a different column and/or position */
    moveTask: (taskId: string, targetStatus: TaskStatus, targetIndex: number) => void;

    /** Reorder a task within the same column */
    reorderTaskInColumn: (taskId: string, newIndex: number) => void;
}

/**
 * Task Context
 */
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

/**
 * Props for TaskProvider
 */
interface TaskProviderProps {
    children: ReactNode;
}

/**
 * TaskProvider component - Wraps the app to provide global task state
 */
export function TaskProvider({ children }: TaskProviderProps) {
    const [boardState, setBoardState] = useLocalStorage();

    /**
     * Add a new task to a column
     */
    const addTask = useCallback((title: string, status: TaskStatus, description?: string) => {
        const newTask = createTask(title, status, description);

        setBoardState(prevState => {
            const updatedColumns = prevState.columns.map(column => {
                if (column.id === status) {
                    // Add task to the end of the column
                    const updatedTasks = [...column.tasks, newTask];
                    // Reorder to ensure correct order values
                    return {
                        ...column,
                        tasks: reorderTasks(updatedTasks),
                    };
                }
                return column;
            });

            return { columns: updatedColumns };
        });
    }, [setBoardState]);

    /**
     * Update an existing task
     */
    const updateTask = useCallback((
        taskId: string,
        updates: Partial<Omit<Task, 'id' | 'createdAt'>>
    ) => {
        setBoardState(prevState => {
            const updatedColumns = prevState.columns.map(column => {
                const taskIndex = column.tasks.findIndex(t => t.id === taskId);

                if (taskIndex !== -1) {
                    const updatedTasks = [...column.tasks];
                    updatedTasks[taskIndex] = {
                        ...updatedTasks[taskIndex],
                        ...updates,
                        updatedAt: new Date(),
                    };

                    return {
                        ...column,
                        tasks: updatedTasks,
                    };
                }

                return column;
            });

            return { columns: updatedColumns };
        });
    }, [setBoardState]);

    /**
     * Delete a task by ID
     */
    const deleteTask = useCallback((taskId: string) => {
        setBoardState(prevState => {
            const updatedColumns = prevState.columns.map(column => {
                const filteredTasks = column.tasks.filter(t => t.id !== taskId);

                // If tasks were removed, reorder remaining tasks
                if (filteredTasks.length !== column.tasks.length) {
                    return {
                        ...column,
                        tasks: reorderTasks(filteredTasks),
                    };
                }

                return column;
            });

            return { columns: updatedColumns };
        });
    }, [setBoardState]);

    /**
     * Move a task to a different column and/or position
     */
    const moveTask = useCallback((
        taskId: string,
        targetStatus: TaskStatus,
        targetIndex: number
    ) => {
        setBoardState(prevState => {
            // Find the task and its current column
            let taskToMove: Task | undefined;
            let sourceColumnId: TaskStatus | undefined;

            for (const column of prevState.columns) {
                const task = column.tasks.find(t => t.id === taskId);
                if (task) {
                    taskToMove = task;
                    sourceColumnId = column.id;
                    break;
                }
            }

            if (!taskToMove || !sourceColumnId) {
                console.warn(`Task ${taskId} not found`);
                return prevState;
            }

            // Update the task's status
            const updatedTask: Task = {
                ...taskToMove,
                status: targetStatus,
                updatedAt: new Date(),
            };

            const updatedColumns = prevState.columns.map(column => {
                // Remove from source column
                if (column.id === sourceColumnId) {
                    const filteredTasks = column.tasks.filter(t => t.id !== taskId);
                    return {
                        ...column,
                        tasks: sourceColumnId === targetStatus ? filteredTasks : reorderTasks(filteredTasks),
                    };
                }

                // Add to target column
                if (column.id === targetStatus) {
                    const newTasks = [...column.tasks];

                    // If moving within the same column, don't add duplicate
                    if (sourceColumnId !== targetStatus) {
                        newTasks.splice(targetIndex, 0, updatedTask);
                    } else {
                        // Moving within same column - insert at new position
                        const currentIndex = newTasks.findIndex(t => t.id === taskId);
                        if (currentIndex !== -1) {
                            newTasks.splice(currentIndex, 1);
                        }
                        newTasks.splice(targetIndex, 0, updatedTask);
                    }

                    return {
                        ...column,
                        tasks: reorderTasks(newTasks),
                    };
                }

                return column;
            });

            return { columns: updatedColumns };
        });
    }, [setBoardState]);

    /**
     * Reorder a task within the same column
     */
    const reorderTaskInColumn = useCallback((taskId: string, newIndex: number) => {
        setBoardState(prevState => {
            const column = findColumnByTaskId(prevState, taskId);
            if (!column) {
                console.warn(`Task ${taskId} not found`);
                return prevState;
            }

            moveTask(taskId, column.id, newIndex);
            return prevState;
        });
    }, [setBoardState, moveTask]);

    const value: TaskContextValue = {
        boardState,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        reorderTaskInColumn,
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
}

/**
 * Custom hook to use the Task Context
 * @throws Error if used outside of TaskProvider
 */
export function useTaskContext(): TaskContextValue {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }

    return context;
}
