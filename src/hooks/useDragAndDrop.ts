/**
 * Custom hook for Drag and Drop functionality
 * Following BMAD methodology - Milestone 4
 */

import { useState, useCallback } from 'react';
import type { TaskStatus } from '../types';

interface DragState {
    draggedTaskId: string | null;
    sourceColumnId: TaskStatus | null;
    targetColumnId: TaskStatus | null;
}

/**
 * Hook to manage drag and drop state and handlers
 */
export function useDragAndDrop() {
    const [dragState, setDragState] = useState<DragState>({
        draggedTaskId: null,
        sourceColumnId: null,
        targetColumnId: null,
    });

    /**
     * Handler when drag starts
     */
    const handleDragStart = useCallback((taskId: string, columnId: TaskStatus) => {
        setDragState({
            draggedTaskId: taskId,
            sourceColumnId: columnId,
            targetColumnId: null,
        });
    }, []);

    /**
     * Handler when dragging over a column
     */
    const handleDragOver = useCallback((e: React.DragEvent, columnId: TaskStatus) => {
        e.preventDefault(); // Required to allow drop
        e.dataTransfer.dropEffect = 'move';

        setDragState(prev => ({
            ...prev,
            targetColumnId: columnId,
        }));
    }, []);

    /**
     * Handler when leaving a column
     */
    const handleDragLeave = useCallback(() => {
        setDragState(prev => ({
            ...prev,
            targetColumnId: null,
        }));
    }, []);

    /**
     * Handler when drop occurs
     */
    const handleDrop = useCallback((
        e: React.DragEvent,
        columnId: TaskStatus,
        onMove: (taskId: string, targetStatus: TaskStatus, targetIndex: number) => void
    ) => {
        e.preventDefault();

        if (dragState.draggedTaskId) {
            // Calculate drop position (end of column for now)
            onMove(dragState.draggedTaskId, columnId, 0);
        }

        // Reset drag state
        setDragState({
            draggedTaskId: null,
            sourceColumnId: null,
            targetColumnId: null,
        });
    }, [dragState.draggedTaskId]);

    /**
     * Handler when drag ends (cleanup)
     */
    const handleDragEnd = useCallback(() => {
        setDragState({
            draggedTaskId: null,
            sourceColumnId: null,
            targetColumnId: null,
        });
    }, []);

    /**
     * Check if a column is being dragged over
     */
    const isColumnDragTarget = useCallback((columnId: TaskStatus) => {
        return dragState.targetColumnId === columnId && dragState.draggedTaskId !== null;
    }, [dragState]);

    /**
     * Check if a task is currently being dragged
     */
    const isTaskDragging = useCallback((taskId: string) => {
        return dragState.draggedTaskId === taskId;
    }, [dragState.draggedTaskId]);

    return {
        dragState,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
        isColumnDragTarget,
        isTaskDragging,
    };
}
