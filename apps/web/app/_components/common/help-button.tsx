import Image from 'next/image';
import { Button } from '../ui/button';

type HelpButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function HelpButton({ ...props }: HelpButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/help.svg'
                    alt='help'
                    fill
                    className='object-contain'
                />
            </div>
            <span>Help</span>
        </Button>
    );
}
