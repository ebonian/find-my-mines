import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from 'passport-google-oauth2';
import { Request } from 'express';
import User from '../shared/models/user';

const CLIENT_ID = process.env.API_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.API_GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.API_GOOGLE_CALLBACK_URL;
if (!CLIENT_ID || !CLIENT_SECRET || !CALLBACK_URL) {
    throw new Error('Google OAuth2 environment variables not set');
}

export const googleStrategy = new GoogleStrategy(
    {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        passReqToCallback: true,
    },
    function (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ) {
        User.findOne({ googleId: profile.id })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        balance: 0,
                        score: 0,
                        skin: {},
                    });
                    newUser.save();
                    return done(null, newUser);
                }
            })
            .catch((err) => {
                return done(err);
            });
    }
);
