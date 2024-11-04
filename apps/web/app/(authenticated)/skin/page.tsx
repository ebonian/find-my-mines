'use client';

import { Button } from '../../_components/ui/button';
import Image from 'next/image';
import Layout from '../../_components/common/layout';
import CoinButton from '../../_components/common/coin-button';
import BackButton from '../../_components/common/back-button';
import { useAuthContext } from '../../_contexts/auth';
import type { Skin } from '@repo/shared-types';
import { useGameContext } from '../../_contexts/game';

export default function Skin() {
    const { user } = useAuthContext();
    const { skins, equippedSkin, setEquippedSkinHandler } = useGameContext();

    const skinItems = skins.filter((skin) => user?.skins.includes(skin.name));

    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={<CoinButton>{user?.balance}</CoinButton>}
        >
            <div className='flex flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>My Skins</h1>
                    <p className='text-purple text-xl'>Find My Mines</p>
                </div>
                {skinItems.length == 0 && (
                    <div className='flex h-96 items-center text-3xl'>
                        You do not own any skin... yet!
                    </div>
                )}
                <div className='grid grid-cols-2 gap-10'>
                    {skinItems.map((skin) => {
                        const isEquiped = equippedSkin === skin.name;
                        return (
                            <div
                                key={skin._id}
                                className='bg-brown rounded-3xl bg-opacity-10'
                            >
                                <div className='flex flex-col items-center justify-center space-y-4 p-4'>
                                    <div className='relative aspect-square w-72'>
                                        <Image
                                            src='/defaultskin.svg'
                                            className='rounded-3xl object-contain'
                                            alt='skin'
                                            fill
                                        />
                                    </div>
                                    <Button
                                        variant={
                                            isEquiped ? 'outline' : 'default'
                                        }
                                        color={isEquiped ? 'purple' : 'white'}
                                        size='lg'
                                        className='w-full'
                                        onClick={() =>
                                            setEquippedSkinHandler(skin.name)
                                        }
                                        disabled={isEquiped}
                                    >
                                        {isEquiped ? 'Equiped' : 'Use'}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
