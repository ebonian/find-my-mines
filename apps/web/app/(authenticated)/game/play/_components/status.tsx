'use client';

import { useGameContext } from '../../../../_contexts/game';

export default function Status() {
    const { turn, timer } = useGameContext();

    let message = '';

    switch (turn) {
        case null:
            message = 'Waiting for other player to join...';
            break;
        case 'user':
            message = 'Your turn!';
            break;
        case 'opponent':
            message = "Opponent's turn!";
            break;
    }

    return (
        <div className='text-center text-xl font-bold text-[#FFEDDF]'>
            {message}
            <br />
            {timer}
        </div>
    );
}
