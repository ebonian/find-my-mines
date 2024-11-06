'use client';

import Layout from '../../_components/common/layout';
import { useEffect, useState } from 'react';
import axios from '../../_lib/axios';
import { useSocket } from '../../_contexts/socket';
import { useGameContext } from '../../_contexts/game';
import { Button } from '../../_components/ui/button';
import RoomCardReset from '../../_components/common/room-card-reset';

interface ServerStats {
    connectedUsers: string[];
    totalConnections: number;
}

interface GameRoom {
    _id: string;
    state: string;
    // Add other properties as needed
}

export default function Page() {
    const { socket, subscribe, unsubscribe, send } = useSocket();
    const { gameRooms, joinedGameRoom, resetGame } = useGameContext();

    const [stats, setStats] = useState<ServerStats>({
        connectedUsers: [],
        totalConnections: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleStats = (newStats: ServerStats) => {
            console.log('Received stats:', newStats);
            setStats(newStats);
            setIsLoading(false);
        };

        subscribe('stats', handleStats);

        send('get-stats', {});

        const interval = setInterval(() => {
            send('get-stats', {});
        }, 10000);

        return () => {
            unsubscribe('stats');
            clearInterval(interval);
        };
    }, [subscribe, unsubscribe, send]);

    const activeRooms = gameRooms.filter((room) => room.state === 'playing');

    if (isLoading) {
        return <p className='text-center'>Loading...</p>;
    }

    const handleResetAllScores = () => {
        activeRooms.forEach((room) => {
            resetGame(room._id);
        });
        alert('Reset all games');
    };

    return (
        <Layout className='flex min-h-screen flex-col items-center py-16'>
            <div className='flex max-w-screen-xl flex-col items-center space-y-16'>
                <div className='space-y-2 text-center font-bold'>
                    <h1 className='text-6xl font-bold'>Admin Panel</h1>
                    <p className='text-cyan text-xl font-bold'>
                        Current Users: {stats.totalConnections}
                    </p>
                </div>

                <div className='space-y-4'>
                    <p className='text-cyan text-xl font-bold'>Room List</p>
                    <div className='grid w-full grid-cols-3 gap-12'>
                        {activeRooms.map((room) => (
                            <RoomCardReset key={room._id} {...room} />
                        ))}
                    </div>
                </div>

                <Button size='lg' color='cyan' onClick={handleResetAllScores}>
                    Reset All Scores
                </Button>
            </div>
        </Layout>
    );
}
