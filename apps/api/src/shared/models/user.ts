import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { User } from '@repo/shared-types';

export type UserInterface = User & Document;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    score: { type: Number, required: true },
    skin: { type: Object, required: false }, // type arai wa
});

const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;
