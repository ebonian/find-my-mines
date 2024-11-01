import SkinModel from '../../shared/models/skin';
import { SkinDto } from './dto';

const createSkin = async (data: SkinDto) => {
    return await SkinModel.create(data);
};

const getSkinById = async (id: string) => {
    return await SkinModel.findById(id);
};

const getSkins = async () => {
    return await SkinModel.find();
};

const updateSkinById = async (id: string, data: SkinDto) => {
    return await SkinModel.findByIdAndUpdate(id, data, { new: true });
};

export default {
    createSkin,
    getSkinById,
    getSkins,
    updateSkinById,
};
