import Image from 'next/image';
import { Button } from '../ui/button';

type ShopButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ShopButton({ ...props }: ShopButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/shop.svg'
                    alt='shop'
                    fill
                    className='object-contain'
                />
            </div>
            <span>Shop</span>
        </Button>
    );
}
