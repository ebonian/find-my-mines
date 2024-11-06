import type { Socket, Server } from 'socket.io';

interface ServerStats {
    connectedUsers: string[];
    totalConnections: number;
}

let connectedUsers: string[] = [];

function getStats(): ServerStats {
    return {
        connectedUsers: [...connectedUsers],
        totalConnections: connectedUsers.length,
    };
}

function broadcastStats(io: Server): void {
    io.emit('stats', getStats());
}

export function addUser(socket: Socket, io: Server): void {
    connectedUsers.push(socket.id);
    broadcastStats(io);
}

export function removeUser(socket: Socket, io: Server): void {
    const index = connectedUsers.indexOf(socket.id);
    if (index !== -1) {
        connectedUsers.splice(index, 1);
        broadcastStats(io);
    }
}

export function setupListeners(socket: Socket, io: Server): void {
    socket.on('get-stats', () => {
        socket.emit('stats', getStats());
    });
}