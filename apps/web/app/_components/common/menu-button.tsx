import Image from 'next/image';
import { Button } from '../ui/button';

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function MenuButton({ ...props }: MenuButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/menu.svg'
                    alt='menu'
                    fill
                    className='object-contain'
                />
            </div>
        </Button>
    );
}
