import { Router } from 'express';
import userService from './service';

const router = Router();

router.get('/users/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/users/get/leaderboard', async (req, res) => {
    try {
        const users = await userService.getTopNUsers(5);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.patch('/users/update/:id', async (req, res) => {
    try {
        const { updatingUser } = req.body;

        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await userService.updateUserById(
            req.params.id,
            updatingUser
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export const UserRouter = router as Router;
