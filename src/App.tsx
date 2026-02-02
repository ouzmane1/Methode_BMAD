/**
 * App Component - Main application entry point
 * Following BMAD methodology - Milestone 3
 */

import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { Board } from './components/Board';

function App() {
    return (
        <TaskProvider>
            <div className="min-h-screen bg-gray-100">
                <Board />
            </div>
        </TaskProvider>
    );
}

export default App;
