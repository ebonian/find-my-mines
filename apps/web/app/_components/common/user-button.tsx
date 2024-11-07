import Image from 'next/image';
import { Button } from '../ui/button';

type UserButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function UserButton({ ...props }: UserButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 cursor-default space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/user.svg'
                    alt='user'
                    fill
                    className='object-contain'
                />
            </div>
            <span>{props.children}</span>
        </Button>
    );
}
