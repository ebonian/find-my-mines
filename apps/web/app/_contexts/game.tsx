'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Room } from '@repo/shared-types';
import { useSocket } from './socket';

interface GameContextValue {
    gameRooms: Room[];
    createRoom: (room: Room) => void;
}

const GameContext = createContext<GameContextValue>({
    gameRooms: [],
    createRoom: () => {},
});

interface GameContextProviderProps {
    children: React.ReactNode;
}

export default function GameContextProvider({
    children,
}: GameContextProviderProps): JSX.Element {
    const { subscribe, send } = useSocket();

    // STATES
    const [gameRooms, setGameRooms] = useState<Room[]>([]);

    // METHODS
    const createRoom = (room: Room) => {
        send('create-room', room);
    };

    // EFFECTS
    useEffect(() => {
        subscribe('rooms', (rooms: Room[]) => {
            setGameRooms(rooms);
        });
    }, [subscribe]);

    return (
        <GameContext.Provider
            value={{
                gameRooms,
                createRoom,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext(): GameContextValue {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error(
            'useGameContext must be used within a GameContextProvider'
        );
    }

    return context;
}
