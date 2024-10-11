import { json, urlencoded } from 'body-parser';
import express, { type Response, type Application } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { googleStrategy } from './utils/auth';
import { AuthRouter } from './modules/auth/auth';
import { UserRouter } from './modules/users/users';

const CLIENT_URL = process.env.API_CLIENT_URL;
if (!CLIENT_URL) {
    throw new Error('API_CLIENT_URL environment variable not set');
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
        .use(UserRouter);

    passport.use(googleStrategy);
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    return app;
};
