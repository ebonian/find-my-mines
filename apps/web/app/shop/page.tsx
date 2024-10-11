'use client';
import { Button } from '../_components/ui/button';
import BackButton from '../_components/ui/BackButton';

export default function shop() {
    return (
        <div
            className='flex grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='absolute left-1 top-12 px-16'>
                <BackButton></BackButton>
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
                <div className='mr-7 h-96 w-80 rounded-3xl bg-[#86615C] bg-opacity-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src='boardskin.svg' className='mb-4'></img>
                        <Button
                            variant='outline'
                            color='orange'
                            size='lg'
                            className='px-28'
                        >
                            Bought
                        </Button>
                    </div>
                </div>
                <div className='ml-7 h-96 w-80 rounded-3xl bg-[#86615C] bg-opacity-10'></div>
            </div>
            <div className='items-center'>
                {/* <Button variant='default' color='brown'></Button> */}
            </div>
        </div>
    );
}
