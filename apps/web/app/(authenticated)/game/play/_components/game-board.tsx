'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../../../../_lib/utils';
import Image from 'next/image';
import { useGameContext } from '../../../../_contexts/game';
import { useAuthContext } from '../../../../_contexts/auth';
import { coordinatesGen } from '../../../../_lib/seed';
import {
    applyActions,
    Cell,
    createBoard,
    setGameTurnHandler,
} from '../../../../_lib/game';

export default function GameBoard() {
    const { user } = useAuthContext();
    const {
        equippedSkin,
        skins,
        setActionHandler,
        game,
        setTurnHandler,
        joinedGameRoom,
    } = useGameContext();

    const [board, setBoard] = useState<Cell[][]>([[]]);
    const activeSkin = skins.find((skin) => skin.name === equippedSkin)!;

    useEffect(() => {
        if (!joinedGameRoom || !game || !user) {
            return;
        }

        const coordinates = coordinatesGen({
            seed: joinedGameRoom.seed,
            type: joinedGameRoom.type,
        });
        const generatedBoard = createBoard(6, 11, coordinates);
        const appliedActionsBoard = applyActions(generatedBoard, game.actions);
        setBoard(appliedActionsBoard);

        const gameTurn = setGameTurnHandler(game, user._id!);
        setTurnHandler(gameTurn);
    }, [joinedGameRoom, game, user]);

    const clickHandlerComponent = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex]![colIndex]!.status !== 'revealed') {
            setActionHandler({
                cellId: `${rowIndex}-${colIndex}`,
                bombFound: board[rowIndex]![colIndex]!.hasMine,
            });
        }
    };

    return (
        <div>
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
}