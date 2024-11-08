'use client';

import Image from 'next/image';
import { useGameContext } from '../../../../_contexts/game';
import { cn } from '../../../../_lib/utils';
import { useAuthContext } from '../../../../_contexts/auth';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../../../_lib/axios';

export default function Header() {
    const { game, turn, room } = useGameContext();
    const { user } = useAuthContext();

    const userFoundedBombs = game?.actions.filter(
        (action) => action.userId === user?._id && action.bombFound
    ).length;
    const opponentFoundedBombs = game?.actions.filter(
        (action) => action.userId !== user?._id && action.bombFound
    ).length;

    const [userNickname, setUserNickname] = useState('');
    const [opponentNickname, setOpponentNickname] = useState('');

    const fetchUserNicknames = useCallback(async () => {
        if (!room || !user) {
            return;
        }

        for (const playerId of room.players) {
            try {
                await axios.get(`/users/${playerId}`).then((res) => {
                    if (res.data._id === user._id) {
                        setUserNickname(res.data.username);
                    } else {
                        setOpponentNickname(res.data.username);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }, [room, user]);

    useEffect(() => {
        fetchUserNicknames();
    }, [room, user]);

    return (
        <div className='grid w-full max-w-2xl grid-cols-3'>
            <div
                className={cn(
                    'text-green flex flex-col items-center gap-4',
                    turn === 'user' ? '' : 'opacity-20'
                )}
            >
                <div className={'flex items-center justify-center gap-10'}>
                    <div className='relative aspect-square h-full'>
                        <Image
                            src='/smile-green.svg'
                            alt='Smile'
                            fill
                            className='object-contain'
                        />
                    </div>
                    <div className='text-6xl font-bold'>{userFoundedBombs}</div>
                </div>
                <span className='font-semibold'>{userNickname}</span>
            </div>

            <div className='flex h-min justify-center'>
                <Image
                    src='/construction.svg'
                    alt='Construction'
                    height={164}
                    width={164}
                />
            </div>

            <div
                className={cn(
                    'text-red flex flex-col items-center gap-4',
                    turn === 'opponent' ? '' : 'opacity-20'
                )}
            >
                <div className='flex items-center justify-center gap-10'>
                    <div className='text-6xl font-bold'>
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
                <span className='font-semibold'>{opponentNickname}</span>
            </div>
        </div>
    );
}
