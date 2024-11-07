'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import AuthLink from './auth-link';

type MySkinButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function MySkinButton({ ...props }: MySkinButtonProps) {
    return (
        <AuthLink href='/skins'>
            <Button
                {...props}
                color='brown'
                className='h-12 w-full space-x-4 bg-opacity-10 py-3'
            >
                <div className='relative aspect-square h-full'>
                    <Image
                        src='/my-skin.svg'
                        alt='my-skin'
                        fill
                        className='object-contain'
                    />
                </div>
                <span>Skin Shop</span>
            </Button>
        </AuthLink>
    );
}
