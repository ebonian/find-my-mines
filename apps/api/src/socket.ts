import http from 'http';
import { Server } from 'socket.io';

export const createSocket = (httpServer: http.Server): Server => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    console.log('Socket server created');

    return io;
};
