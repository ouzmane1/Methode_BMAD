/**
 * Column Component - Displays tasks for a specific status
 * Following BMAD methodology - Milestone 4 (with Drag & Drop)
 */

import React, { useState } from 'react';
import type { Column as ColumnType, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { useTaskContext } from '../context/TaskContext';

interface ColumnProps {
    column: ColumnType;
    dragAndDropHandlers: {
        handleDragStart: (taskId: string, columnId: TaskStatus) => void;
        handleDragOver: (e: React.DragEvent, columnId: TaskStatus) => void;
        handleDragLeave: () => void;
        handleDrop: (e: React.DragEvent, columnId: TaskStatus, onMove: (taskId: string, targetStatus: TaskStatus, targetIndex: number) => void) => void;
        handleDragEnd: () => void;
        isColumnDragTarget: (columnId: TaskStatus) => boolean;
        isTaskDragging: (taskId: string) => boolean;
    };
}

export function Column({ column, dragAndDropHandlers }: ColumnProps) {
    const { addTask, deleteTask, moveTask } = useTaskContext();
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const {
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
        isColumnDragTarget,
        isTaskDragging,
    } = dragAndDropHandlers;

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(
                newTaskTitle.trim(),
                column.id,
                newTaskDescription.trim() || undefined
            );
            setNewTaskTitle('');
            setNewTaskDescription('');
            setIsAdding(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAddTask();
        } else if (e.key === 'Escape') {
            setIsAdding(false);
            setNewTaskTitle('');
            setNewTaskDescription('');
        }
    };

    // Column header colors based on status
    const getColumnColor = (status: TaskStatus) => {
        switch (status) {
            case 'todo':
                return 'bg-gradient-to-r from-slate-500 to-slate-600';
            case 'doing':
                return 'bg-gradient-to-r from-blue-500 to-blue-600';
            case 'done':
                return 'bg-gradient-to-r from-green-500 to-green-600';
            default:
                return 'bg-gray-500';
        }
    };

    const isDragTarget = isColumnDragTarget(column.id);

    return (
        <div
            className={`
                flex flex-col h-full bg-gray-50 rounded-xl shadow-sm border-2 min-w-[320px]
                transition-all duration-200
                ${isDragTarget
                    ? 'border-blue-400 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200'
                }
            `}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id, moveTask)}
        >
            {/* Column Header */}
            <div className={`${getColumnColor(column.id)} text-white px-4 py-3 rounded-t-xl`}>
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">{column.title}</h2>
                    <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm font-semibold">
                        {column.tasks.length}
                    </span>
                </div>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 min-h-[200px]">
                {column.tasks.length === 0 && !isAdding ? (
                    <div className="text-center text-gray-400 text-sm mt-8">
                        <p>Aucune tâche</p>
                        <p className="text-xs mt-1">
                            {isDragTarget ? '👆 Déposez ici' : 'Cliquez sur + pour ajouter'}
                        </p>
                    </div>
                ) : (
                    column.tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            isDragging={isTaskDragging(task.id)}
                        />
                    ))
                )}

                {/* Add Task Form */}
                {isAdding && (
                    <div className="bg-white rounded-lg shadow-md border-2 border-blue-300 p-3 animate-fadeIn">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Titre de la tâche..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <textarea
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Description (optionnel)..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleAddTask}
                                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                                Ajouter
                            </button>
                            <button
                                onClick={() => {
                                    setIsAdding(false);
                                    setNewTaskTitle('');
                                    setNewTaskDescription('');
                                }}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Task Button */}
            {!isAdding && (
                <div className="p-3 border-t border-gray-200">
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                    >
                        <span className="text-lg">+</span>
                        <span>Ajouter une tâche</span>
                    </button>
                </div>
            )}
        </div>
    );
}
