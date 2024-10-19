import type { Socket } from 'socket.io';
import type { Room } from '@repo/shared-types';

export default async function roomController(socket: Socket) {
    const gameRooms: Room[] = [];

    socket.on('create-room', (room: Room) => {
        gameRooms.push(room);
        socket.emit('rooms', gameRooms);
    });

    socket.on('get-rooms', () => {
        socket.emit('rooms', gameRooms);
    });
}
