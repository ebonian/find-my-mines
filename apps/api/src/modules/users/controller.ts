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

// update user score
router.patch('/users/:id', async (req, res) => {
    // find user by id and update -> use new:true to be able to update score right awaya after updating
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
});

// get user balance by id
router.get('/users/:id/balance', async (req, res) => {
    try {
        // Find user by ID
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Assuming the user object has a 'balance' property
        const balance = user.balance; // Adjust this if your balance field is named differently
        res.json({ "balance": balance });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// export router
export const UserRouter = router as Router;
