'use client';

import { Button } from '../../_components/ui/button';
import Image from 'next/image';
import Layout from '../../_components/common/layout';
import CoinButton from '../../_components/common/coin-button';
import BackButton from '../../_components/common/back-button';
import { useAuthContext } from '../../_contexts/auth';
import { useEffect, useState } from 'react';
import axios from '../../_lib/axios';
import { Input } from '../../_components/ui/input';
import Link from 'next/link';

export default function Page() {
    const { user } = useAuthContext();
    const [nickname, setNickname] = useState('');

    const handleSetNickname = async () => {
        if (!user) {
            return alert('Not authenticated.');
        }
    };
    return (
        <Layout className='flex min-h-screen flex-col items-center justify-center'>
            <div className='flex flex-col items-center space-y-16'>
                <div className='text-center font-bold'>
                    <h1 className='text-6xl text-white'>Set Your Name</h1>
                    <p className='text-green mt-8 text-3xl font-bold'>
                        Find My Mines
                    </p>
                </div>
                <Input
                    className='h-12'
                    placeholder='Enter your name...(max 16 characters)'
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={16}
                />

                {/* have to edit redirect path to /register in link of page.tsx and auth controller  */}
                <Link href='game/rooms'>
                    <Button
                        className='mt-4 w-44 items-center text-xl'
                        size='lg'
                        color='green'
                    >
                        Confirm
                    </Button>
                </Link>
            </div>
        </Layout>
    );
}
