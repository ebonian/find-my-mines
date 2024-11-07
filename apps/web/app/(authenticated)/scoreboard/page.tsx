'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '../../_components/common/back-button';
import axios from '../../_lib/axios';
import { User } from '@repo/shared-types';
import { useAuthContext } from '../../_contexts/auth';
import Layout from '../../_components/common/layout';

export default function Page() {
    type returnMyData = {
        rank: string;
        playerName: string;
        score: string;
        final: boolean;
    };

    type Players = {
        [key: string]: number;
    };

    const [topPlayers, setTopPlayers] = useState<User[]>([]);
    const [thisPlayer, setThisPlayer] = useState<User | null>(null);
    const [thisRank, setThisRank] = useState(0);
    const { user } = useAuthContext();

    const [currentPlayerOnTop, setcurrentPlayerOnTop] =
        useState<Boolean>(false);

    useEffect(() => {
        fetchTopPlayers();
        fetchCurrentPlayer();
    }, []);

    const fetchTopPlayers = async () => {
        const { data } = await axios.get(`/users/leaderboard/${10}`);
        setTopPlayers(data);
    };

    const fetchCurrentPlayer = async () => {
        const { data } = await axios.get(`/users/all/leaderboard`);
        const index = data.findIndex((temp: User )=> temp.username === user?.username);
        setThisPlayer(data[index]);
        setThisRank(index + 1);
    }

    const populateTableByRow = ({
        rank,
        playerName,
        score,
        final = false,
    }: returnMyData) => {
        if (!currentPlayerOnTop) {
            if (playerName === user?.username && !final) {
                setcurrentPlayerOnTop(true);
            }
        }

        return (
            <>
                <div className='flex-[3] text-center'>
                    <p className='px-[10px] py-[12px] text-[20px] font-bold'>
                        {rank}
                    </p>
                </div>
                <div className='flex-[4] text-left'>
                    <p className='px-[10px] py-[12px] text-[20px] font-bold'>
                        {playerName}
                    </p>
                </div>
                <div className='flex-[4] text-left'>
                    <p className='px-[10px] py-[12px] text-[20px] font-bold'>
                        {score}
                    </p>
                </div>
            </>
        );
    };

    return (
        <>
            <Layout 
                className='flex min-h-screen flex-col items-center justify-center'
                leftButton={
                    <BackButton href='/' />}
            >
                <div
                    className='container mx-auto py-5'
                    style={{ marginBottom: '96px' }}
                >
                    <p
                        className='mb-14 mt-12 text-center text-6xl font-bold text-white'
                    >
                        Leaderboard
                    </p>
                    <div className='flex w-full flex-col items-center overflow-visible'>
                        <div className='flex w-[60%] gap-[10px] rounded-[36px] border-b-[5px] border-b-[#4a4646] bg-gray text-white'>
                            {populateTableByRow({
                                rank: 'Rank',
                                playerName: 'Name',
                                score: 'Score',
                                final: false,
                            })}
                        </div>
                        {topPlayers.map(
                            (player, index) => {
                                return (
                                    <div
                                        className={
                                            player.username == user?.username
                                                ? 'mt-[20px] flex w-[60%] gap-[10px] rounded-[36px] bg-green text-black'
                                                : 'mt-[20px] flex w-[60%] gap-[10px] rounded-[36px] bg-orange text-black'
                                        }
                                    >
                                        {populateTableByRow({
                                            rank: `# ${index + 1}`,
                                            playerName: player.username,
                                            score: String(player.score),
                                            final: false,
                                        })}
                                    </div>
                                );
                            }
                        )}
                        {(!currentPlayerOnTop && thisPlayer) && (
                            <div className='mt-[20px] flex w-[60%] gap-[10px] rounded-[36px] bg-green text-black'>
                                {populateTableByRow({
                                    rank: `# ${thisRank}`,
                                    playerName: thisPlayer.username,
                                    score: String(thisPlayer.score),
                                    final: true,
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
}
