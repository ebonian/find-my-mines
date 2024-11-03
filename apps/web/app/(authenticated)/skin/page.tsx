'use client';

import { Button } from '../../_components/ui/button';
import Image from 'next/image';
import Layout from '../../_components/common/layout';
import CoinButton from '../../_components/common/coin-button';
import BackButton from '../../_components/common/back-button';
import { useAuthContext } from '../../_contexts/auth';
import { useEffect, useState } from 'react';
import axios from '../../_lib/axios';
import type { Skin } from '@repo/shared-types';

export default function Skin() {
    const { user } = useAuthContext();

    if (!user) {
        return <div>Loading...</div>;
    }

    // const skins = [
    //     {
    //         id: 1,
    //         image: '/defaultskin.svg',
    //         isEquiped: false,
    //     },
    //     {
    //         id: 2,
    //         image: '/defaultskin.svg',
    //         isEquiped: true,
    //     },
    // ];

    // console.log("user.skin: ",user.skin);

    
    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const promises = user.skin
                    .filter(skin => skin.length > 0)
                    .map(skin => axios.get(`/skins/${skin}`));
    
                const results = await Promise.all(promises);
                const data = results.map(result => result.data);
    
                // Set skinItems only once after all data has been fetched
                console.log(data);
                setSkinItems(data);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchShopItems();
    }, [user]);
    

    const [skinItems, setSkinItems] = useState<
    {
        _id: string;
        price: number;
    }[]
    >([]);

    // console.log(skinItems);
    
    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={<CoinButton>{user.balance}</CoinButton>}
        >
            <div className='flex flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>My Skins</h1>
                    <p className='text-purple text-xl'>Find My Mines</p>
                </div>
                {skinItems.length == 0 &&
                    <div className='flex text-3xl h-96 items-center'>You do not own any skin... yet!</div>
                    }
                <div className='grid grid-cols-2 gap-10'>
                    {skinItems.map((skin) => (
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
                                { false 
                                // skin.isEquiped 
                                ? (
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
