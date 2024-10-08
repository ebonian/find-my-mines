import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';

export default function Home() {
    return (
        <div
            className='flex grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#0D1321' }}
        >
            <div className='font-Montserrat mb-15 text-center text-7xl font-bold'>
                <span className='text-[#FFEDDF]'>Find My </span>
                <span className='text-[#C33432]'>Mines</span>
            </div>
            <div className='font-Montserrat mb-15 text-center text-base font-bold text-[#C59CC8]'>
                Find the mines before they find you!
            </div>
            <div className='flex flex-row justify-center'>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
                    className='absolute left-0 h-20 w-20'
                ></img>
                <div className='flex flex-none'>
                    <Button variant='default' size='lg'>
                        Log in with{' '}
                        <img
                            src='https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png'
                            className='ml-2 h-5 w-5 items-center'
                        ></img>
                    </Button>
                </div>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
                    className='absolute right-0 h-20 w-20'
                ></img>
            </div>
            <div className='font-Montserrat text-center text-lg font-bold text-[#FFEDDF]'>
                OR
            </div>
            <div className='flex flex-col items-center'>
                <Input placeholder='Enter a Nickname' />
                <div className='font-Montserrat text-center text-base text-[#C33432]'>
                    Progress will not be saved
                </div>
            </div>
            <div className='flex flex-wrap justify-center'>
                <Button variant='default' color='green' size='lg'>
                    Play
                </Button>
            </div>
        </div>
    );
}
