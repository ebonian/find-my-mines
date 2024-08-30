import mongoose from 'mongoose';

const MONGODB_URI = process.env.API_MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not set in environment variables');
}

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });
