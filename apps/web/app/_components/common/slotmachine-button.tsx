'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import AuthLink from './auth-link';

type SlotmachineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SlotMachineButton({
    ...props
}: SlotmachineButtonProps) {
    return (
        <AuthLink href='/slotmachine'>
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
        </AuthLink>
    );
}
