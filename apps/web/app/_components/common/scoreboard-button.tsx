'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import AuthLink from './auth-link';

type ScoreboardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ScoreboardButton({ ...props }: ScoreboardButtonProps) {
    return (
        <AuthLink href='/scoreboard'>
            <Button
                {...props}
                color='brown'
                className='h-12 w-full space-x-4 bg-opacity-10 py-3'
            >
                <div className='relative aspect-square h-full'>
                    <Image
                        src='/scoreboard.svg'
                        alt='scoreboard'
                        fill
                        className='object-contain'
                    />
                </div>
                <span>Scoreboard</span>
            </Button>
        </AuthLink>
    );
}
