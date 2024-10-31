'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href: string;
}

export default function BackButton({ ...props }: BackButtonProps) {
    const router = useRouter();

    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
            onClick={(e) => {
                if (props.onClick) {
                    props.onClick(e);
                    return;
                }

                if (props.href) {
                    router.push(props.href);
                } else {
                    router.back();
                }
            }}
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/arrow-left.svg'
                    alt='arrow-left'
                    fill
                    className='object-contain'
                />
            </div>
        </Button>
    );
}
