import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { Game } from '@repo/shared-types';

export type GameInterface = Game & Document;

const GameSchema = new Schema({
    roomId: { type: String, required: true, unique: true },
    firstPlayerId: { type: String || null, required: false },
    actions: [
        {
            id: { type: Number, required: true },
            userId: { type: String, required: true },
            cellId: { type: Number, required: true },
            bombFound: { type: Boolean, required: true },
        },
    ],
});

const GameModel = mongoose.model<GameInterface>('Game', GameSchema);

export default GameModel;
