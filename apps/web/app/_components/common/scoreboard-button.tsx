import Image from 'next/image';
import { Button } from '../ui/button';

type ScoreboardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ScoreboardButton({ ...props }: ScoreboardButtonProps) {
    return (
        <Button
            {...props}
            color='brown'
            className='h-12 space-x-4 bg-opacity-10 px-7 py-3'
        >
            <div className='relative aspect-square h-full'>
                <Image
                    src='/scoreboard.svg'
                    alt='scoreboard'
                    fill
                    className='object-contain'
                />
            </div>
            <span>Scoreboard</span>
        </Button>
    );
}
