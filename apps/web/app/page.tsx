import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';

export default function Home() {
    return (
        <div className='grid min-h-dvh w-full place-content-center gap-5'>
            <Input placeholder='Enter a Nickname' />
            <Button variant='default' color='orange' size='lg'>
                Play
            </Button>
        </div>
    );
}
