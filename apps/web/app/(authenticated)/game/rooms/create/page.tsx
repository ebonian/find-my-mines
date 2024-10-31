'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '../../../../_contexts/socket';
import { Button } from '../../../../_components/ui/button';
import { Input } from '../../../../_components/ui/input';
import type { Room } from '@repo/shared-types';
import { useGameContext } from '../../../../_contexts/game';
import { Radio } from '../../../../_components/ui/radio';
import { CardCheckbox } from '../../../../_components/ui/card';
import { useAuthContext } from '../../../../_contexts/auth';

export default function Create() {
    const router = useRouter();
    const { user } = useAuthContext();
    const { createRoom } = useGameContext();

    const [roomName, setRoomName] = useState('');
    const [selectedType, setSelectedType] = useState<'normal' | 'extreme'>(
        'normal'
    );
    const [selectedPower, setSelectedPower] = useState<string[]>([]);
    const [customSeed, setCustomSeed] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (value: string) => {
        setSelectedPower((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            return alert('Room name is required.');
        }

        if (isLoading) return;

        if (!user) {
            return alert('Not authenticated.');
        }

        setIsLoading(true);

        const newRoom = {
            name: roomName.trim(),
            creator: user._id,
            players: [],
            type: selectedType,
            state: 'waiting',
            seed: customSeed,
            powerUps: selectedPower,
        } as Room;

        createRoom(newRoom);
        setIsLoading(false);
        router.push('/game/rooms');
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className='flex min-h-dvh w-full flex-col place-content-center gap-28'>
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
                <div className='flex'>
                    <div className='my-auto basis-1/4'>
                        Custom Seed (Optional)
                    </div>
                    <div className='basis-3/4'>
                        <Input
                            placeholder='Enter seed...'
                            value={customSeed}
                            onChange={(e) => setCustomSeed(e.target.value)}
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
