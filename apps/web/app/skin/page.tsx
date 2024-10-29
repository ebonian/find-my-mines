'use client';
import { Button } from '../_components/ui/button';
import BackButton from '../_components/ui/BackButton';
import Image from 'next/image';

export default function Skin() {
    return (
        <div
            className='flex grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='absolute left-1 top-12 px-16'>
                <BackButton className='items-center px-5'></BackButton>
            </div>
            <div className='absolute right-12 top-12 flex h-10 w-32 items-center justify-center rounded-3xl bg-[#86615C] bg-opacity-10'>
                <div className='relative h-8 w-8'>
                    <Image
                        src='coin.svg'
                        className='object-contain pr-4'
                        alt='coin'
                        fill
                    />
                </div>
                <div className='font-Monstserrat text-base font-bold'>
                    1,000
                </div>
            </div>

            <div className='inset-x-0 top-2 flex justify-center'>
                <div className='absolute inset-x-0 top-14 mb-12'>
                    <div className='font-Monstserrat mb-4 place-content-start text-center text-6xl font-bold text-[#FFEDDF]'>
                        My Skins
                    </div>
                    <div className='font-Monstserrat place-content-start text-center text-xl font-bold text-[#C59CC8]'>
                        Find My Mines
                    </div>
                </div>
            </div>
            <div className='mt-16 flex items-center justify-center'>
                <div className='mr-7 h-96 w-80 rounded-3xl bg-[#86615C] bg-opacity-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='relative h-72 w-72'>
                            <Image
                                src='defaultskin.svg'
                                className='mt-3 rounded-3xl object-contain'
                                alt='default skin'
                                fill
                            />
                        </div>
                        <Button
                            variant='outline'
                            color='purple'
                            size='lg'
                            className='mt-6 px-20'
                        >
                            Equipped
                        </Button>
                    </div>
                </div>
                <div className='ml-7 h-96 w-80 rounded-3xl bg-[#86615C] bg-opacity-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='relative h-72 w-72'>
                            <Image
                                src='defaultskin.svg'
                                className='mt-3 rounded-3xl object-contain'
                                alt='default skin' // edit after having new theme
                                fill
                            />
                        </div>
                        <Button
                            variant='default'
                            color='white'
                            size='lg'
                            className='mt-6 px-28'
                        >
                            Use
                        </Button>
                    </div>
                </div>
            </div>
            <div className='items-center'>
                {/* <Button variant='default' color='brown'></Button> */}
            </div>
        </div>
    );
}
