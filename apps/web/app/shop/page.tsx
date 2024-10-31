import { Button } from '../_components/ui/button';
import Image from 'next/image';
import Layout from '../_components/common/layout';
import CoinButton from '../_components/common/coin-button';
import BackButton from '../_components/common/back-button';

export default function Page() {
    const skins = [
        {
            id: 1,
            image: '/defaultskin.svg',
            price: 200,
            isBought: false,
        },
        {
            id: 2,
            image: '/defaultskin.svg',
            price: 200,
            isBought: true,
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
                    <p className='text-orange text-xl'>Find My Mines</p>
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
                                {skin.isBought ? (
                                    <Button
                                        variant='outline'
                                        color='orange'
                                        size='lg'
                                        className='w-full'
                                        disabled
                                    >
                                        Bought
                                    </Button>
                                ) : (
                                    <Button
                                        variant='default'
                                        color='white'
                                        size='lg'
                                        className='w-full'
                                    >
                                        <div className='relative h-10 w-10'>
                                            <Image
                                                src='/coin.svg'
                                                className='object-contain pr-3'
                                                alt='coin'
                                                fill
                                            />
                                        </div>
                                        {skin.price}
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
