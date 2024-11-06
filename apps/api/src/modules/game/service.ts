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

const getGameById = async (gameId: string) => {
    return await GameModel.findById(gameId);
};

const getGameByRoomId = async (roomId: string) => {
    return await GameModel.findOne({ roomId });
};

const updateGameById = async (gameId: string, game: any) => {
    return await GameModel.findByIdAndUpdate(gameId, game, { new: true });
};

const updateGameByRoomId = async (roomId: string, game: any) => {
    return await GameModel.findOneAndUpdate({ roomId }, game, { new: true });
};

const updateAllGames = async (game: any) => {
    return await GameModel.updateMany({}, game, { new: true });
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
    getGameById,
    getGameByRoomId,
    updateGameById,
    updateGameByRoomId,
    updateAllGames,
    randomFirstPlayer,
};
