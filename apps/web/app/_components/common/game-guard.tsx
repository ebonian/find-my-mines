'use client';

import { useRouter } from 'next/navigation';
import { useGameContext } from '../../_contexts/game';
import { useEffect } from 'react';

interface GameGuardProps {
    children: React.ReactNode;
}

export default function GameGuard({ children }: GameGuardProps) {
    const router = useRouter();
    const { room } = useGameContext();

    useEffect(() => {
        if (room?.state === 'waiting' || room?.state === 'playing') {
            router.push('/game/play');
        } else if (room?.state === 'end') {
            router.push('/game/end');
        }
    }, [room]);

    return <>{children}</>;
}
