import { Router } from 'express';
import User from '../../shared/models/user';

// create router
const router = Router();

router.get('/users/leaderboard', async (req, res) => {
    try {
        // find and sort top 5 users
        const users = await User.find().sort({ score: -1 }).limit(5);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// export router
export const UserRouter = router as Router;
