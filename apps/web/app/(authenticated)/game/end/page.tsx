'use client';

import { Button } from '../../../_components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useGameContext } from '../../../_contexts/game';
import { useAuthContext } from '../../../_contexts/auth';

export default function end() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuthContext();
    const { resetJoinedRoom, joinedGameRoom } = useGameContext();
    const score = searchParams.get("score");

    useEffect(() => {
        if (user && joinedGameRoom) {
            resetJoinedRoom(user._id);
        }
    }, [resetJoinedRoom]);

    const handleClickBack = () => {
        router.push("/");
    }

    const handleClickShop = () => {
        router.push("/shop");
    }

    const handleClickLeaderboard = () => {
        router.push("/leaderboard");
    }

    const handleClickPlayAgain = () => {
        router.push("/game/rooms");
    }

    return (
        <div
            className='grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#0D1321' }}
        >
            <div className='mb-20'>
                <div className='items-center'>
                    <Button
                        variant='default'
                        color='gray'
                        size='lg'
                        className='absolute left-20 px-4 text-left'
                        onClick={handleClickShop}
                    >
                        <img src='/shop.svg' className='h-12 w-12 pr-4'></img>
                        Shop
                    </Button>
                </div>

                <div className='items-center'>
                    <Button
                        variant='default'
                        color='gray'
                        size='lg'
                        className='absolute right-20 px-4 text-right'
                        onClick={handleClickLeaderboard}
                    >
                        <img
                            src='/scoreboard.svg'
                            className='h-12 w-12 pr-4'
                        ></img>
                        Scoreboard
                    </Button>
                </div>
            </div>

            <div className='mb-10 mt-10'>
                <div className='font-Montserrat text-center text-7xl font-bold'>
                    <span className='text-[#C5D86D]'>You Win!</span>
                </div>

                <div className='font-Montserrat mt-8 text-center text-3xl font-bold text-[#FFEDDF]'>
                    You Found {score} out of 11 Bombs
                </div>

                <div className='font-Montserrat mt-8 flex items-center justify-center text-center text-3xl font-bold text-[#C59CC8]'>
                    <img
                        src='/coin.svg'
                        className='h-12 w-12 pr-2'
                        alt='Coin'
                    />
                    <span>+ 20</span>
                </div>
            </div>

            <div className='mx-auto flex justify-center gap-16'>
                <Button 
                    variant='default' 
                    size='lg'
                    onClick={handleClickPlayAgain}
                >
                    Play Again!
                </Button>
                <Button 
                    variant='default' 
                    size='lg' 
                    onClick={handleClickBack}
                >
                    <img
                        src='/black-left-arrow.svg'
                        className='h-9 w-9 pr-4'
                    ></img>
                    Home?
                </Button>
            </div>
        </div>
    );
}
