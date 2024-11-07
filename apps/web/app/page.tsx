'use client';

import GoogleLoginButton from './_components/common/google-login-button';
import ScoreboardButton from './_components/common/scoreboard-button';
import MySkinButton from './_components/common/my-skin';
import Layout from './_components/common/layout';
import Link from 'next/link';
import { useAuthContext } from './_contexts/auth';
import { Button } from './_components/ui/button';
import SlotMachineButton from './_components/common/slotmachine-button';
import UserButton from './_components/common/user-button';
import CoinButton from './_components/common/coin-button';

export default function Page() {
    const { user, logout } = useAuthContext();

    return (
        <Layout className='flex min-h-screen flex-col items-center justify-center'>
            <div className='absolute right-0 top-10'>
                {user ? (
                    <>
                        <div>
                            <Link href='/nickname'>
                                <UserButton>{user?.username}</UserButton>
                            </Link>
                        </div>
                    </>
                ) : null}
            </div>
            <div className='absolute left-0 top-10'>
                {user ? <CoinButton>{user?.balance}</CoinButton> : null}
            </div>

            <div className='flex flex-col items-center space-y-10 text-center'>
                <h1 className='text-7xl font-bold'>
                    <span className='text-white'>Find My </span>
                    <span className='text-red'>Mines</span>
                </h1>
                <div className='text-purple text-center font-bold'>
                    Find the mines before they find you!
                </div>
                <div className='flex w-full max-w-md flex-col items-center space-y-2'>
                    {user ? (
                        <>
                            <Link href='/game/rooms'>
                                <Button
                                    color='green'
                                    size='lg'
                                    className='max-w-min px-20'
                                >
                                    Play
                                </Button>
                            </Link>
                            <button
                                className='opacity-50 hover:underline'
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <GoogleLoginButton />
                    )}
                </div>
                <div className='grid max-w-2xl grid-cols-3 gap-8'>
                    <MySkinButton />
                    <ScoreboardButton />
                    <SlotMachineButton />
                </div>
            </div>
        </Layout>
    );
}
