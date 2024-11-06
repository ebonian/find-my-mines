import { AppStats } from '@repo/shared-types';
import type { Socket } from 'socket.io';

const appStats = {
    connectedSessions: [],
} as AppStats;

const broadcastStats = (socket: Socket) => {
    socket.emit('stats', appStats);
    socket.broadcast.emit('stats', appStats);
};

export default async function adminController(socket: Socket) {
    appStats.connectedSessions.push(socket.id);
    broadcastStats(socket);

    socket.on('get-stats', () => {
        broadcastStats(socket);
    });

    socket.on('disconnect', () => {
        const index = appStats.connectedSessions.indexOf(socket.id);
        if (index !== -1) {
            appStats.connectedSessions.splice(index, 1);
            broadcastStats(socket);
        }
    });
}
