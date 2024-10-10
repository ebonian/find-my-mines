import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from 'passport-google-oauth2';
import { Request } from 'express';
import User from '../shared/models/user';

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.API_GOOGLE_CLIENT_ID || '', // Handle TypeScript string checks
        clientSecret: process.env.API_GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.API_GOOGLE_CLIENT_CALLBACKURL || '',
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
