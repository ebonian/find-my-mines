import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { Room } from '@repo/shared-types';

export type RoomInterface = Room & Document;

const RoomSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    players: { type: [String], default: [] },
    type: { type: String, enum: ['normal', 'extreme'], default: 'normal' },
    state: {
        type: String,
        enum: ['waiting', 'playing', 'end'],
        default: 'waiting',
    },
    seed: { type: String, required: true },
});

const RoomModel = mongoose.model<RoomInterface>('Room', RoomSchema);

export default RoomModel;
