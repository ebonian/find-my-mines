import type { Socket } from 'socket.io';
import gameService from './service';
import roomService from '../room/service';

export default async function gameController(socket: Socket) {
    // socket.on('random-first-player', async (roomId: string) => {
    //     try {
    //         const game = await gameService.getGameByRoomId(roomId);
    //         if (!game) {
    //             socket.emit('error', `Game "${roomId}" not found.`);
    //             return;
    //         }
    //         const room = await roomService.getRoomById(roomId);
    //         if (!room) {
    //             socket.emit('error', `Room "${roomId}" not found.`);
    //             return;
    //         }
    //         const startingRoom = await roomService.getUserJoinedStartingRoom(room.creator);
    //         if (!startingRoom) {
    //             socket.emit('error', `Room "${roomId}" not found.`);
    //             return;
    //         }
    //     } catch (error) {
    //         socket.emit('error', error);
    //     }
    // });
}
