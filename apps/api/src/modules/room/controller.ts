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

    socket.on(
        'update-room-state',
        ({
            roomId,
            state,
        }: {
            roomId: string;
            state: 'waiting' | 'playing' | 'end';
        }) => {
            const room = gameRooms.find((room) => room.id === roomId);

            if (room) {
                room.state = state;
                socket.emit('rooms', gameRooms);
                socket.broadcast.emit('rooms', gameRooms);
            }
        }
    );

    socket.on('join-room', (roomId: string, userId: string) => {
        const joinRoom = gameRooms.find((r) => r.id === roomId);

        if (!joinRoom) {
            socket.emit('error', `Room "${roomId}" does not exist.`);
            return;
        }

        // add player to the room that is still in the state of waiting
        if (joinRoom.state === 'waiting') {
            joinRoom.players.push(userId);
            socket.join(roomId);
            socket.emit('room-joined', joinRoom);
            socket.to(roomId).emit('player-joined', socket.id);

            // change state from "waiting" tp "playing" when there are 2 players in the room
            if (joinRoom.players.length === 2) {
                joinRoom.state = 'playing';
                socket.emit('room-state-changed', joinRoom.state); // notify players
            }

            // update all clients
            socket.broadcast.emit('rooms', gameRooms);
        } else if (joinRoom.state === 'end') {
            socket.emit('error', `Room "${roomId}" is already ended.`);
        } else {
            socket.emit(
                'error',
                `The game in Room "${roomId}" is ongoing now.`
            );
        }
    });
}
