import Image from 'next/image';
import { Button } from '../ui/button';

type MySkinButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function MySkinButton({ ...props }: MySkinButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/my-skin.svg'
                    alt='my-skin'
                    fill
                    className='object-contain'
                />
            </div>
            <span>My Skin</span>
        </Button>
    );
}
