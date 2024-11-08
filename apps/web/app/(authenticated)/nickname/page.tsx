'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import Layout from '../../_components/common/layout';
import { Button } from '../../_components/ui/button';
import { Input } from '../../_components/ui/input';
import { useAuthContext } from '../../_contexts/auth';
import axios from '../../_lib/axios';

export default function Page() {
    const router = useRouter();
    const { user, fetchUser } = useAuthContext();
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user?.username) {
            setNickname(user?.username);
        }
    }, [user]);

    // useEffect(() => {
    //     if (
    //         localStorage.getItem('nickname') !== user?.username ||
    //         localStorage.getItem('nickname')
    //     ) {
    //         console.log('nickname already set');
    //         router.push('/');
    //     }
    // }, [router]);

    const updateUsername = async (newNickname: string) => {
        try {
            const response = await axios.patch('/users', {
                updatingUser: {
                    username: newNickname,
                },
            });
            fetchUser();
        } catch (exception) {
            console.log(exception);
        }
    };

    const handleSetNickname = async () => {
        if (!user) {
            return alert('Not authenticated.');
        }

        if (!nickname.trim()) {
            return alert('Nickname is required.');
        }

        setIsLoading(true);
        await updateUsername(nickname);
        // localStorage.setItem('setNickname', 'true');
        router.push('/');
    };
    return (
        <Layout className='flex min-h-screen flex-col items-center justify-center'>
            <div className='flex flex-col items-center space-y-16'>
                <div className='text-center font-bold'>
                    <h1 className='text-green text-6xl'>Enter Your Name</h1>
                    <p className='mt-8 text-2xl font-bold text-white'>
                        Eg. poonisnotconcrete, Tungdude, ...
                    </p>
                </div>
                <Input
                    className='h-12'
                    placeholder='Enter your name...(max 16 characters)'
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={16}
                />

                {/* have to edit redirect path to /nickname in auth controller  */}
                <Button
                    className='mt-4 w-44 items-center text-xl'
                    size='lg'
                    color='green'
                    onClick={handleSetNickname}
                    disabled={isLoading}
                >
                    Confirm
                </Button>
            </div>
        </Layout>
    );
}
