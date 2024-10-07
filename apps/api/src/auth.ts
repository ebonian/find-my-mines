import passport from 'passport';
import {
    Strategy as GoogleStrategy,
    VerifyCallback,
} from 'passport-google-oauth2'; // Use named imports for strategy and types
import { Request } from 'express'; // For type annotations of `request` parameter
import { User } from './models/users'; // Import User model if you have it in a separate file

passport.use(
    new GoogleStrategy(
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
            // see if user exist if exist just find it if not just create
            User.findOrCreate(
                { googleId: profile.id },
                function (err: any, user: any) {
                    return done(err, user);
                }
            );
        }
    )
);
