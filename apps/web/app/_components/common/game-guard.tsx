'use client';

import { useRouter } from 'next/navigation';
import { useGameContext } from '../../_contexts/game';
import { useEffect } from 'react';

interface GameGuardProps {
    children: React.ReactNode;
}

export default function GameGuard({ children }: GameGuardProps) {
    const router = useRouter();
    const { joinedGameRoom } = useGameContext();

    useEffect(() => {
        if (joinedGameRoom) {
            router.push('/game/play');
        }
    }, [joinedGameRoom]);

    return <>{children}</>;
}
