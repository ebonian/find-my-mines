'use client';
import { Button } from '../_components/ui/button';
import Image from 'next/image';
import Layout from '../_components/common/layout';
import CoinButton from '../_components/common/coin-button';
import BackButton from '../_components/common/back-button';

export default function Skin() {
    const skins = [
        {
            id: 1,
            image: '/defaultskin.svg',
            isEquiped: false,
        },
        {
            id: 2,
            image: '/defaultskin.svg',
            isEquiped: true,
        },
    ];
    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={<CoinButton>1,000</CoinButton>}
        >
            <div className='flex flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>Shop</h1>
                    <p className='text-purple text-xl'>Find My Mines</p>
                </div>
                <div className='grid grid-cols-2 gap-10'>
                    {skins.map((skin) => (
                        <div
                            key={skin.id}
                            className='bg-brown rounded-3xl bg-opacity-10'
                        >
                            <div className='flex flex-col items-center justify-center space-y-4 p-4'>
                                <div className='relative aspect-square w-72'>
                                    <Image
                                        src={skin.image}
                                        className='rounded-3xl object-contain'
                                        alt='skin'
                                        fill
                                    />
                                </div>
                                {skin.isEquiped ? (
                                    <Button
                                        variant='outline'
                                        color='purple'
                                        size='lg'
                                        className='w-full'
                                        disabled
                                    >
                                        Equiped
                                    </Button>
                                ) : (
                                    <Button
                                        variant='default'
                                        color='white'
                                        size='lg'
                                        className='w-full'
                                    >
                                        Use
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
