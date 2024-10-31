'use client';

import { useState } from 'react';
import { Minesweeper } from './_components/minesweeper';
import Layout from '../../_components/common/layout';
import MenuButton from '../../_components/common/menu-button';
import Scoreboard from './_components/scoreboard';
import Status from './_components/status';
import { useGameContext } from '../../_contexts/game';

export default function Play() {
    const { resetTimer, turn, setTurn } = useGameContext();

    const [minesFounded, setMinesFounded] = useState(0);
    const actions = [];

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
            <Scoreboard userFoundedBombs={0} opponentFoundedBombs={0} />
            <Status />
            <Minesweeper
                setMinesFounded={setMinesFounded}
                resetTimer={resetTimer}
                switchTurn={() =>
                    setTurn((prev) => (prev === 'user' ? 'opponent' : 'user'))
                }
            />
        </Layout>
    );
}
