import type { Room } from '@repo/shared-types';
import { Button } from '../ui/button';
import { useGameContext } from '../../_contexts/game';
import { useState, useEffect } from 'react';
import axios from '../../_lib/axios';

interface RoomCardProps {
    _id?: Room['_id'];
    name: Room['name'];
    creator: Room['creator'];
    type: Room['type'];
}

export default function RoomCard({ _id, name, creator, type }: RoomCardProps) {
    const { joinRoom } = useGameContext();
    const [username, setUsername] = useState('');

    const fetchUser = async (uid: string) => {
        const { data } = await axios.get(`/users/${uid}`);
        setUsername(data.username);
    };

    useEffect(() => {
        fetchUser(creator);
    }, []);

    if (!_id) {
        return null;
    }

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
