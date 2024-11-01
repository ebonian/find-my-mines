import { Button } from './button';
import Image from 'next/image';

type SkinCardInterface = {
    imgsrc: string;
    variant: 'default' | 'outline' | null | undefined;
    color:
        | 'white'
        | 'brown'
        | 'gray'
        | 'black'
        | 'cyan'
        | 'green'
        | 'orange'
        | 'purple'
        | 'red'
        | null
        | undefined;
    text: string;
    isShop?: boolean;
    onClick?: () => void;
};

const SkinCard: React.FC<SkinCardInterface> = ({
    imgsrc,
    variant = 'default',
    color,
    text,
    isShop = false,
    onClick = () => {},
}) => {
    return (
        <div className='mr-7 h-96 w-80 rounded-3xl bg-[#86615C] bg-opacity-10'>
            <div className='flex flex-col items-center justify-center'>
                <div className='relative h-72 w-72'>
                    <Image
                        src={imgsrc}
                        className='mt-3 rounded-3xl object-contain'
                        alt={imgsrc}
                        fill
                    />
                </div>
                <Button
                    variant={variant}
                    color={color}
                    size='lg'
                    className='mt-6 px-20'
                    onClick={onClick}
                >
                    {isShop && variant == 'default' && (
                        <div className='relative h-10 w-10'>
                            <Image
                                src='/coin.svg'
                                className='object-contain pr-3'
                                alt='coin'
                                fill
                            />
                        </div>
                    )}
                    {text}
                </Button>
            </div>
        </div>
    );
};

export default SkinCard;
