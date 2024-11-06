import type { Socket } from 'socket.io';
import gameService from '../game/service';
import roomService from '../room/service';
import { GameDto } from './dto';
import { Action } from '@repo/shared-types';

export default async function gameController(socket: Socket) {
    socket.on('get-game', async ({ roomId }: { roomId: string }) => {
        try {
            const room = await roomService.getRoomById(roomId);

            if (!room) {
                throw new Error('Room not found.');
            }

            const game = await gameService.getGameByRoomId(roomId);

            socket.emit('game', game);
        } catch (error) {
            socket.emit(
                'error',
                error instanceof Error ? error.message : error
            );
        }
    });

    socket.on(
        'send-action',
        async ({
            gameId,
            userId,
            cellId,
            bombFound,
        }: {
            gameId: string;
            userId: string;
            cellId: string;
            bombFound: boolean;
        }) => {
            try {
                const game = await gameService.getGameById(gameId);
                if (!game) {
                    throw new Error('Game not found.');
                }

                if (!game.firstPlayerId) {
                    throw new Error('Game is not ready yet.');
                }

                if (
                    game.actions.length === 0 &&
                    game.firstPlayerId !== userId
                ) {
                    throw new Error('It is not your turn.');
                } else if (
                    game.actions[game.actions.length - 1]?.userId === userId
                ) {
                    throw new Error('It is not your turn.');
                }

                const newActions = [
                    ...game.actions,
                    {
                        id: game.actions.length + 1,
                        userId,
                        cellId,
                        bombFound,
                    },
                ] as Action[];

                const updatedGame = await gameService.updateGameById(gameId, {
                    actions: newActions,
                });
                if (!updatedGame) {
                    throw new Error('Failed to update game.');
                }

                socket.emit('game', updatedGame);
                socket.broadcast.emit('broadcast-game', updatedGame);
            } catch (error) {
                socket.emit(
                    'error',
                    error instanceof Error ? error.message : error
                );
            }
        }
    );

    socket.on('reset', async ({ roomId }: { roomId: string }) => {
        try {
            const updatedGame = await gameService.updateGameByRoomId(roomId, {
                actions: [] as Action[],
            });
            if (!updatedGame) {
                throw new Error('Failed to update game.');
            }

            socket.emit('reset-game', updatedGame);
            socket.broadcast.emit('broadcast-reset-game', updatedGame);
        } catch (error) {
            socket.emit(
                'error',
                error instanceof Error ? error.message : error
            );
        }
    });
}
