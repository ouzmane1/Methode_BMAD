/**
 * Board Component - Main container displaying all columns
 * Following BMAD methodology - Milestone 4 (with Drag & Drop)
 */

import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { Column } from './Column';

export function Board() {
    const { boardState } = useTaskContext();

    // Shared drag & drop state across all columns
    const dragAndDropHandlers = useDragAndDrop();

    return (
        <div className="w-full h-full p-6 bg-gradient-to-br from-gray-100 to-gray-200">
            {/* Board Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    📋 Micro-Manager
                </h1>
                <p className="text-gray-600 text-sm">
                    Gérez vos tâches simplement et efficacement
                </p>
            </div>

            {/* Columns Container */}
            <div className="flex gap-6 overflow-x-auto pb-4">
                {boardState.columns.map(column => (
                    <Column
                        key={column.id}
                        column={column}
                        dragAndDropHandlers={dragAndDropHandlers}
                    />
                ))}
            </div>

            {/* Footer Info */}
            <div className="mt-6 text-center text-xs text-gray-500">
                <p>💾 Vos données sont sauvegardées automatiquement dans votre navigateur</p>
            </div>
        </div>
    );
}
