'use client';

import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { cn } from '../../../_lib/utils';
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
}) => {
    const [board, setBoard] = useState<cell[][]>(
        createBoard(boardSize, numOfMines)
    );
    const [flaggedCount, setFlaggedCount] = useState(0);
    const [revealedMineCount, setRevealedMineCount] = useState(0);

    // Update the mines founded based on flags and revealed mines
    useEffect(() => {
        const foundedMines = flaggedCount + revealedMineCount; // Correctly flagged or revealed mines
        setMinesFounded(foundedMines);
    }, [flaggedCount, revealedMineCount, setMinesFounded]);

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
            }

            // Reset the timer when a cell is revealed
            switchTurn();
            resetTimer();
        } else if (event.button === 2) {
            event.preventDefault();
            event.stopPropagation();
            if (newBoard[rowIndex]![colIndex]!.status === 'hidden') {
                newBoard[rowIndex]![colIndex]!.status = 'flagged';
                setFlaggedCount((prev) => prev + 1); // Increment flagged count
            } else if (newBoard[rowIndex]![colIndex]!.status === 'flagged') {
                newBoard[rowIndex]![colIndex]!.status = 'hidden';
                setFlaggedCount((prev) => prev - 1); // Decrement flagged count
            }
        }
        setBoard(newBoard);
    };

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
