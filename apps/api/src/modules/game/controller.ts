import type { Socket } from 'socket.io';
import gameService from '../game/service';
import roomService from '../room/service';
import { GameDto } from './dto';
import GameModel from '../../shared/models/game';
import { Action } from '@repo/shared-types';

export default async function gameController(socket: Socket) {
    socket.on('get-game', async (roomId: string) => {
        try {
            const userJoinedRoom = await roomService.getUserJoinedRoom(
                socket.id
            );
            if (!userJoinedRoom) {
                throw new Error('User not in any room.');
            }
            const gameId = await gameService.getGameByRoomId(roomId);
            socket.emit('game', gameId);
        } catch (error) {
            socket.emit('error', error);
        }
    });

    socket.on(
        'send-actions',
        async (actions: Action, roomId: string, game: GameDto) => {
            try {
                if (
                    typeof actions.id !== 'number' ||
                    typeof actions.userId !== 'string' ||
                    (actions.cellId !== null &&
                        typeof actions.cellId !== 'string') ||
                    typeof actions.bombFound !== 'boolean'
                ) {
                    throw new Error('Invalid action format.');
                }

                game.actions.push(actions);
                const gameUpdated = await gameService.getGameByRoomId(roomId);
                socket.emit('game', gameUpdated);

                socket.to(roomId).emit('game', gameUpdated);
            } catch (error) {
                socket.emit('error', error);
            }
        }
    );

    socket.on(
        'reset',
        async (actions: Action, roomId: string, game: GameDto) => {
            try {
                actions.id = 0;
                actions.userId = '';
                actions.cellId = null;
                actions.bombFound = false;

                game.actions.push(actions);
                const gameUpdated = await gameService.getGameByRoomId(roomId);
                socket.emit('game', gameUpdated);

                socket.to(roomId).emit('game', gameUpdated);
            } catch (error) {
                socket.emit('error', error);
            }
        }
    );
}
