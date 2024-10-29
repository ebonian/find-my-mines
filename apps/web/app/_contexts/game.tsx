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

    // Seed Generation
    const seedGen = () => {
        const replaceAt = (oStr: String, index: number, replacement: String) => {
            return oStr.substring(0, index) + replacement + oStr.substring(index + replacement.length);
        }

        var numSeq = Math.floor(Math.random() * (999999999 - 100000000) + 100000000).toString();

        for (let i = 0; i < 5; i++) {
            var pos = Math.floor(Math.random() * 8);
            var dec = Math.floor(Math.random() * (126 - 58) + 58);

            while (true) {
                if (!isNaN(parseInt(numSeq.charAt(pos), 10))) {
                    numSeq = replaceAt(numSeq, pos % 9, String.fromCharCode(dec));
                    break;
                }
                pos += 1
            }
        }
        return { "seed": numSeq };
    }

    // METHODS
    const createRoom = (room: Room) => {
        const seed = seedGen();
        const roomWithSeed = {...room, seed};
        send('create-room', roomWithSeed);
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
