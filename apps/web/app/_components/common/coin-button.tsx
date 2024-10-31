import Image from 'next/image';
import { Button } from '../ui/button';

type CoinButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CoinButton({ ...props }: CoinButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/coin.svg'
                    alt='coin'
                    fill
                    className='object-contain'
                />
            </div>
            <span>{props.children}</span>
        </Button>
    );
}
