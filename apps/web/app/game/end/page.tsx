'use client';

import { Button } from '../../_components/ui/button';

export default function end() {
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
                    >
                        <img src='/scoreboard.svg' className='h-12 w-12 pr-4'></img>
                        Scoreboard
                    </Button>
                </div>
            </div>

            <div className='mb-10 mt-10'>
                <div className='font-Montserrat text-center text-7xl font-bold'>
                    <span className='text-[#C5D86D]'>
                        You Win!
                    </span>
                </div>

                <div className='font-Montserrat text-center text-3xl font-bold text-[#FFEDDF] mt-8'>
                    You Found X out of 11 Bombs
                </div>

                <div className='font-Montserrat text-center text-3xl font-bold text-[#C59CC8] mt-8 flex items-center justify-center'>
                    <img src='/coin.svg' className='h-12 w-12 pr-2' alt='Coin' />
                    <span>+ 20</span>
                </div>
            </div>

            <div className='mx-auto flex gap-16 justify-center'>
                <Button variant='default' size='lg'>
                    Play Again!
                </Button>
                <Button variant='default' size='lg'>
                <img src='/black-left-arrow.svg' className='h-9 w-9 pr-4'></img>
                    Home?
                </Button>
            </div>
        </div>
    );
}