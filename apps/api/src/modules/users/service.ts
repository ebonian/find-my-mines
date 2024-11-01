import UserModel from '../../shared/models/user';

const getTopNUsers = async (limit: number) => {
    return await UserModel.find().sort({ score: -1 }).limit(limit);
};

const getUserById = async (id: string) => {
    return await UserModel.findById(id);
};

const updateUserById = async (id: string, updatingUser: any) => {
    return await UserModel.findByIdAndUpdate(id, updatingUser, { new: true });
};

export default {
    getTopNUsers,
    getUserById,
    updateUserById,
};
