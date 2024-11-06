'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { Room, Skin } from '@repo/shared-types';
import { useSocket } from './socket';
import { useAuthContext } from './auth';
import { seedGen } from '../_lib/seed';
import axios from '../_lib/axios';

interface GameContextValue {
    gameRooms: Room[];
    createRoom: (room: Omit<Room, '_id'>) => void;
    timer: number;
    resetTimer: () => void;
    turn: null | 'user' | 'opponent';
    setTurn: React.Dispatch<React.SetStateAction<null | 'user' | 'opponent'>>;
    updateRoomState: (room: Room, state: 'waiting' | 'playing' | 'end') => void;
    joinRoom: (roomId: string) => void;
    joinedGameRoom: Room | null;
    skins: Skin[];
    equippedSkin: string;
    setEquippedSkinHandler: (skin: string) => void;
    resetJoinedRoom: (userId: string) => void;
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
    joinedGameRoom: null,
    skins: [],
    equippedSkin: 'Default',
    setEquippedSkinHandler: () => {},
    resetJoinedRoom: () => {},
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

    // GAME SKIN
    const [skins, setSkins] = useState<Skin[]>([]);
    const [equippedSkin, setEquippedSkin] = useState<string>('Default');

    const fetchSkins = useCallback(async () => {
        try {
            const { data } = await axios.get('/skins');
            setSkins(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const setEquippedSkinHandler = (skin: string) => {
        if (!user) {
            return;
        }

        if (!user.skins.includes(skin)) {
            setEquippedSkin('Default');
            localStorage.setItem('equippedSkin', 'Default');
        } else {
            setEquippedSkin(skin);
            localStorage.setItem('equippedSkin', skin);
        }
    };

    useEffect(() => {
        fetchSkins();
    }, []);

    useEffect(() => {
        const equipped = localStorage.getItem('equippedSkin');
        if (equipped) {
            setEquippedSkinHandler(equipped);
        } else {
            setEquippedSkinHandler('Default');
        }
    }, [user]);

    // GAME LOGIC
    const [gameRooms, setGameRooms] = useState<Room[]>([]);
    const [joinedGameRoom, setJoinedGameRoom] = useState<Room | null>(null);
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
    const createRoom = async (room: Omit<Room, '_id'>) => {
        const seed = await seedGen({
            seed: room.seed,
            type: room.type,
        });
        const roomWithSeed = { ...room, seed: seed };
        send('create-room', roomWithSeed);
    };

    const updateRoomState = async (
        room: Room,
        state: 'waiting' | 'playing' | 'end',
    ) => {
        send('update-room-state', {
            roomId: room._id,
            state: state,
        }); 
        if (user !== null) {
            send('leave-joined-room', {
                userId: user._id,
                roomId: room._id,
            })
        }
    };

    const resetJoinedRoom = (userId: string) => {
        send('get-joined-room', {
            userId: userId,
        })
    };

    const joinRoom = (roomId: string) => {
        if (!user) {
            return;
        }

        send('join-room', {
            roomId,
            userId: user._id,
        });
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        send('get-rooms', null);
        send('get-joined-room', { userId: user._id });
    }, [user]);

    useEffect(() => {
        subscribe('rooms', (rooms: Room[]) => {
            setGameRooms(rooms);
        });
        subscribe('joined-room', (room: Room) => {
            setJoinedGameRoom(room);
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
                joinedGameRoom,
                skins,
                equippedSkin,
                setEquippedSkinHandler,
                resetJoinedRoom,
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
