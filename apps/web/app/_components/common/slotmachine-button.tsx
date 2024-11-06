import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { env } from 'next-runtime-env';
import { useAuthContext } from '../../_contexts/auth';

type SlotmachineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SlotMachineButton({
    ...props
}: SlotmachineButtonProps) {
    const { user } = useAuthContext();
    return (
        <Link
            href={
                user
                    ? '/slotmachine'
                    : `${env('NEXT_PUBLIC_SERVER_URL')}/auth/google`
            }
        >
            <Button
                {...props}
                color='brown'
                className='h-12 space-x-4 bg-opacity-10 px-10 py-3'
            >
                <div className='relative aspect-square h-full'>
                    <Image
                        src='/slotmachine.svg'
                        alt='slotmachine'
                        fill
                        className='object-contain'
                    />
                </div>
                <span>Slot Machine</span>
            </Button>
        </Link>
    );
}
