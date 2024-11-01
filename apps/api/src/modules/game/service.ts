import GameModel from '../../shared/models/game';
import { GameDto } from './dto';

const createGame = async (game: GameDto) => {
    try {
        const newGame = new GameModel(game);
        await newGame.save();
        return newGame;
    } catch (error) {
        throw error;
    }
};

const getGameByRoomId = async (roomId: string) => {
    return await GameModel.findOne({ roomId });
};

const randomFirstPlayer = async (roomId: string, players: string[]) => {
    const firstPlayerId = players[Math.floor(Math.random() * players.length)];
    return await GameModel.findOneAndUpdate(
        { roomId },
        { firstPlayerId },
        { new: true }
    );
};

export default {
    createGame,
    getGameByRoomId,
    randomFirstPlayer,
};
