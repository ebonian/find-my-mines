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
import { Action } from '@repo/shared-types';
import { useGameContext } from '../../../_contexts/game';

export default function Play() {
    const { resetTimer, turn, setTurn, joinedGameRoom, updateRoomState } =
        useGameContext();
    const { user } = useAuthContext();

    const router = useRouter();
    const [minesFounded, setMinesFounded] = useState(0);
    const [userFoundedBombs, setuserFoundedBombs] = useState(0);
    const [opponentFoundedBombs, setopponentFoundedBombs] = useState(0);
    const [actionId, setActionId] = useState(0);
    const [actions, setActions] = useState<Action[]>([]);
    const { actionArray, setActionHandler } = useGameContext();
    const seedAndType = {
        seed: joinedGameRoom.seed,
        type: joinedGameRoom.type,
    };
    const handleAction = (
        id: number,
        userId: string,
        cellId: number | null,
        bombFound: boolean
    ) => {
        const newAction: Action = {
            id: id + 1,
            userId,
            cellId,
            bombFound,
        };

        setActions((prevActions) => [...prevActions, newAction]);
        setActionId((prevID) => prevID + 1);
        setTurn((prevTurn) => (prevTurn === 'user' ? 'opponent' : 'user'));
        setActionHandler(newAction);
    };

    const handleEnd = async () => {
        // if (userFoundedBombs > opponentFoundedBombs) {
        //     const response = await axios.patch(`/users/${}`);
        // }
        try {
            if (userFoundedBombs > opponentFoundedBombs) {
                const response = await axios.patch('/users', {
                    updatingUser: {
                        balance: user.balance + 20,
                        score: user.score + userFoundedBombs,
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
        updateRoomState(joinedGameRoom, 'end');
        router.push('/game/end');
    };

    // Calculate number of bombs found by user and opponent based on actions
    useEffect(() => {
        const userFoundedBombs = actions.filter(
            (action) => action.userId === 'user' && action.bombFound
        ).length;
        setuserFoundedBombs(userFoundedBombs); // Update user mines founded state

        const opponentFoundedBombs = actions.filter(
            (action) => action.userId === 'opponent' && action.bombFound
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
