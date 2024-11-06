'use client';

import { useState, useEffect } from 'react';
import { Minesweeper } from './_components/minesweeper';
import Layout from '../../../_components/common/layout';
import MenuButton from '../../../_components/common/menu-button';
import Scoreboard from './_components/scoreboard';
import Status from './_components/status';
import axios from '../../../_lib/axios';
import { useAuthContext } from '../../../_contexts/auth';
import { useRouter } from '../../../../node_modules/next/navigation';
import { useGameContext } from '../../../_contexts/game';

interface Action {
    actionId: number;
    userId: string;
    cellId: string | null;
    bombFounded: boolean;
}

export default function Play() {
    const { resetTimer, turn, setTurn, joinedGameRoom, updateRoomState } = useGameContext();
    const { user } = useAuthContext();
    
    const router = useRouter();
    const [minesFounded, setMinesFounded] = useState(0);
    const [userFoundedBombs, setuserFoundedBombs] = useState(0);
    const [opponentFoundedBombs, setopponentFoundedBombs] = useState(0);
    const [actionId, setActionId] = useState(0);
    const [actions, setActions] = useState<Action[]>([]);
    const seedAndType = {
        seed: joinedGameRoom !== null ? joinedGameRoom.seed : "",
        type: joinedGameRoom !== null ? joinedGameRoom.type : "normal",
    }
    const handleAction = (
        userId: string,
        cellId: string | null,
        bombFounded: boolean
    ) => {
        const newAction: Action = {
            actionId: actionId + 1,
            userId,
            cellId,
            bombFounded,
        };

        setActions((prevActions) => [...prevActions, newAction]);
        setActionId((prevID) => prevID + 1);
        setTurn((prevTurn) => (prevTurn === 'user' ? 'opponent' : 'user'));
    };

    const handleEnd = async () => {
        const userScore = actions.filter(
            (action) => action.userId === 'user' && action.bombFounded
        ).length;

        const oppScore = actions.filter(
            (action) => action.userId === 'opponent' && action.bombFounded
        ).length;

        try {
            if (userScore > oppScore && user !== null) {
                const response = await axios.patch('/users', {
                    updatingUser: {
                        balance: user.balance + 20,
                        score: user.score + userScore,
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
        if (joinedGameRoom && user) {
            updateRoomState(joinedGameRoom, "end");
            router.push(`/game/end?score=${userScore.toString()}`);
        }
    }

    // Calculate number of bombs found by user and opponent based on actions
    useEffect(() => {
        const userFoundedBombs = actions.filter(
            (action) => action.userId === 'user' && action.bombFounded
        ).length;
        setuserFoundedBombs(userFoundedBombs); // Update user mines founded state

        const opponentFoundedBombs = actions.filter(
            (action) => action.userId === 'opponent' && action.bombFounded
        ).length;
        setopponentFoundedBombs(opponentFoundedBombs); // Update opponent mines founded state
    }, [actions]); // Update whenever actions change

    return (
        <Layout
            className='flex flex-col items-center gap-6 py-12'
            leftButton={<MenuButton />}
        >
            <button
                onClick={() => {
                    setTurn((prev) => (prev === 'user' ? 'opponent' : 'user'));
                }}
            >
                Set to {turn !== 'user' ? 'User' : 'Opponent'} turn
            </button>
            <Scoreboard
                userFoundedBombs={userFoundedBombs}
                opponentFoundedBombs={opponentFoundedBombs}
            />
            <Status />
            <Minesweeper
                seedAndType={seedAndType}
                setMinesFounded={setMinesFounded}
                resetTimer={resetTimer}
                switchTurn={() =>
                    setTurn((prev) => (prev === 'user' ? 'opponent' : 'user'))
                }
                turn={turn}
                onAction={handleAction}
                onEnd={handleEnd}
            />
        </Layout>
    );
}
