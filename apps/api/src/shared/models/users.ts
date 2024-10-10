import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface UserInterface extends Document {
    _id: string;
    username: string;
    balance: Number;
    score: Number;
    skin: Object;
}

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    balance: { type: Number, required: true },
    score: { type: Number, required: true },
    skin: { type: Object, required: false }, // type arai wa
});

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
