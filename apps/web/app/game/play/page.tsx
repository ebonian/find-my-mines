'use client';
import { useState, useEffect } from 'react';
import { Button } from '../../_components/ui/button';
import { Minesweeper } from './_components/minesweeper';

export default function Play() {
    const [timer, setTimer] = useState(10); // Countdown timer state
    const [minesFounded, setMinesFounded] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // To store interval ID
    const actions = [];

    // Timer countdown logic
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            setIntervalId(countdown); // Save the interval ID
            return () => clearInterval(countdown); // Clean up interval on component unmount or when the timer resets
        }
    }, [timer]);

    // Function to reset the timer
    const resetTimer = () => {
        setTimer(10); // Reset the timer to 10 seconds
        if (intervalId) {
            clearInterval(intervalId); // Clear the previous timer if it's still running
        }
    };

    return (
        <div
            className='flex min-h-screen w-full flex-grow flex-col items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='mt-4 flex w-full flex-row justify-between'>
                <Button
                    variant='default'
                    color='brown'
                    className='ml-20 bg-opacity-10 px-8'
                >
                    <img src='/menu.svg' alt='Menu' />
                </Button>
                <div className='mx-auto flex flex-row items-center justify-center'>
                    <img src='/Bomb.svg' className='px-16' alt='Bomb' />
                    <div className='font-Montserrat text-red px-16 text-6xl font-bold'>
                        {minesFounded}
                    </div>

                    {/* Centering the construction icon */}
                    <div className='flex flex-col items-center justify-center'>
                        <img src='/construction.svg' alt='Construction' />
                    </div>

                    <div className='font-Montserrat text-green px-16 text-6xl font-bold'>
                        {timer}
                    </div>
                    <img src='/smile.svg' className='px-16' alt='Smile' />
                </div>
                <Button
                    variant='default'
                    color='brown'
                    className='mr-20 bg-opacity-10 px-8'
                >
                    <img src='/messages-square.svg' alt='Messages' />
                </Button>
            </div>
            <div className='font-Montserrat flex place-content-center items-center justify-center text-center text-xl font-bold text-[#FFEDDF]'>
                Waiting for player
            </div>
            {/* Centering the Minesweeper game board */}
            <div className='mt-4 flex flex-row items-center justify-center'>
                <div className='flex'>
                    <Minesweeper
                        setMinesFounded={setMinesFounded}
                        resetTimer={resetTimer}
                    />
                </div>
            </div>
        </div>
    );
}
