import Image from 'next/image';
import { Button } from '../ui/button';

type LocaleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function LocaleButton({ ...props }: LocaleButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/locale.svg'
                    alt='locale'
                    fill
                    className='object-contain'
                />
            </div>
            <span>ENG</span>
        </Button>
    );
}
