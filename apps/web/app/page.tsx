import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';
import GoogleLoginButton from './_components/common/google-login-button';
import ShopButton from './_components/common/shop-button';
import ScoreboardButton from './_components/common/scoreboard-button';
import LocaleButton from './_components/common/locale-button';
import MySkinButton from './_components/common/my-skin';
import HelpButton from './_components/common/help-button';
import Layout from './_components/common/layout';

export default function Home() {
    return (
        <Layout className='flex min-h-screen flex-col items-center justify-center space-y-10'>
            <div className='absolute left-0 top-10'>
                <ShopButton />
            </div>
            <div className='absolute right-0 top-10'>
                <ScoreboardButton />
            </div>
            <div className='absolute bottom-10 left-0'>
                <MySkinButton />
            </div>
            <div className='absolute bottom-10 right-0'>
                <LocaleButton />
            </div>
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2'>
                <HelpButton />
            </div>

            <h1 className='space-x-4 text-7xl font-bold'>
                <span className='text-white'>Find My</span>
                <span className='text-red'>Mines</span>
            </h1>
            <div className='text-purple text-center font-bold'>
                Find the mines before they find you!
            </div>
            <div className='flex w-full max-w-md flex-col items-center space-y-2'>
                <GoogleLoginButton />
                <p className='text-center text-lg font-bold text-white'>OR</p>
                <div className='flex w-full flex-col items-center'>
                    <Input placeholder='Enter a Nickname' />
                    <p className='text-red text-center font-light italic'>
                        Progress will not be saved
                    </p>
                </div>
            </div>
            <Button color='green' size='lg' className='px-20'>
                Play
            </Button>
        </Layout>
    );
}
