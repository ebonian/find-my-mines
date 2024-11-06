import http from 'http';
import { Server } from 'socket.io';
import roomController from './modules/room/controller';
import AdminController from './modules/admin/controller';
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

    const adminController = new AdminController(io);

    io.on('connection', (socket) => {
        roomController(socket);
        gameController(socket);
        
        console.log('a user connected');

        adminController.addUser(socket);
        adminController.setupListeners(socket);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            adminController.removeUser(socket);
        });
    });

    console.log('Socket server created');
    return io;
};
