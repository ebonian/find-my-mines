import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/google', async (req, res, next) => {
    passport.authenticate('google', { scope: ['email', 'profile'] })(
        req,
        res,
        next
    );
});

router.get('/auth/google/callback', async (req, res, next) => {
    const clientUrl = process.env.API_CLIENT_URL || 'http://localhost:3000';

    passport.authenticate('google', {
        successRedirect: `${clientUrl}`,
        failureRedirect: `${clientUrl}`,
    })(req, res, next);
});

export const AuthRouter = router as Router;
