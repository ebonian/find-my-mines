import type { Room } from '@repo/shared-types';
import { Button } from '../ui/button';
import { useGameContext } from '../../_contexts/game';
import { useState, useEffect, useCallback } from 'react';
import axios from '../../_lib/axios';

type RoomCardProps = Room;

export default function RoomCard({ _id, name, creator, type }: RoomCardProps) {
    const { joinRoom } = useGameContext();
    const [username, setUsername] = useState('');

    const fetchUser = useCallback(async (userId: string) => {
        try {
            const { data } = await axios.get(`/users/${userId}`);
            setUsername(data.username);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchUser(creator);
    }, []);

    return (
        <div className='bg-brown w-full space-y-5 rounded-3xl bg-opacity-10 p-5'>
            <p className='text-center text-2xl font-bold text-white'>{name}</p>

            <div className='space-y-1 text-left text-lg font-semibold text-white'>
                <p>
                    Created by: <span className='font-normal'>{username}</span>
                </p>
                <p>
                    Type: <span className='font-normal'>{type}</span>
                </p>
            </div>

            <Button
                className='w-full'
                color='white'
                onClick={() => {
                    joinRoom(_id);
                }}
            >
                Join
            </Button>
        </div>
    );
}
