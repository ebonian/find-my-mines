'use client';

import { useEffect } from 'react';
import GameBoard from './_components/game-board';
import Layout from '../../../_components/common/layout';
import Scoreboard from './_components/scoreboard';
import Status from './_components/status';
import { useGameContext } from '../../../_contexts/game';
import BackButton from '../../../_components/common/back-button';

export default function Play() {
    const { room, getGame } = useGameContext();

    useEffect(() => {
        if (!room) {
            return;
        }
        getGame(room?._id!);
    }, [room]);

    return (
        <Layout
            className='flex flex-col items-center gap-6 py-12'
            leftButton={<BackButton href='/' />}
        >
            <Scoreboard />
            <Status />
            <GameBoard />
        </Layout>
    );
}
