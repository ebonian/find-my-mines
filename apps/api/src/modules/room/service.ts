import RoomModel from '../../shared/models/room';
import { RoomDto } from './dto';

const createRoom = async (room: RoomDto) => {
    try {
        const newRoom = new RoomModel(room);
        await newRoom.save();
        return newRoom;
    } catch (error) {
        throw error;
    }
};

const getRooms = async () => {
    return await RoomModel.find();
};

const getRoomById = async (roomId: string) => {
    return await RoomModel.findById(roomId);
};

const getUserJoinedRoom = async (userId: string) => {
    return await RoomModel.findOne({
        players: userId,
        state: { $in: ['waiting', 'playing'] },
    });
};

const getUserJoinedStartingRoom = async (userId: string) => {
    return await RoomModel.findOne({
        players: { $size: 2, $all: [userId] },
        state: 'waiting',
    });
};

const updateRoomById = async (roomId: string, room: any) => {
    return await RoomModel.findByIdAndUpdate(roomId, room, { new: true });
};

export default {
    createRoom,
    getRooms,
    getRoomById,
    getUserJoinedRoom,
    getUserJoinedStartingRoom,
    updateRoomById,
};
