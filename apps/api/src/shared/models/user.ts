import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { User } from '@repo/shared-types';

export type UserInterface = User & Document;

const UserSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    balance: { type: Number, required: true },
    score: { type: Number, required: true },
    skins: { type: Array, required: false },
});

const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;
