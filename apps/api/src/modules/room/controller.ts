import type { Socket } from 'socket.io';
import type { Room } from '@repo/shared-types';
import roomService from './service';
import gameService from '../game/service';
import { RoomDto } from './dto';

export default async function roomController(socket: Socket) {
    socket.on('create-room', async (room: RoomDto) => {
        try {
            const createdRoom = await roomService.createRoom(room);
            const gameRooms = await roomService.getRooms();
            await gameService.createGame({
                roomId: createdRoom._id,
                firstPlayerId: null,
                actions: [],
            });
            socket.emit('rooms', gameRooms);
        } catch (error) {
            socket.emit('error', error);
        }
    });

    socket.on('get-rooms', async () => {
        try {
            const gameRooms = await roomService.getRooms();
            socket.emit('rooms', gameRooms);
        } catch (error) {
            socket.emit('error', error);
        }
    });

    socket.on(
        'update-room-state',
        async ({
            roomId,
            state,
        }: {
            roomId: string;
            state: 'waiting' | 'playing' | 'end';
        }) => {
            try {
                const room = await roomService.updateRoomById(roomId, {
                    state,
                });
                if (room) {
                    const gameRooms = await roomService.getRooms();
                    socket.emit('rooms', gameRooms);
                } else {
                    socket.emit('error', `Room "${roomId}" not found.`);
                }
            } catch (error) {
                socket.emit('error', error);
            }
        }
    );

    socket.on(
        'join-room',
        async ({ roomId, userId }: { roomId: string; userId: string }) => {
            try {
                const gameRoom = await roomService.getUserJoinedRoom(userId);

                if (gameRoom) {
                    socket.emit(
                        'error',
                        `You have already joined other Room "${gameRoom._id}".`
                    );
                    return;
                }

                const joinRoom = await roomService.getRoomById(roomId);

                if (!joinRoom) {
                    socket.emit('error', `Room "${roomId}" does not exist.`);
                    return;
                }

                if (joinRoom.players.includes(userId)) {
                    socket.emit(
                        'error',
                        `You have already joined Room "${roomId}".`
                    );
                    return;
                }

                if (joinRoom.players.length < 2) {
                    joinRoom.players.push(userId);
                    await joinRoom.save();
                    if (joinRoom.players.length === 2) {
                        const updatedRoom = await roomService.updateRoomById(
                            joinRoom._id,
                            {
                                state: 'playing',
                            }
                        );
                        if (!updatedRoom) {
                            socket.emit('error', `Room "${roomId}" not found.`);
                            return;
                        }

                        const gameRoom = await gameService.randomFirstPlayer(
                            updatedRoom._id,
                            updatedRoom.players
                        );
                        if (!gameRoom) {
                            socket.emit('error', `Game "${roomId}" not found.`);
                            return;
                        }
                    }

                    socket.emit('joined-room', joinRoom);
                    const gameRooms = await roomService.getRooms();
                    socket.broadcast.emit('rooms', gameRooms);
                } else if (joinRoom.state === 'end') {
                    socket.emit('error', `Room "${roomId}" is already ended.`);
                } else {
                    socket.emit(
                        'error',
                        `The game in Room "${roomId}" is ongoing now.`
                    );
                }
            } catch (error) {
                socket.emit('error', error);
            }
        }
    );

    socket.on('get-joined-room', async ({ userId }: { userId: string }) => {
        try {
            const joinedRoom = await roomService.getUserJoinedRoom(userId);
            socket.emit('joined-room', joinedRoom);
        } catch (error) {
            socket.emit('error', error);
        }
    });
}
