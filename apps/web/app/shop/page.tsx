'use client';
import { Button } from '../_components/ui/button';
import BackButton from '../_components/ui/BackButton';
import Image from 'next/image';
import axios from '../_lib/axios';
import { useAuthContext } from '../_contexts/auth';
import { useState, useEffect } from 'react';
import SkinCard from '../_components/ui/skinCard';

export default function shop() {
    const { user } = useAuthContext();

    if (!user) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const { data } = await axios.get('/skins');
                setShopItems(data);
            } catch (error) {
                console.error(error);
                setShopItems([]);
            }
        };

        fetchShopItems();
    }, []);

    const [shopItems, setShopItems] = useState<
        {
            id: string;
            price: number;
        }[]
    >([]);

    console.log(shopItems);

    return (
        <div
            className='flex min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='absolute left-1 top-12 px-16'>
                <BackButton className='items-center px-5'></BackButton>
            </div>
            <div className='absolute right-12 top-12 flex h-10 w-32 items-center justify-center rounded-3xl bg-[#86615C] bg-opacity-10'>
                <div className='relative h-8 w-8'>
                    <Image
                        src='/coin.svg'
                        className='object-contain pr-4'
                        alt='coin'
                        fill
                    />
                </div>
                <div className='font-Monstserrat text-base font-bold'>
                    {user.balance}
                </div>
            </div>
            <div className='inset-x-0 top-2 flex justify-center'>
                <div className='absolute inset-x-0 top-14 mb-12'>
                    <div className='font-Monstserrat mb-4 place-content-start text-center text-6xl font-bold text-[#FFEDDF]'>
                        Shop
                    </div>
                    <div className='font-Monstserrat place-content-start text-center text-xl font-bold text-[#EE964B]'>
                        Find My Mines
                    </div>
                </div>
            </div>
            <div className='mt-16 flex items-center justify-center'>
                {shopItems.map((item) => (
                    <SkinCard
                        imgsrc='defaultskin.svg'
                        variant='outline'
                        color='white'
                        text={item.price.toString()}
                        onClick={async () => {
                            await axios.post('/skins/buy', {
                                userId: user.id,
                                skinId: item.id,
                            });
                            console.log(`skin id: ${item.id}`);
                        }}
                    />
                ))}

                <SkinCard
                    imgsrc='defaultskin.svg'
                    variant='outline'
                    color='orange'
                    text='Bought'
                    isShop
                />
                <SkinCard
                    imgsrc='defaultskin.svg'
                    variant='default'
                    color='white'
                    text='200'
                    isShop
                    onClick={async () => {
                        await axios.post('/skins/buy', {
                            userId: user.id,
                            skinId: '0',
                        });
                        console.log(`skin id:`);
                    }}
                />
            </div>
            <div className='items-center'>
                {/* <Button variant='default' color='brown'></Button> */}
            </div>
        </div>
    );
}
