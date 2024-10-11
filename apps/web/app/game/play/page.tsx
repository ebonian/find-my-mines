import { Button } from '../../_components/ui/button';
import { Input } from '../../_components/ui/input';

export default function play() {
    return (
        <div
            className='flex grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='flex flex-row'>
                <Button
                    variant='default'
                    color='brown'
                    className='absolute left-36 bg-opacity-10 px-8'
                >
                    <img src='/menu.svg'></img>
                </Button>
                <Button
                    variant='default'
                    color='brown'
                    className='absolute right-36 bg-opacity-10 px-8'
                >
                    <img src='/messages-square.svg'></img>
                </Button>
            </div>
            <div className='ml-32 mr-32 flex flex-row items-center'>
                <img src='/Bomb.svg' className='px-16'></img>
                <div className='font-Montserrat text-red px-16 text-6xl font-bold'>
                    08
                </div>
                <img src='/construction.svg'></img>
                <div className='font-Montserrat text-green px-16 text-6xl font-bold'>
                    257
                </div>
                <img src='/smile.svg' className='px-16'></img>
            </div>
            <div className='font-Montserrat text-center text-xl font-bold text-[#FFEDDF]'>
                Waiting for Tungdude
            </div>
        </div>
    );
}
