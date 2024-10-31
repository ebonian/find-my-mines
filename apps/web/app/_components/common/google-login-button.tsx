import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function GoogleLoginButton() {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}>
            <Button variant='default' size='lg' className='space-x-2 px-8'>
                <span>Log in with</span>
                <Image
                    src='/google.png'
                    alt='Login with Google'
                    width={32}
                    height={32}
                />
            </Button>
        </Link>
    );
}
