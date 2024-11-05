import { Router } from 'express';
import skinService from './service';
import { User as User } from '@repo/shared-types';
import userService from '../users/service';

const router = Router();

router.post('/skins', async (req, res) => {
    try {
        const { name, price } = req.body;
        const createdSkin = await skinService.createSkin({ name, price });
        res.json(createdSkin);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/skins/:id', async (req, res) => {
    try {
        const skin = await skinService.getSkinById(req.params.id);
        res.json(skin);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.get('/skins', async (req, res) => {
    try {
        const skins = await skinService.getSkins();
        res.json(skins);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/skins/buy', async (req, res) => {
    try {
        const { skinId } = req.body;

        const reqUser = req.user as User;
        const user = await userService.getUserById(reqUser._id);
        const skin = await skinService.getSkinById(skinId);

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

        const updatedUser = await userService.updateUserById(reqUser._id, {
            balance: user.balance - skin.price,
            skin: [...user.skin, skinId],
        });

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// export router
export const SkinRouter = router as Router;
