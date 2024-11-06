import { AppStats } from '@repo/shared-types';
import type { Socket } from 'socket.io';
import gameService from '../game/service';

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

    socket.on('reset-game', async (roomId: string) => {
        try {
            const updatedGame = await gameService.updateGameByRoomId(roomId, {
                actions: [],
            });

            socket.emit('game', updatedGame);
            socket.broadcast.emit('game', updatedGame);
        } catch (error) {
            socket.emit(
                'error',
                error instanceof Error ? error.message : error
            );
        }
    });

    socket.on('reset-all-games', async () => {
        try {
            const updatedGames = await gameService.updateAllGames({
                actions: [],
            });

            socket.emit('games', updatedGames);
            socket.broadcast.emit('games', updatedGames);
        } catch (error) {
            socket.emit(
                'error',
                error instanceof Error ? error.message : error
            );
        }
    });
}
