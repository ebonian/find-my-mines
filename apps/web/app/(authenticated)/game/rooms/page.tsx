'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../../../_components/ui/button';
import { useGameContext } from '../../../_contexts/game';
import Layout from '../../../_components/common/layout';
import BackButton from '../../../_components/common/back-button';
import HelpButton from '../../../_components/common/help-button';
import Link from 'next/link';

export default function Lobby() {
    const { gameRooms } = useGameContext();
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const howToPlay = [
        '1. The point of this game is to win go team go',
        '2. Fight until death',
        '3. I need a bunch of sample text for this page',
        '4. How to make Khaow Man Kai',
        '5. First, You need a Rice Cooker',
        '6. You put rice in the rice cooker',
    ];

    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={
                <HelpButton
                    isIconOnly
                    onClick={() => {
                        setShowHowToPlay(true);
                    }}
                />
            }
        >
            <div className='flex flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>Lobby</h1>
                    <p className='text-purple text-xl'>
                        Join Existing Game or Create New
                    </p>
                </div>

                <div className='grid w-full grid-cols-3 gap-16 px-20'>
                    {gameRooms.map((room) => (
                        <div className='bg-brown space-y-10 rounded-3xl bg-opacity-10 p-5'>
                            <p className='text-center text-3xl font-bold text-white'>
                                {room.name}
                            </p>

                            <div className='space-y-2 text-center'>
                                <p className='text-left text-xl font-semibold text-white'>
                                    Created by: {room.creator}
                                </p>
                                <p className='text-left text-xl font-semibold text-white'>
                                    Type: {room.type}
                                </p>
                            </div>

                            <Button
                                className='h-14 w-full text-2xl'
                                color='white'
                            >
                                Join
                            </Button>
                        </div>
                    ))}
                </div>

                <div className='mx-auto flex gap-8'>
                    <Button
                        className='h-16 gap-4'
                        variant='outline'
                        color='purple'
                        size='lg'
                    >
                        Quick Join
                        <Image
                            src='/search.svg'
                            alt='search'
                            width={24}
                            height={24}
                        />
                    </Button>
                    <Link href='/game/rooms/create'>
                        <Button className='h-16 gap-4' color='purple' size='lg'>
                            Create New
                            <Image
                                src='/plus.svg'
                                alt='plus'
                                width={24}
                                height={24}
                            />
                        </Button>
                    </Link>
                </div>
            </div>
            {showHowToPlay && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/50 p-4'>
                    <div className='relative flex h-[640px] w-[640px] flex-col overflow-clip rounded-3xl'>
                        <Image
                            src='/X.svg'
                            onClick={() => setShowHowToPlay(false)}
                            alt='close'
                            width={32}
                            height={32}
                            className='absolute right-8 top-8 cursor-pointer'
                        />
                        <div className='bg-orange flex w-full justify-center py-8'>
                            <p className='text-gray text-2xl font-bold'>
                                How To Play
                            </p>
                        </div>
                        <div className='text-gray flex h-full w-full flex-col overflow-scroll bg-white px-4 py-4'>
                            {howToPlay.map((text, index) => (
                                <p
                                    key={index}
                                    className='p-4 text-xl font-semibold'
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                    .
                </div>
            )}
        </Layout>
    );
}
