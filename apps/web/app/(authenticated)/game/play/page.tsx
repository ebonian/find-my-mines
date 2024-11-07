'use client';

import { useEffect } from 'react';
import GameBoard from './_components/game-board';
import Layout from '../../../_components/common/layout';
import MenuButton from '../../../_components/common/menu-button';
import Scoreboard from './_components/scoreboard';
import Status from './_components/status';
import { useGameContext } from '../../../_contexts/game';

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
            leftButton={<MenuButton />}
        >
            <Scoreboard />
            <Status />
            <GameBoard />
        </Layout>
    );
}
