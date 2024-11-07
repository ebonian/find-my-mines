'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { Action, Game, Room, Skin } from '@repo/shared-types';
import { useSocket } from './socket';
import { useAuthContext } from './auth';
import { seedGen } from '../_lib/seed';
import axios from '../_lib/axios';

interface GameContextValue {
    rooms: Room[];
    createRoom: (room: Omit<Room, '_id'>) => void;
    timer: number;
    resetTimer: () => void;
    turn: null | 'user' | 'opponent';
    setTurn: React.Dispatch<React.SetStateAction<null | 'user' | 'opponent'>>;
    joinRoom: (roomId: string) => void;
    room: Room | null;
    skins: Skin[];
    equippedSkin: string;
    setEquippedSkinHandler: (skin: string) => void;
    game: Game | null;
    getGame: (roomId: string) => void;
    setActionHandler: (action: { cellId: string; bombFound: boolean }) => void;
    setTurnHandler: (settingTurn: 'user' | 'opponent' | null) => void;
}

const GameContext = createContext<GameContextValue>({
    rooms: [],
    createRoom: () => {},
    joinRoom: () => {},
    timer: 0,
    resetTimer: () => {},
    turn: 'user',
    setTurn: () => {},
    room: null,
    skins: [],
    equippedSkin: 'Default',
    setEquippedSkinHandler: () => {},
    game: null,
    getGame: () => {},
    setActionHandler: () => {},
    setTurnHandler: () => {},
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

        if (!user) {
            return;
        }
        send('get-rooms', null);
        send('get-room', { userId: user._id });
    }, [user]);

    // GAME LOGIC
    const [rooms, setRooms] = useState<Room[]>([]);
    const [room, setRoom] = useState<Room | null>(null);
    const [timer, setTimer] = useState(0);
    const [turn, setTurn] = useState<null | 'user' | 'opponent'>('user');
    const [game, setGame] = useState<Game | null>(null);
    const [games, setGames] = useState<Game[] | null>(null);

    const getGame = (roomId: string) => {
        send('get-game', { roomId });
    };

    const setActionHandler = ({
        cellId,
        bombFound,
    }: {
        cellId: string;
        bombFound: boolean;
    }) => {
        if (turn !== 'user') {
            return;
        }
        if (!game || !user) {
            return;
        }

        send('send-action', {
            gameId: game._id,
            userId: user._id,
            cellId: cellId,
            bombFound: bombFound,
        });
    };

    const setTurnHandler = (settingTurn: 'user' | 'opponent' | null) => {
        setTurn(settingTurn);
        resetTimer();
    };

    const timeoutHandler = () => {
        setActionHandler({
            cellId: '',
            bombFound: false,
        });
    };

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
            if (turn === 'user') {
                timeoutHandler();
            }
        }
    }, [timer, turn]);

    const createRoom = async (room: Omit<Room, '_id'>) => {
        const seed = await seedGen({
            seed: room.seed,
            type: room.type,
        });
        const roomWithSeed = { ...room, seed: seed };
        send('create-room', roomWithSeed);
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
        if (!rooms || !user) {
            return;
        }

        const joinedRoom = rooms.find(
            (room) => room.players.includes(user._id) && room.state !== 'end'
        );
        if (!joinedRoom) {
            return;
        }

        setRoom(joinedRoom);
    }, [rooms]);

    useEffect(() => {
        if (!games || !room) {
            return;
        }

        const currentGame = games.find((game) => game.roomId === room._id);

        if (!currentGame) {
            return;
        }

        setGame(currentGame);
    }, [games]);

    useEffect(() => {
        subscribe('rooms', (rooms: Room[]) => {
            setRooms(rooms);
        });
        subscribe('room', (room: Room) => {
            setRoom(room);
        });
        subscribe('games', (games: Game[]) => {
            setGames(games);
        });
        subscribe('game', (game: Game) => {
            setGame(game);
        });
    }, [subscribe]);

    return (
        <GameContext.Provider
            value={{
                rooms,
                createRoom,
                timer,
                resetTimer,
                turn,
                setTurn,
                joinRoom,
                room,
                skins,
                equippedSkin,
                setEquippedSkinHandler,
                game,
                getGame,
                setActionHandler,
                setTurnHandler,
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
