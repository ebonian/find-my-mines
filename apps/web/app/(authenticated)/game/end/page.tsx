'use client';

import { Button } from '../../../_components/ui/button';
import Layout from '../../../_components/common/layout';
import BackButton from '../../../_components/common/back-button';
import { useGameContext } from '../../../_contexts/game';
import { useAuthContext } from '../../../_contexts/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
    const { user, fetchUser } = useAuthContext();
    const { game, room, leaveRoom, handleEndGame } = useGameContext();
    const [win, setWin] = useState(false);
    const [userFoundedBombs, setUserFoundedBombs] = useState(0);
    const [totalBombs, setTotalBombs] = useState(0);
    const [reward, setReward] = useState(0);

    useEffect(() => {
        if (!room || !game || !user) {
            return;
        }

        leaveRoom(room._id);
        handleEndGame();

        const userFoundedBombs = game.actions.filter(
            (action) => action.userId === user._id && action.bombFound
        ).length;
        const opponentFoundedBombs = game.actions.filter(
            (action) => action.userId !== user._id && action.bombFound
        ).length;

        setUserFoundedBombs(userFoundedBombs);
        setTotalBombs(room.type === 'normal' ? 11 : 25);
        setWin(userFoundedBombs > opponentFoundedBombs);
        setReward(room.type === 'normal' ? 20 : 40);

        fetchUser();
    }, [game, user, room]);

    return (
        <Layout
            className='flex min-h-screen flex-col items-center justify-center py-16'
            leftButton={<BackButton href='/' />}
        >
            <div className='mb-10 mt-10'>
                <div className='font-Montserrat text-center text-7xl font-bold'>
                    <span className={win ? 'text-green' : 'text-red'}>
                        {win ? 'You Win!' : 'You Lose!'}
                    </span>
                </div>

                <div className='font-Montserrat mt-8 text-center text-3xl font-bold text-[#FFEDDF]'>
                    {win
                        ? `You Found ${userFoundedBombs} out of ${totalBombs} Bombs!`
                        : 'Better Luck Next Time!'}
                </div>

                <div className='font-Montserrat mt-8 flex items-center justify-center text-center text-3xl font-bold text-[#C59CC8]'>
                    <img
                        src='/coin.svg'
                        className='h-12 w-12 pr-2'
                        alt='Coin'
                    />
                    <span>{win ? `+ ${reward}` : '+ 0'}</span>
                </div>
            </div>

            <Link href='/game/rooms'>
                <Button variant='default' size='lg'>
                    Play Again!
                </Button>
            </Link>
        </Layout>
    );
}
