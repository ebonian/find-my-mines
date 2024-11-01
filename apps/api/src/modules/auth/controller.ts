import { Router } from 'express';
import passport from 'passport';
import userService from '../users/service';
import { User } from '@repo/shared-types';

const router = Router();

router.get('/auth/me', async (req, res) => {
    if (req.user) {
        const reqUser = req.user as User;
        const user = await userService.getUserById(reqUser._id);
        res.json(user);
    } else {
        res.sendStatus(401);
    }
});

router.post('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

router.get('/auth/google', async (req, res, next) => {
    passport.authenticate('google', { scope: ['email', 'profile'] })(
        req,
        res,
        next
    );
});

router.get('/auth/google/callback', async (req, res, next) => {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    passport.authenticate('google', {
        successRedirect: `${clientUrl}/game/rooms`,
        failureRedirect: `${clientUrl}`,
    })(req, res, next);
});

export const AuthRouter = router as Router;
