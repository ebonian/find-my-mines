'use client';

import Image from 'next/image';
import { useGameContext } from '../../../_contexts/game';
import { cn } from '../../../_lib/utils';

interface HeaderProps {
    userFoundedBombs: number;
    opponentFoundedBombs: number;
}

export default function Header({
    userFoundedBombs,
    opponentFoundedBombs,
}: HeaderProps) {
    const { turn } = useGameContext();

    return (
        <div className='grid w-full max-w-2xl grid-cols-3'>
            <div
                className={cn(
                    'flex items-center justify-center gap-10',
                    turn === 'user' ? '' : 'opacity-20'
                )}
            >
                <div className='relative aspect-square h-full'>
                    <Image
                        src='/smile-green.svg'
                        alt='Smile'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className='text-green text-6xl font-bold'>
                    {userFoundedBombs}
                </div>
            </div>

            <div className='relative'>
                <Image
                    src='/construction.svg'
                    alt='Construction'
                    fill
                    className='object-contain'
                />
            </div>

            <div
                className={cn(
                    'flex items-center justify-center gap-10',
                    turn === 'opponent' ? '' : 'opacity-20'
                )}
            >
                <div className='text-red text-6xl font-bold'>
                    {opponentFoundedBombs}
                </div>
                <div className='relative aspect-square h-full'>
                    <Image
                        src='/smile-red.svg'
                        alt='Opponent'
                        fill
                        className='object-contain'
                    />
                </div>
            </div>
        </div>
    );
}
