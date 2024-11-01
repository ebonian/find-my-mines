import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Response, type Application } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';

import { googleStrategy } from './utils/auth';
import { AuthRouter } from './modules/auth/controller';
import { UserRouter } from './modules/users/controller';
import { SkinRouter } from './modules/skin/controller';

const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL) {
    throw new Error('CLIENT_URL environment variable not set');
}

const SECRET = process.env.API_SECRET;
if (!SECRET) {
    throw new Error('API_SECRET environment variable not set');
}

export const createServer = (): Application => {
    const app = express();
    app.disable('x-powered-by')
        .use(
            cors({
                origin: CLIENT_URL,
                credentials: true,
            })
        )
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(cookieParser())
        .use(json())
        .use(
            session({
                secret: SECRET,
                cookie: {
                    httpOnly: true,
                },
            })
        )
        .use(passport.initialize())
        .use(passport.session())
        .get('/', (_, res: Response) => {
            res.json({ message: 'Find My Mines API is running' });
        })
        .use(AuthRouter)
        .use(UserRouter)
        .use(SkinRouter)
        ;

    passport.use(googleStrategy);
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    return app;
};
