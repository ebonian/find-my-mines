'use client';

import Image from 'next/image';
import { Button } from '../../_components/ui/button';
import Plus from './_icons/plus.svg';
import Search from './_icons/search.svg';
import { ButtonIcon } from './create/_component/buttonIcon';
import ArrowFatLeft from './create/_icon/arrow-fat-left.svg';
import CircleHelp from './create/_icon/circle-help.svg';

export default function Lobby() {
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

    return (
        <div className='flex min-h-dvh w-full flex-col items-center gap-28'>
            <div className='mx-auto -mb-24 flex w-[80rem] justify-between pt-16'>
                <ButtonIcon icon={ArrowFatLeft} />
                <ButtonIcon icon={CircleHelp} />
            </div>
            <div className='space-y-4 text-center'>
                <h1 className='mx-auto text-6xl font-bold'>Lobby</h1>
                <p className='text-purple mx-auto text-xl font-semibold'>
                    Join Existing Game or Create New
                </p>
            </div>

            <div className='grid w-full grid-cols-3 gap-16 px-20'>
                {room.map((room, index) => (
                    <div className='bg-brown space-y-10 rounded-3xl bg-opacity-10 p-5'>
                        <p className='text-center text-3xl font-bold text-white'>
                            {room.name}
                        </p>

                        <div className='space-y-2 text-center'>
                            <p className='text-left text-xl font-semibold text-white'>
                                Created by: {room.createdBy}
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
        </div>
    );
}
