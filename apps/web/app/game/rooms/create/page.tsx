'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '../../../_contexts/socket';
import { Button } from '../../../_components/ui/button';
import { Input } from '../../../_components/ui/input';
import { Radio } from '../_component/radio';
import { CardCheckbox } from '../_component/card';
import { ButtonIcon } from '../_component/buttonIcon';
import ArrowFatLeft from '../_icons/arrow-fat-left.svg';
import CircleHelp from '../_icons/circle-help.svg';
import type { Room } from '@repo/shared-types';
import { useGameContext } from '../../../_contexts/game';

export default function Create() {
    const router = useRouter();
    const { createRoom } = useGameContext();
    const { socket, send, subscribe, unsubscribe } = useSocket();
    const [roomName, setRoomName] = useState('');
    const [selectedType, setSelectedType] = useState<'normal' | 'extreme'>(
        'normal'
    );
    const [selectedPower, setSelectedPower] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value: string) => {
        setSelectedPower((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleCreateRoom = async () => {
        setIsLoading(true);

        // Create room object
        // const newRoom: Room = {
        //     id: crypto.randomUUID(), // Generate unique ID
        //     name: roomName,
        //     creator: socket.id, // Using socket ID as creator ID
        //     players: [socket.id], // Initial player is the creator
        //     type: selectedType,
        //     state: 'waiting',
        //     seed: Math.random().toString(36).substring(7), // Generate random seed
        // };

        // const newRoom: Room = {
        //     id: crypto.randomUUID(),
        //     name: roomName.trim(),
        //     creator: socket.id,
        //     players: [socket.id],
        //     type: selectedType,
        //     state: 'waiting',
        //     seed: Math.random().toString(36).substring(7),
        //     powerUps: selectedPower,
        // };

        // // Send create-room event
        // send('create-room', newRoom);

        // console.log('newRoom', newRoom);
        const newRoom = {
            id: crypto.randomUUID(), // Unique ID for the room
            name: roomName.trim(),
            creator: socket.id,
            players: [socket.id],
            type: selectedType,
            state: 'waiting',
            seed: '',  // Seed will be generated in createRoom
            powerUps: selectedPower,
        };

        await createRoom(newRoom);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className='flex min-h-dvh w-full flex-col place-content-center gap-28'>
            <div className='mx-auto -mb-24 flex w-[80rem] justify-between'>
                <ButtonIcon icon={ArrowFatLeft} onClick={handleCancel} />
                <ButtonIcon icon={CircleHelp} />
            </div>
            <h1 className='mx-auto text-6xl font-bold'>Create New Room</h1>
            <div className='mx-auto flex w-full max-w-2xl flex-col place-content-center gap-y-8 text-xl font-bold'>
                <div className='flex'>
                    <div className='my-auto basis-1/4'>Room Name</div>
                    <div className='basis-3/4'>
                        <Input
                            placeholder='Enter room name... (max 16 characters)'
                            value={roomName}
                            onChange={(e) =>
                                setRoomName(e.target.value.slice(0, 16))
                            }
                            maxLength={16}
                        />
                    </div>
                </div>
                <div className='flex'>
                    <div className='my-auto basis-1/4'>Game Type</div>
                    <div className='my-auto flex basis-3/4 gap-x-8'>
                        <Radio
                            name='gametype'
                            value='normal'
                            checked={selectedType === 'normal'}
                            onChange={(e) =>
                                setSelectedType(
                                    e.target.value as 'normal' | 'extreme'
                                )
                            }
                            color='purple'
                            label='Normal'
                        />
                        <Radio
                            name='gametype'
                            value='extreme'
                            checked={selectedType === 'extreme'}
                            onChange={(e) =>
                                setSelectedType(
                                    e.target.value as 'normal' | 'extreme'
                                )
                            }
                            color='purple'
                            label='Extreme'
                        />
                    </div>
                </div>

                <div className='flex'>
                    <div className='basis-1/4 content-start'>Power Ups</div>
                    <div className='flex basis-3/4 flex-row gap-x-8'>
                        <CardCheckbox
                            name='option1'
                            value='option1'
                            checked={selectedPower.includes('option1')}
                            onChange={() => handleChange('option1')}
                            color='purple'
                            label='Option 1'
                        />
                        <CardCheckbox
                            name='option2'
                            value='option2'
                            checked={selectedPower.includes('option2')}
                            onChange={() => handleChange('option2')}
                            color='purple'
                            label='Option 2'
                        />
                        <CardCheckbox
                            name='option3'
                            value='option3'
                            checked={selectedPower.includes('option3')}
                            onChange={() => handleChange('option3')}
                            color='purple'
                            label='Option 3'
                        />
                    </div>
                </div>
            </div>
            <div className='mx-auto flex gap-8'>
                <Button
                    variant='outline'
                    color='purple'
                    size='lg'
                    onClick={handleCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    color='purple'
                    size='lg'
                    onClick={handleCreateRoom}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Confirm'}
                </Button>
            </div>
        </div>
    );
}