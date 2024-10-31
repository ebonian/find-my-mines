'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../_contexts/auth';
import { useEffect } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { user, loading } = useAuthContext();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading]);

    return <>{children}</>;
}
