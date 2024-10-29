'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Room } from '@repo/shared-types';
import { useSocket } from './socket';

interface GameContextValue {
    gameRooms: Room[];
    createRoom: (room: Room) => void;
    updateRoomState: (room: Room, state: 'waiting' | 'playing' | 'end') => void;
}

const GameContext = createContext<GameContextValue>({
    gameRooms: [],
    createRoom: () => {},
    updateRoomState: () => {}
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

    // Seed hashing
    async function seedHash(seed: string, length: number) {
        const encoder = new TextEncoder();
        const data = encoder.encode(seed);
    
        // Hash the data using SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
        // Convert the hash to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    
        // Return the first [length] characters of the hash
        return hashHex.slice(0, length);
    
    }

    // Seed Generation
    const seedGen = async ({ seed = "", type }: { seed?: string, type: "normal" | "extreme" }) => {
        const seedLength = (type === "normal") ? 11 : 35;
    
        // original seed
        if (seed.length >= seedLength) {
            seed = seed.substring(0, seedLength);
        } else if (seed.length == 0) {
            while (seed.length < seedLength) {
                var dec = Math.floor(Math.random() * (126 - 33) + 33);
                seed = seed.concat(String.fromCharCode(dec));
            }
        } else {
            seed = await seedHash(seed, seedLength);
        }
    
        // btoa seed at each position and get index 0 -> hash
        const positionCode: string[] = [];
        for (let i = 0; i < seed.length; i++) {
            positionCode.push(btoa(seed[i] as string).substring(0, 1));
        }
        const positionSeedHashed = await seedHash(positionCode.join(""), seedLength);
    
        // btoa the whole seed and reverse -> hash
        var btoaSeedHashed = await seedHash(btoa(seed).substring(0, seedLength).split("").reverse().join(""), seedLength);
    
        // combine each position of btoaSeed and original seed -> hash
        var combinationSeed = "";
        for (let i = 0; i < seed.length; i++) {
            const btoaSeedDec = btoaSeedHashed.charCodeAt(i);
            const seedDec = seed.charCodeAt(i);
            var posDec = btoaSeedDec + seedDec + i;
            while (posDec < 33) {
                posDec += 94;
            }
            while (posDec > 126) {
                posDec -= 94;
            }
    
            combinationSeed = combinationSeed.concat(String.fromCharCode(posDec));
        }
        const combinationSeedHashed = await seedHash(combinationSeed, seedLength);
    
        // generate full seed
        var fullSeed = "";
        for (let i = 0; i < seedLength; i++) {
            fullSeed = fullSeed.concat(seed[i] as string).concat(positionSeedHashed[i] as string).concat(btoaSeedHashed[i] as string).concat(combinationSeedHashed[i] as string);
        }
    
        return {
            "seed": fullSeed,
        };
    }

    // METHODS
    const createRoom = async (room: Room) => {
        const seed = await seedGen({
            seed: room.seed,
            type: room.type,
        });
        const roomWithSeed = {...room, seed};
        send('create-room', roomWithSeed);
    };

    const updateRoomState = (room: Room, state: 'waiting' | 'playing' | 'end') => {
        send('update-room-state', {
            roomId: room.id,
            state: state,
        })
    }

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
                updateRoomState,
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
