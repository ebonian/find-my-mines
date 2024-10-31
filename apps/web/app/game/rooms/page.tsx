'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '../../_components/ui/button';
import { useGameContext } from '../../_contexts/game';
import { ButtonIcon } from './_component/buttonIcon';
import ArrowFatLeft from './_icons/arrow-fat-left.svg';
import CircleHelp from './_icons/circle-help.svg';
import Plus from './_icons/plus.svg';
import Search from './_icons/search.svg';
import X from './_icons/x.svg';

export default function Lobby() {
    const { gameRooms } = useGameContext();
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    const room = [
        {
            name: 'Room1',
            createdBy: 'ThisIsUsername16',
            type: 'Normal',
        },

        {
            name: 'Room2',
            createdBy: 'HelpMeICant',
            type: 'Extreme',
        },

        {
            name: 'Room3',
            createdBy: 'DoThisAnymore',
            type: 'Normal',
        },
    ];

    const howToPlay = [
        '1. The point of this game is to win go team go',
        '2. Fight until death',
        '3. I need a bunch of sample text for this page',
        '4. How to make Khaow Man Kai',
        '5. First, You need a Rice Cooker',
        '6. You put rice in the rice cooker',
    ];

    return (
        <div className='flex min-h-dvh w-full flex-col items-center gap-28'>
            <div className='mx-auto -mb-24 flex w-[80rem] justify-between pt-16'>
                <ButtonIcon icon={ArrowFatLeft} />
                <ButtonIcon
                    icon={CircleHelp}
                    onClick={() => setShowHowToPlay(true)}
                />
            </div>
            <div className='space-y-4 text-center'>
                <h1 className='mx-auto text-6xl font-bold'>Lobby</h1>
                <p className='text-purple mx-auto text-xl font-semibold'>
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
                                Created by: {room.Creator}
                            </p>
                            <p className='text-left text-xl font-semibold text-white'>
                                Type: {room.type}
                            </p>
                        </div>

                        <Button className='h-14 w-full text-2xl' color='white'>
                            Join
                        </Button>
                    </div>
                ))}
            </div>

            <div className='mx-auto flex gap-8'>
                <Button
                    className='h-20 gap-4 px-10 text-2xl'
                    variant='outline'
                    color='purple'
                    size='lg'
                >
                    Quick Join
                    <Image src={Search} alt='' />
                </Button>
                <Button
                    className='h-20 gap-4 px-10 text-2xl'
                    color='purple'
                    size='lg'
                >
                    Create New
                    <Image src={Plus} alt='' />
                </Button>
            </div>

            {showHowToPlay && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/50 p-4'>
                    <div className='relative flex h-[640px] w-[640px] flex-col overflow-clip rounded-3xl'>
                        <Image
                            src={X}
                            onClick={() => setShowHowToPlay(false)}
                            alt=''
                            className='absolute right-8 top-8 cursor-pointer'
                        />
                        <div className='bg-orange flex w-full justify-center py-8'>
                            <p className='text-gray text-3xl font-bold'>
                                How To Play
                            </p>
                        </div>
                        <div className='text-gray flex h-full w-full flex-col overflow-scroll bg-white px-4 py-4'>
                            {howToPlay.map((text, index) => (
                                <p
                                    key={index}
                                    className='p-4 text-2xl font-semibold'
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                    .
                </div>
            )}
        </div>
    );
}
