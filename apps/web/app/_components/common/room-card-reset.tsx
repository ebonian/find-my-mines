import type { Room } from '@repo/shared-types';
import { Button } from '../ui/button';

interface RoomCardProps {
    name: Room['name'];
    creator: Room['creator'];
    type: Room['type'];
    onReset: () => void;
}

export default function RoomCardReset({
    name,
    creator,
    type,
    onReset,
}: RoomCardProps) {
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

            <Button className='w-full' color='white' onClick={onReset}>
                Reset
            </Button>
        </div>
    );
}
