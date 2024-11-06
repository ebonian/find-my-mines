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
    const { gameRooms, joinedGameRoom } = useGameContext();

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

        send('/get-stats', {});

        const interval = setInterval(() => {
            send('/get-stats', {});
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
            send('reset', { gameId: room._id });
        });
        alert('Reset all games');
    };

    return (
        <Layout className='flex min-h-screen flex-col items-center py-16'>
            <div className='text-6xl font-bold'>Admin Panel</div>
            <div className='text-6xl'>
                Currently Online: {stats.totalConnections}
            </div>

            <div className='grid w-full grid-cols-3 gap-12'>
                {activeRooms.map((room) => (
                    <RoomCardReset key={room._id} {...room} />
                ))}
            </div>

            <Button size='lg' color='purple' onClick={handleResetAllScores}>
                Reset All Scores
            </Button>
        </Layout>
    );
}
