import type { Socket } from 'socket.io';
import gameService from '../game/service';
import roomService from '../room/service';
import usersService from '../users/service';
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

                const foundedBombs = updatedGame.actions.filter(
                    (action) => action.bombFound
                ).length;

                const room = await roomService.getRoomById(updatedGame.roomId);
                if (!room) {
                    throw new Error('Room not found.');
                }

                socket.emit('game', updatedGame);
                socket.broadcast.emit('games', [updatedGame]);

                new Promise((resolve) => setTimeout(resolve, 1000));

                if (foundedBombs === (room.type === 'normal' ? 11 : 20)) {
                    const updatedRoom = await roomService.updateRoomById(
                        room.id,
                        {
                            state: 'end',
                        }
                    );
                    if (!updatedRoom) {
                        throw new Error('Failed to update room.');
                    }

                    const updatedUser = await usersService.updateUserById(
                        userId,
                        {
                            $inc: { score: 1, balance: 20 },
                        }
                    );
                    if (!updatedUser) {
                        throw new Error('Failed to update user.');
                    }

                    socket.emit('rooms', [updatedRoom]);
                    socket.broadcast.emit('rooms', [updatedRoom]);
                }
            } catch (error) {
                socket.emit(
                    'error',
                    error instanceof Error ? error.message : error
                );
            }
        }
    );
}
