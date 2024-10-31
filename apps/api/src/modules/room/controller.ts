import type { Socket } from 'socket.io';
import type { Room } from '@repo/shared-types';
import RoomModel from '../../shared/models/room';

export default async function roomController(socket: Socket) {
    socket.on('create-room', async (room: Room) => {
        try {
            console.log(room);
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

    socket.on('join-room', async (roomId: string, userId: string) => {
        // const joinRoom = gameRooms.find((r) => r._id === roomId);

        // if (!joinRoom) {
        //     socket.emit('error', `Room "${roomId}" does not exist.`);
        //     return;
        // }

        // // add player to the room that is still in the state of waiting
        // if (joinRoom.state === 'waiting') {
        //     joinRoom.players.push(userId);
        //     socket.join(roomId);
        //     socket.emit('room-joined', joinRoom);
        //     socket.to(roomId).emit('player-joined', socket.id);

        //     // change state from "waiting" tp "playing" when there are 2 players in the room
        //     if (joinRoom.players.length === 2) {
        //         joinRoom.state = 'playing';
        //         socket.emit('room-state-changed', joinRoom.state); // notify players
        //     }

        //     // update all clients
        //     socket.broadcast.emit('rooms', gameRooms);
        // } else if (joinRoom.state === 'end') {
        //     socket.emit('error', `Room "${roomId}" is already ended.`);
        // } else {
        //     socket.emit(
        //         'error',
        //         `The game in Room "${roomId}" is ongoing now.`
        //     );
        // }

        try {
            const joinRoom = await RoomModel.findById(roomId);

            if (!joinRoom) {
                socket.emit('error', `Room "${roomId}" does not exist.`);
                return;
            }

            if (joinRoom.state === 'waiting') {
                joinRoom.players.push(userId);
                await joinRoom.save();
                socket.join(roomId);
                socket.emit('room-joined', joinRoom);
                socket.to(roomId).emit('player-joined', socket.id);

                if (joinRoom.players.length === 2) {
                    joinRoom.state = 'playing';
                    await joinRoom.save();
                    socket.emit('room-state-changed', joinRoom.state);
                }

                const gameRooms = await RoomModel.find();
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
    });
}
