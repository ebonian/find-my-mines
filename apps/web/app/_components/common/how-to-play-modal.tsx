import Image from 'next/image';

interface HowToPlayModalProps {
    onClose: () => void;
}

export default function HowToPlayModal({ onClose }: HowToPlayModalProps) {
    const howToPlay = [
        '1. Find as many bombs as you can on the grid to earn points.',
        '2. In each turn, you have 10 seconds to choose a slot on the grid that you think contains a bomb.',
        '3. For every bomb you find, you earn points. The more bombs you uncover, the higher your score.',
        '4. The game ends when all bombs on the grid have been found.',
        'Good luck, and happy hunting!',
        ,
    ];
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 p-4'>
            <div className='relative flex h-[640px] w-[640px] flex-col overflow-clip rounded-3xl'>
                <Image
                    src='/icon/x.svg'
                    onClick={onClose}
                    alt='close'
                    width={32}
                    height={32}
                    className='absolute right-8 top-8 cursor-pointer'
                />
                <div className='bg-orange flex w-full justify-center py-8'>
                    <p className='text-gray text-2xl font-bold'>How To Play</p>
                </div>
                <div className='text-gray flex h-full w-full flex-col overflow-scroll bg-white px-4 py-4'>
                    {howToPlay.map((text, index) => (
                        <p key={index} className='p-4 text-xl font-semibold'>
                            {text}
                        </p>
                    ))}
                </div>
            </div>
            .
        </div>
    );
}
