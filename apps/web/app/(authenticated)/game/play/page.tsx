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
    const { user } = useAuthContext();
    const {
        resetTimer,
        turn,
        setTurn,
        joinedGameRoom,
        updateRoomState,
        getGame,
    } = useGameContext();

    useEffect(() => {
        getGame(joinedGameRoom?._id!);
    }, []);

    const router = useRouter();
    const [userFoundedBombs, setuserFoundedBombs] = useState(0);
    const [opponentFoundedBombs, setopponentFoundedBombs] = useState(0);

    if (!joinedGameRoom || !user) {
        return <div>Loading...</div>;
    }
    const seedAndType = {
        seed: joinedGameRoom !== null ? joinedGameRoom.seed : '',
        type: joinedGameRoom !== null ? joinedGameRoom.type : 'normal',
    };

    const handleEnd = async () => {
        try {
            if (userFoundedBombs > opponentFoundedBombs && user !== null) {
                await axios.patch('/users', {
                    updatingUser: {
                        balance: user.balance + 20,
                        score: user.score + userFoundedBombs,
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
        if (joinedGameRoom) {
            updateRoomState(joinedGameRoom, 'end');
            router.push('/game/end');
        }
    };

    return (
        <Layout
            className='flex flex-col items-center gap-6 py-12'
            leftButton={<MenuButton />}
        >
            {/* <button
                onClick={() => {
                    setTurn((prev) => (prev === 'user' ? 'opponent' : 'user'));
                }}
            >
                Set to {turn !== 'user' ? 'User' : 'Opponent'} turn
            </button> */}
            <Scoreboard
                userFoundedBombs={userFoundedBombs}
                opponentFoundedBombs={opponentFoundedBombs}
            />
            <Status />
            <Minesweeper seedAndType={seedAndType} />
        </Layout>
    );
}
