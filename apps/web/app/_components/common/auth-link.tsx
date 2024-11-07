'use client';

import Link from 'next/link';
import { useAuthContext } from '../../_contexts/auth';
import { env } from 'next-runtime-env';

interface AuthLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function AuthLink({ href, children }: AuthLinkProps) {
    const { user } = useAuthContext();

    return (
        <Link
            href={user ? href : `${env('NEXT_PUBLIC_SERVER_URL')}/auth/google`}
        >
            {children}
        </Link>
    );
}
