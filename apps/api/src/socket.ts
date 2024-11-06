import http from 'http';
import { Server } from 'socket.io';
import roomController from './modules/room/controller';
import { addUser, setupListeners, removeUser } from './modules/admin/controller';
import gameController from './modules/game/controller';
import { Room } from '@repo/shared-types';

const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) {
    throw new Error('CLIENT_URL environment variable not set');
}

export const createSocket = (httpServer: http.Server): Server => {
    const io = new Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
        },
    });

    io.on('connection', (socket) => {
        roomController(socket);
        gameController(socket);

        console.log('a user connected');

        addUser(socket,io);
        setupListeners(socket,io);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            removeUser(socket,io);
        });
    });

    console.log('Socket server created');
    return io;
};
