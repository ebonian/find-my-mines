import mongooose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    User: { type: String, required: true, unique: true },
    Balance: { type: Number, required: true },
    Score: { type: Number, required: true },
    Skin: { type: Object, required: false }, // type arai wa
});
