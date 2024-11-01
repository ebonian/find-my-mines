import type { Socket } from 'socket.io';
import type { Room } from '@repo/shared-types';
import RoomModel from '../../shared/models/room';

export default async function roomController(socket: Socket) {
    socket.on('create-room', async (room: Room) => {
        try {
            const newRoom = new RoomModel(room);
            await newRoom.save();

            const gameRooms = await RoomModel.find();
            socket.emit('rooms', gameRooms);
        } catch (error) {
            console.log(error);
            socket.emit('error', error);
        }
    });

    socket.on('get-rooms', async () => {
        try {
            const gameRooms = await RoomModel.find();
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
                const room = await RoomModel.findByIdAndUpdate(
                    roomId,
                    { state },
                    { new: true }
                );

                if (room) {
                    const gameRooms = await RoomModel.find();
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
                const gameRoom = await RoomModel.findOne({
                    players: userId,
                    state: { $in: ['waiting', 'playing'] },
                });

                if (gameRoom) {
                    socket.emit(
                        'error',
                        `You have already joined other Room "${gameRoom._id}".`
                    );
                    return;
                }

                const joinRoom = await RoomModel.findById(roomId);

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

                if (joinRoom.state === 'waiting') {
                    joinRoom.players.push(userId);
                    await joinRoom.save();
                    socket.emit('room-joined', joinRoom);
                    // TODO: notify / update game channel that user has joined the room

                    if (joinRoom.players.length === 2) {
                        joinRoom.state = 'playing';
                        await joinRoom.save();
                    }

                    const gameRooms = await RoomModel.find();
                    socket.broadcast.emit('rooms', gameRooms);
                    socket.emit('user-joined-room', joinRoom);
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

    socket.on(
        'get-user-joined-room',
        async ({ userId }: { userId: string }) => {
            try {
                const gameRoom = await RoomModel.findOne({
                    players: userId,
                    state: { $in: ['waiting', 'playing'] },
                });
                socket.emit('user-joined-room', gameRoom);
            } catch (error) {
                socket.emit('error', error);
            }
        }
    );

    socket.on('leave-user-room', async ({ userId }: { userId: string }) => {
        try {
            const gameRoom = await RoomModel.findOne({
                players: userId,
                state: { $in: ['waiting', 'playing'] },
            });

            if (gameRoom) {
                gameRoom.players = gameRoom.players.filter(
                    (player) => player !== userId
                );
                await gameRoom.save();
                socket.emit('user-left-room', gameRoom);

                const gameRooms = await RoomModel.find();
                socket.broadcast.emit('rooms', gameRooms);
            } else {
                socket.emit('error', `You have not joined any room yet.`);
            }
        } catch (error) {
            socket.emit('error', error);
        }
    });
}
