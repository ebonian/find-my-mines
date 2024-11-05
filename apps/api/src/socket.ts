import http from 'http';
import { Server } from 'socket.io';
import roomController from './modules/room/controller';
import gameController from './modules/game/controller';
import { Room } from '@repo/shared-types';

interface ServerStats {
    connectedUsers: string[];
    totalConnections: number;
}

const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) {
    throw new Error('CLIENT_URL environment variable not set');
}



export const createSocket = (httpServer: http.Server): Server => {
    let connectedUsers: string[] = [];
    const io = new Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
        },
    });
    io.on('connection', (socket) => {
        roomController(socket);
        gameController(socket);
        console.log('a user connected');
        connectedUsers.push(socket.id);
        
        broadcastStats();

        socket.on('disconnect', () => {
            console.log('user disconnected');
            connectedUsers.splice(connectedUsers.indexOf(socket.id), 1);
            broadcastStats();
        });

        socket.on('/get-stats', () => {
            socket.emit('stats',getStats())
        })
    });

    function getStats(): ServerStats {
        return {
            connectedUsers: connectedUsers,
            totalConnections: connectedUsers.length
        };
    }

    function broadcastStats() {
        io.emit('stats', getStats());
    }

    console.log('Socket server created');

    return io;
};