import { json, urlencoded } from 'body-parser';
import express, { type Response, type Application } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { AuthRouter } from './modules/auth/auth';
import { googleStrategy } from './utils/auth';

export const createServer = (): Application => {
    const app = express();
    app.disable('x-powered-by')
        .use(
            cors({
                origin: process.env.API_CLIENT_URL || 'http://localhost:3000',
                credentials: true,
            })
        )
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(cookieParser())
        .use(json())
        .use(
            session({
                secret: process.env.API_SECRET || '',
                cookie: {
                    httpOnly: true,
                },
            })
        )
        .use(passport.initialize())
        .use(passport.session())
        .get('/', (_, res: Response) => {
            res.json({ message: 'Hello World' });
        })
        .use(AuthRouter);

    passport.use(googleStrategy);
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });

    return app;
};
