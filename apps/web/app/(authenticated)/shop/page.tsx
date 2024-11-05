'use client';

import { Button } from '../../_components/ui/button';
import Image from 'next/image';
import Layout from '../../_components/common/layout';
import CoinButton from '../../_components/common/coin-button';
import BackButton from '../../_components/common/back-button';
import { useAuthContext } from '../../_contexts/auth';
import axios from '../../_lib/axios';
import { useGameContext } from '../../_contexts/game';
import SkinBoard from '../../_components/common/skin-board';

export default function Page() {
    const { user, fetchUser } = useAuthContext();
    const { skins, equippedSkin, setEquippedSkinHandler } = useGameContext();

    const buySkinHandler = async (skinId: string) => {
        const skin = skins.find((skin) => skin._id === skinId);
        if (!skin || !user) {
            return;
        }

        if (user?.balance < skin.price) {
            alert('Insufficient balance');
            return;
        }

        try {
            await axios.post('/skins/buy', {
                skinId,
            });
            fetchUser();
        } catch (err) {
            alert('Error buying skin');
        }
    };

    return (
        <Layout
            className='flex min-h-screen flex-col items-center py-16'
            leftButton={<BackButton href='/' />}
            rightButton={<CoinButton>{user?.balance}</CoinButton>}
        >
            <div className='flex flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl text-white'>Shop</h1>
                    <p className='text-orange text-xl'>Find My Mines</p>
                </div>
                <div className='grid grid-cols-2 gap-10'>
                    {skins.map((skin) => {
                        const isBought = user?.skins.includes(skin.name);
                        const isEquiped = equippedSkin === skin.name;
                        return (
                            <div
                                key={skin._id}
                                className='bg-brown rounded-3xl bg-opacity-10'
                            >
                                <div className='flex flex-col items-center justify-center space-y-4 p-4'>
                                    <SkinBoard skin={skin} />
                                    <Button
                                        variant={
                                            !isBought
                                                ? 'default'
                                                : isEquiped
                                                  ? 'outline'
                                                  : 'default'
                                        }
                                        color={!isBought ? 'white' : 'orange'}
                                        size='lg'
                                        className='w-full gap-3'
                                        onClick={() => {
                                            if (isBought) {
                                                setEquippedSkinHandler(
                                                    skin.name
                                                );
                                            } else {
                                                buySkinHandler(skin._id);
                                            }
                                        }}
                                        disabled={isEquiped}
                                    >
                                        {!isBought ? (
                                            <Image
                                                src='/coin.svg'
                                                alt='coin'
                                                width={20}
                                                height={20}
                                            />
                                        ) : null}
                                        <span>
                                            {!isBought
                                                ? skin.price
                                                : isEquiped
                                                  ? 'Equiped'
                                                  : 'Use'}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
