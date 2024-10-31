import Image from 'next/image';

interface HowToPlayModalProps {
    onClose: () => void;
}

export default function HowToPlayModal({ onClose }: HowToPlayModalProps) {
    const howToPlay = [
        '1. The point of this game is to win go team go',
        '2. Fight until death',
        '3. I need a bunch of sample text for this page',
        '4. How to make Khaow Man Kai',
        '5. First, You need a Rice Cooker',
        '6. You put rice in the rice cooker',
    ];
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 p-4'>
            <div className='relative flex h-[640px] w-[640px] flex-col overflow-clip rounded-3xl'>
                <Image
                    src='/X.svg'
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
