import mongoose from 'mongoose';

const MONGODB_URI = process.env.API_MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not set in environment variables');
}

export const setupDB = (): void => {
    mongoose
        .connect(MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.log(err);
        });
};
