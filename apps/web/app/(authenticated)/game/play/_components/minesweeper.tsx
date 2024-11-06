'use client';

import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { cn } from '../../../../_lib/utils';
import Image from 'next/image';
import { useGameContext } from '../../../../_contexts/game';
import { useAuthContext } from '../../../../_contexts/auth';

type cellStatus = 'hidden' | 'revealed' | 'flagged';

interface Cell {
    hasMine: boolean;
    status: cellStatus;
}

interface MinesweeperProps {
    seedAndType: {
        seed: string;
        type: 'normal' | 'extreme';
    };
    resetTimer: () => void;
    switchTurn: () => void;
    onEnd: () => void;
}

const coordinatesGen = ({
    seed,
    type,
}: {
    seed: string;
    type: 'normal' | 'extreme';
}): { x: number; y: number }[] => {
    const coordAmount = type === 'normal' ? 11 : 35;
    const coordMax = type === 'normal' ? 6 : 9;
    const coordinates = new Set<string>();
    let jumper = 0;
    let runner = 0;

    while (coordinates.size < coordAmount) {
        const segmentX = seed.substring(
            runner * 4,
            (runner * 4 + 1 + jumper) % coordAmount
        );
        const segmentY = seed.substring(
            runner * 4 + 2,
            (runner * 4 + 3 + jumper) % coordAmount
        );
        const numCodeX = Array.from(segmentX).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const numCodeY = Array.from(segmentY).reduce(
            (acc, char) => acc + char.charCodeAt(0),
            0
        );
        const coorX = Math.floor(numCodeX) % coordMax;
        const coorY = Math.floor(numCodeY) % coordMax;
        const coordKey = `${coorX},${coorY}`;

        coordinates.add(coordKey);
        runner += 1;
        if (runner === coordAmount) {
            runner = 0;
            jumper += 1;
        }
    }

    const coordinatesArray = Array.from(coordinates).map((coord: string) => {
        const [x, y] = coord.split(',').map(Number);
        if (x !== undefined && y !== undefined) {
            return { x, y };
        } else {
            throw new Error(`Invalid coordinate generated: ${coord}`);
        }
    });

    return coordinatesArray;
};

const createBoard = (
    size: number,
    mines: number,
    coordinates: { x: number; y: number }[]
): Cell[][] => {
    let board: Cell[][] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ({
            hasMine: false,
            adjacentMines: 0,
            status: 'hidden',
        }))
    );

    for (let i = 0; i < mines; i++) {
        const row = coordinates[i]!['y'];
        const col = coordinates[i]!['x'];
        board[row]![col]!.hasMine = true;
    }

    return board;
};

const Minesweeper: React.FC<MinesweeperProps> = ({
    seedAndType,
    resetTimer,
    switchTurn,
    onEnd,
}) => {
    const { user } = useAuthContext();
    const { equippedSkin, skins, actions, setActionHandler, game, setTurn } =
        useGameContext();
    const activeSkin = skins.find((skin) => skin.name === equippedSkin)!;

    const boardSize = seedAndType.type === 'normal' ? 6 : 9;
    const numOfMines = seedAndType.type === 'normal' ? 11 : 35;
    const coordinates = coordinatesGen(seedAndType);
    const board = createBoard(boardSize, numOfMines, coordinates);

    const clickHandlerComponent = (rowIndex: number, colIndex: number) => {
        setActionHandler({
            cellId: `${rowIndex}-${colIndex}`,
            bombFound: board[rowIndex]![colIndex]!.hasMine,
        });
    };

    // useEffect(() => {
    //     if (turn === 'opponent') {
    //         const action = actions[actions.length - 1];

    //         if (action && action.cellId) {
    //             const [rowIndexStr, colIndexStr] = action.cellId.split('-');
    //             const rowIndex = Number(rowIndexStr);
    //             const colIndex = Number(colIndexStr);

    //             // Ensure the indices are valid numbers
    //             if (
    //                 !isNaN(rowIndex) &&
    //                 !isNaN(colIndex) &&
    //                 rowIndex >= 0 &&
    //                 rowIndex < boardSize &&
    //                 colIndex >= 0 &&
    //                 colIndex < boardSize
    //             ) {
    //                 const newBoard = [...board];
    //                 newBoard[rowIndex]![colIndex]!.status = 'revealed';

    //                 // Simulate the opponent action
    //                 if (action.bombFound) {
    //                     setRevealedMineCount((prev) => prev + 1);
    //                     onAction(action.userId, action.cellId, true); // Bomb found
    //                 } else {
    //                     onAction(action.userId, action.cellId, false); // No bomb
    //                 }

    //                 setBoard(newBoard);

    //                 // Switch turn after the opponent action, with a slight delay for UX purposes
    //                 setTimeout(() => {
    //                     switchTurn(); // Switch back to the user
    //                 }, 2000); // Add a 2-second delay for better UX
    //             }
    //         }
    //     }
    // }, [turn, actions, boardSize, board, onAction, switchTurn]);

    useEffect(() => {
        if (!game || !user) {
            return;
        }

        if (actions.length === 0) {
            if (game.firstPlayerId === user._id) {
                setTurn('user');
            } else {
                setTurn('opponent');
            }
        } else {
            const lastAction = actions[actions.length - 1];
            if (!lastAction) {
                return;
            }

            if (lastAction.userId === user._id) {
                setTurn('opponent');
            } else {
                setTurn('user');
            }
        }
    }, [actions, game, user]);

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
                                    ? 'border-rgba(255, 237, 223,0.65) border-opacity-0.2 border-2'
                                    : ''
                            )}
                            style={{
                                background:
                                    cell.status === 'revealed'
                                        ? activeSkin.colors[0]
                                        : (rowIndex + colIndex) % 2 === 0
                                          ? activeSkin.colors[1]
                                          : activeSkin.colors[0],
                            }}
                            onClick={() => {
                                clickHandlerComponent(rowIndex, colIndex);
                            }}
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
