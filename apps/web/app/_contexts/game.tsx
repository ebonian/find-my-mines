'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Room } from '@repo/shared-types';
import { useSocket } from './socket';
import { useAuthContext } from './auth';
import { seedGen } from '../_lib/seed';

interface GameContextValue {
    gameRooms: Room[];
    createRoom: (room: Room) => void;
    timer: number;
    resetTimer: () => void;
    turn: null | 'user' | 'opponent';
    setTurn: React.Dispatch<React.SetStateAction<null | 'user' | 'opponent'>>;
    updateRoomState: (room: Room, state: 'waiting' | 'playing' | 'end') => void;
    joinRoom: (roomId: string) => void;
}

const GameContext = createContext<GameContextValue>({
    gameRooms: [],
    createRoom: () => {},
    joinRoom: () => {},
    timer: 0,
    resetTimer: () => {},
    turn: 'user',
    setTurn: () => {},
    updateRoomState: () => {},
});

interface GameContextProviderProps {
    children: React.ReactNode;
}

export default function GameContextProvider({
    children,
}: GameContextProviderProps): JSX.Element {
    // CONSUME CONTEXTS
    const { subscribe, send } = useSocket();
    const { user } = useAuthContext();

    // STATES
    const [gameRooms, setGameRooms] = useState<Room[]>([]);
    const [timer, setTimer] = useState(0);
    const [turn, setTurn] = useState<null | 'user' | 'opponent'>('user');

    const resetTimer = () => {
        setTimer(10);
    };

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setTurn((prev) => (prev === 'user' ? 'opponent' : 'user'));
            resetTimer();
        }
    }, [timer, turn]);

    useEffect(() => {
        switch (turn) {
            case 'user':
                resetTimer();
                break;
            case 'opponent':
                resetTimer();
                break;
            default:
                break;
        }
    }, [turn]);

    // METHODS
    const createRoom = async (room: Room) => {
        const seed = await seedGen({
            seed: room.seed,
            type: room.type,
        });
        const roomWithSeed = { ...room, seed };
        send('create-room', roomWithSeed);
    };

    const updateRoomState = (
        room: Room,
        state: 'waiting' | 'playing' | 'end'
    ) => {
        send('update-room-state', {
            roomId: room.id,
            state: state,
        });
    };

    const joinRoom = (roomId: string) => {
        if (!user) {
            return;
        }

        const userId = user.id;

        send('join-room', {
            roomId,
            userId,
        });
    };

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
                timer,
                resetTimer,
                turn,
                setTurn,
                updateRoomState,
                joinRoom,
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
