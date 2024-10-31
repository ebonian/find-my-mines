import Image from 'next/image';
import { Button } from '../ui/button';

interface HelpButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isIconOnly?: boolean;
}

export default function HelpButton({ isIconOnly, ...props }: HelpButtonProps) {
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
            {isIconOnly ? null : <span>Help</span>}
        </Button>
    );
}
