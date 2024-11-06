import type { Room } from '@repo/shared-types';
import { Button } from '../ui/button';
import { useGameContext } from '../../_contexts/game';

interface RoomCardProps {
    _id?: Room['_id'];
    name: Room['name'];
    creator: Room['creator'];
    type: Room['type'];
}

export default function RoomCardReset({
    _id,
    name,
    creator,
    type,
}: RoomCardProps) {
    const { resetGame } = useGameContext();

    if (!_id) {
        return null;
    }

    return (
        <div className='bg-brown space-y-5 rounded-3xl bg-opacity-10 p-5'>
            <p className='text-center text-2xl font-bold text-white'>{name}</p>

            <div className='space-y-1 text-left text-lg font-semibold text-white'>
                <p>
                    Created by: <span className='font-normal'>{creator}</span>
                </p>
                <p>
                    Type: <span className='font-normal'>{type}</span>
                </p>
            </div>

            <Button
                className='w-full'
                color='white'
                onClick={() => {
                    resetGame(_id);
                    alert(`Reset game "${name}"`);
                }}
            >
                Reset
            </Button>
        </div>
    );
}
