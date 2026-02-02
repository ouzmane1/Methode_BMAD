/**
 * TaskCard Component - Displays a single task card
 * Following BMAD methodology - Milestone 4 (with Drag & Drop)
 */

import React from 'react';
import type { Task, TaskStatus } from '../types';

interface TaskCardProps {
    task: Task;
    onDelete?: (taskId: string) => void;
    onEdit?: (taskId: string) => void;
    onDragStart?: (taskId: string, columnId: TaskStatus) => void;
    onDragEnd?: () => void;
    isDragging?: boolean;
}

export function TaskCard({ task, onDelete, onEdit, onDragStart, onDragEnd, isDragging }: TaskCardProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
        });
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
        if (onDragStart) {
            onDragStart(task.id, task.status);
        }
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            className={`
                bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 
                hover:shadow-md transition-all duration-200 group cursor-move
                ${isDragging ? 'opacity-50 scale-95 rotate-2' : 'opacity-100 scale-100'}
            `}
        >
            {/* Drag indicator */}
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs">⋮⋮</span>
                {/* Task Title */}
                <h3 className="font-semibold text-gray-800 text-sm flex-1">
                    {task.title}
                </h3>
            </div>

            {/* Task Description (if exists) */}
            {task.description && (
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Footer with date and actions */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                    {formatDate(task.createdAt)}
                </span>

                {/* Action buttons (visible on hover) */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(task.id)}
                            className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                            aria-label="Modifier la tâche"
                        >
                            ✏️
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(task.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                            aria-label="Supprimer la tâche"
                        >
                            🗑️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
