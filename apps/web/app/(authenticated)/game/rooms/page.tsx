'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../../../_components/ui/button';
import { useGameContext } from '../../../_contexts/game';
import Layout from '../../../_components/common/layout';
import BackButton from '../../../_components/common/back-button';
import HelpButton from '../../../_components/common/help-button';
import Link from 'next/link';
import RoomCard from '../../../_components/common/room-card';
import HowToPlayModal from '../../../_components/common/how-to-play-modal';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const { rooms, room } = useGameContext();

    const availableRooms = rooms.filter((room) => room.state === 'waiting');

    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        if (room) {
            router.push('/game/play');
        }
    }, [room]);

    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={
                <>
                    <HelpButton
                        isIconOnly
                        onClick={() => {
                            setIsShowModal(true);
                        }}
                    />
                    {isShowModal && (
                        <HowToPlayModal onClose={() => setIsShowModal(false)} />
                    )}
                </>
            }
        >
            <div className='flex w-full max-w-screen-xl flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>Lobby</h1>
                    <p className='text-purple text-xl'>
                        Join Existing Game or Create New
                    </p>
                </div>

                <div className='grid w-full grid-cols-3 gap-12'>
                    {availableRooms.map((room) => (
                        <RoomCard key={room._id} {...room} />
                    ))}
                </div>

                <div className='flex gap-8'>
                    <Button
                        className='h-14 gap-4 px-12'
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
                        <Button
                            className='h-14 gap-4 px-12'
                            color='purple'
                            size='lg'
                        >
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
        </Layout>
    );
}
