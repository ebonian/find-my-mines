import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from 'passport-google-oauth2';
import { Request } from 'express';

import User from '../shared/models/user';

const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_ID = process.env.API_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.API_GOOGLE_CLIENT_SECRET;
if (!CLIENT_URL || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Google OAuth2 environment variables not set');
}

export const googleStrategy = new GoogleStrategy(
    {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: `${CLIENT_URL}/auth/google/callback`,
        passReqToCallback: true,
    },
    function (
        _request: Request,
        _accessToken: string,
        _refreshToken: string,
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
