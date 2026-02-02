/**
 * Custom hook for LocalStorage persistence
 * Following BMAD methodology - Milestone 2 (Enhanced)
 */

import { useState, useEffect, useCallback } from 'react';
import type { BoardState } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import { createInitialBoardState } from '../utils/helpers';

/**
 * Type for setState function that accepts value or updater function
 */
type SetStateAction = BoardState | ((prevState: BoardState) => BoardState);

/**
 * Custom hook that manages BoardState with automatic LocalStorage persistence
 * Supports both direct values and updater functions for better reactivity
 * @returns Tuple of [boardState, setBoardState]
 */
export function useLocalStorage(): [BoardState, (stateAction: SetStateAction) => void] {
    // Initialize state from LocalStorage or use default
    const [boardState, setBoardStateInternal] = useState<BoardState>(() => {
        const stored = getFromLocalStorage();
        return stored || createInitialBoardState();
    });

    // Wrapper function that saves to LocalStorage whenever state changes
    // Supports both direct values and updater functions
    const setBoardState = useCallback((stateAction: SetStateAction) => {
        setBoardStateInternal(prevState => {
            // Determine the new state
            const newState = typeof stateAction === 'function'
                ? stateAction(prevState)
                : stateAction;

            // Save to LocalStorage
            saveToLocalStorage(newState);

            return newState;
        });
    }, []);

    // Load from LocalStorage on mount (in case it was updated externally)
    useEffect(() => {
        const stored = getFromLocalStorage();
        if (stored) {
            setBoardStateInternal(stored);
        }
    }, []);

    return [boardState, setBoardState];
}
