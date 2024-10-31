import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import type { Skin } from '@repo/shared-types';

export type SkinInterface = Skin & Document;

const SkinSchema = new Schema({
    price: { type: Number, required: true },
});

const SkinModel = mongoose.model<SkinInterface>('Skin', SkinSchema);

export default SkinModel;
