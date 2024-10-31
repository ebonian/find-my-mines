import { Router } from 'express';
import User from '../../shared/models/user';
import Skin from '../../shared/models/skin';

// create router
const router = Router();

// create skins
router.post('/skins', async (req, res) => {
    const { price } = req.body;
    try {
        // create skin
        const skin = await Skin.create({ price });
        res.json(skin);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// get skins user wants to buy and find the price
router.get('/skins/:id', async (req, res) => {
    try {
        // find skin by id
        const skin = await Skin.findById(req.params.id);
        res.json(skin);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// get all skins
router.get('/skins', async (req, res) => {
    try {
        // find all skins
        const skins = await Skin.find();
        res.json(skins);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// buy skins and update user balance
router.post('/skins/buy', async (req, res) => {
    try {
        const { userId, skinId } = req.body;

        const user = await User.findById(userId);
        const skin = await Skin.findById(skinId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!skin) {
            return res.status(404).json({ message: 'Skin not found' });
        }

        if (user.balance < skin.price) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (user.skin.includes(skinId)) {
            return res
                .status(400)
                .json({ message: 'User already has this skin' });
        }

        await User.findByIdAndUpdate(
            userId,
            {
                balance: user.balance - skin.price,
                skin: [...user.skin, skinId],
            },
            { new: true }
        )
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(500).json({ message: err });
            });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// export router
export const SkinRouter = router as Router;
