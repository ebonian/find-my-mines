'use client';

import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { cn } from '../../../../_lib/utils';
import Image from 'next/image';

// Define the cell status type and cell interface
type cellStatus = 'hidden' | 'revealed' | 'flagged';

interface cell {
    hasMine: boolean;
    // adjacentMines: number;
    status: cellStatus;
}

interface MinesweeperProps {
    setMinesFounded: Dispatch<SetStateAction<number>>;
    resetTimer: () => void; // Add resetTimer to the props
    switchTurn: () => void;
    turn: 'user' | 'opponent' | null;
    onAction: (
        userId: string,
        cellId: string | null,
        bombFounded: boolean
    ) => void;
}

// Board size and number of mines
const boardSize = 6;
const numOfMines = 11;

// Utility function to generate the board
const createBoard = (size: number, mines: number): cell[][] => {
    let board: cell[][] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ({
            hasMine: false,
            adjacentMines: 0,
            status: 'hidden',
        }))
    );

    // Add mines randomly
    let placedMines = 0;
    while (placedMines < mines) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (!board[row]![col]!.hasMine) {
            board[row]![col]!.hasMine = true;
            placedMines++;
        }
    }

    return board;
};

// Main Minesweeper component
const Minesweeper: React.FC<MinesweeperProps> = ({
    setMinesFounded,
    resetTimer,
    switchTurn,
    turn,
    onAction,
}) => {
    const [board, setBoard] = useState<cell[][]>(
        createBoard(boardSize, numOfMines)
    );
    const [userAction, setUserAction] = useState<{
        cellId: string | null;
        bombFounded: boolean;
    } | null>(null);
    const [currentActionIndex, setCurrentActionIndex] = useState(0);
    const [revealedMineCount, setRevealedMineCount] = useState(0);

    // Sample hardcoded action array for opponent's turn
    const Actions = [
        { actionId: 1, userId: 'opponent', cellId: '0-0', bombFounded: false },
        { actionId: 2, userId: 'opponent', cellId: '1-2', bombFounded: true },
        { actionId: 3, userId: 'opponent', cellId: '2-3', bombFounded: false },
        { actionId: 4, userId: 'opponent', cellId: '3-1', bombFounded: true },
        // Add more actions as needed
    ];
    // Update the mines founded based on flags and revealed mines
    useEffect(() => {
        const foundedMines = revealedMineCount; // Correctly flagged or revealed mines
        setMinesFounded(foundedMines);
    }, [revealedMineCount, setMinesFounded]);

    // Handle cell click for revealing or flagging
    const clickHandlerComponent = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        rowIndex: number,
        colIndex: number
    ) => {
        if (turn !== 'user') {
            return;
        }
        const newBoard = [...board];
        if (newBoard[rowIndex]![colIndex]!.status === 'revealed') {
            return;
        }
        if (event.button === 0) {
            newBoard[rowIndex]![colIndex]!.status = 'revealed';

            // If a mine is revealed, increase the revealedMineCount
            if (newBoard[rowIndex]![colIndex]!.hasMine) {
                setRevealedMineCount((prev) => prev + 1);
                onAction('user', `${rowIndex}-${colIndex}`, true);
                switchTurn();
            } else {
                onAction('user', `${rowIndex}-${colIndex}`, false);
                switchTurn();
            }

            // Reset the timer when a cell is revealed
            switchTurn();
            resetTimer();
        }
        setBoard(newBoard);
    };

    // Opponent's Turn - Auto Play Logic
    useEffect(() => {
        if (turn === 'opponent' && currentActionIndex < Actions.length) {
            const action = Actions[currentActionIndex];

            // Ensure action and cellId are defined before proceeding
            if (action && action.cellId) {
                const [rowIndexStr, colIndexStr] = action.cellId.split('-');
                const rowIndex = Number(rowIndexStr);
                const colIndex = Number(colIndexStr);

                // Ensure the indices are valid numbers
                if (
                    !isNaN(rowIndex) &&
                    !isNaN(colIndex) &&
                    rowIndex >= 0 &&
                    rowIndex < boardSize &&
                    colIndex >= 0 &&
                    colIndex < boardSize
                ) {
                    const newBoard = [...board];
                    newBoard[rowIndex]![colIndex]!.status = 'revealed';

                    // Simulate the opponent action
                    if (action.bombFounded) {
                        setRevealedMineCount((prev) => prev + 1);
                        onAction(action.userId, action.cellId, true); // Bomb found
                    } else {
                        onAction(action.userId, action.cellId, false); // No bomb
                    }

                    setBoard(newBoard);
                    setCurrentActionIndex((prev) => prev + 1); // Move to the next action

                    // Switch turn after the opponent action, with a slight delay for UX purposes
                    setTimeout(() => {
                        // If the opponent has more actions, continue; otherwise, switch back to the user
                        if (currentActionIndex < Actions.length - 1) {
                            setCurrentActionIndex((prev) => prev + 1); // Move to next opponent action
                        } else {
                            switchTurn(); // Switch back to the user
                        }
                    }, 2000); // Add a 2-second delay for better UX
                }
            }
        }
    }, [
        turn,
        currentActionIndex,
        Actions,
        boardSize,
        board,
        onAction,
        switchTurn,
    ]);

    return (
        <div>
            {/* Map through the board and render each cell */}
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={cn(
                                'relative h-24 w-24',
                                cell.status === 'revealed'
                                    ? 'border-rgba(255, 237, 223,0.65) border-opacity-0.2 border-2 bg-[#0D1321] bg-opacity-65'
                                    : (rowIndex + colIndex) % 2 === 0
                                      ? 'bg-[#191B27]'
                                      : 'bg-black'
                            )}
                            onClick={(e) =>
                                clickHandlerComponent(e, rowIndex, colIndex)
                            }
                            onContextMenu={(e) =>
                                clickHandlerComponent(e, rowIndex, colIndex)
                            }
                        >
                            {/* Reveal the cell status if it is revealed */}
                            {cell.status === 'flagged' ? (
                                <Image
                                    src='/flag.svg'
                                    alt='flag'
                                    fill
                                    className='object-contain'
                                />
                            ) : null}
                            {cell.status === 'revealed' &&
                                (cell.hasMine ? (
                                    <Image
                                        src='/bomb.svg'
                                        alt='bomb'
                                        fill
                                        className='object-contain'
                                    />
                                ) : null)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export { Minesweeper };
