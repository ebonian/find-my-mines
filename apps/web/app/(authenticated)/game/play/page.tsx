'use client';

import { useState, useEffect } from 'react';
import GameBoard from './_components/game-board';
import Layout from '../../../_components/common/layout';
import MenuButton from '../../../_components/common/menu-button';
import Scoreboard from './_components/scoreboard';
import Status from './_components/status';
import axios from '../../../_lib/axios';
import { useAuthContext } from '../../../_contexts/auth';
import { useRouter } from '../../../../node_modules/next/navigation';
import { useGameContext } from '../../../_contexts/game';

export default function Play() {
    const { user } = useAuthContext();
    const { joinedGameRoom, updateRoomState, getGame, game } = useGameContext();

    useEffect(() => {
        if (!joinedGameRoom) {
            return;
        }
        getGame(joinedGameRoom?._id!);
    }, [joinedGameRoom]);

    const router = useRouter();

    const handleEnd = async () => {
        let result = 'lose';
        if (userFoundedBombs > opponentFoundedBombs && user !== null) {
            result = 'win';
        }
        try {
            // TODO: use game action to calculate the score or do it server side
            // if (userFoundedBombs > opponentFoundedBombs && user !== null) {
            //     await axios.patch('/users', {
            //         updatingUser: {
            //             balance: user.balance + 20,
            //             score: user.score + userFoundedBombs,
            //         },
            //     });
            // }
        } catch (err) {
            console.log(err);
        }
        if (joinedGameRoom) {
            updateRoomState(joinedGameRoom, 'end');
            router.push(`/game/end?result=${result}`);
        }
    };

    return (
        <Layout
            className='flex flex-col items-center gap-6 py-12'
            leftButton={<MenuButton />}
        >
            <Scoreboard />
            <Status />
            <GameBoard />
        </Layout>
    );
}
