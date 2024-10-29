<<<<<<< HEAD
// import { Button } from './_components/ui/button';
// import { Input } from './_components/ui/input';

// export default function Home() {
//     return (
//         <div
//             className='flex grid min-h-dvh w-full flex-grow place-content-center items-center justify-center gap-5'
//             style={{ backgroundColor: '#252525' }}
//         >
//             <div className='mb-12'>
//                 <div className='items-center'>
//                     <Button
//                         variant='default'
//                         color='brown'
//                         size='lg'
//                         className='absolute left-20 bg-opacity-10 px-4 text-left'
//                     >
//                         <img src='shop.svg' className='h-12 w-12 pr-4'></img>
//                         Shop
//                     </Button>
//                 </div>
//                 <div className='items-center'>
//                     <Button
//                         variant='default'
//                         color='brown'
//                         size='lg'
//                         className='absolute right-20 bg-opacity-10 px-4 text-right'
//                     >
//                         <img
//                             src='scoreboard.svg'
//                             className='h-12 w-12 pr-4'
//                         ></img>
//                         Scoreboard
//                     </Button>
//                 </div>
//             </div>
//             <div className='mb-20'>
//                 <div className='font-Montserrat text-center text-7xl font-bold'>
//                     <span className='text-[#FFEDDF]'>Find My </span>
//                     <span className='text-[#C33432]'>Mines</span>
//                 </div>
//                 <div className='font-Montserrat text-center text-base font-bold text-[#C59CC8]'>
//                     Find the mines before they find you!
//                 </div>
//             </div>
//             <div className='flex flex-row justify-center'>
//                 <img
//                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
//                     className='absolute left-0 h-20 w-20'
//                 ></img>
//                 <div className='flex flex-none'>
//                     <Button variant='default' size='lg' className='px-4'>
//                         Log in with{' '}
//                         <img
//                             src='https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png'
//                             className='ml-2 h-8 w-8 items-center'
//                         ></img>
//                     </Button>
//                 </div>
//                 <img
//                     src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
//                     className='absolute right-0 h-20 w-20'
//                 ></img>
//             </div>
//             <div className='font-Montserrat text-center text-lg font-bold text-[#FFEDDF]'>
//                 OR
//             </div>
//             <div className='flex flex-col items-center'>
//                 <Input placeholder='Enter a Nickname' />
//                 <div className='font-Montserrat text-center text-base text-[#C33432]'>
//                     Progress will not be saved
//                 </div>
//             </div>
//             <div className='flex flex-wrap justify-center'>
//                 <Button variant='default' color='green' size='lg'>
//                     Play
//                 </Button>
//             </div>
//             <div className='mt-20 flex flex-row items-center justify-center'>
//                 <div>
//                     <Button
//                         variant='default'
//                         color='brown'
//                         size='lg'
//                         className='absolute left-20 bg-opacity-10 px-4 text-left'
//                     >
//                         <img src='skin.svg' className='h-16 w-16 pr-4'></img>
//                         My Skins
//                     </Button>
//                 </div>
//                 <div>
//                     <Button
//                         variant='default'
//                         color='brown'
//                         size='lg'
//                         className='bg-opacity-10 px-4 text-center'
//                     >
//                         <img src='circle-help.svg' className='pr-4'></img>
//                         Help
//                     </Button>
//                 </div>
//                 <div>
//                     <Button
//                         variant='default'
//                         color='brown'
//                         size='lg'
//                         className='absolute right-20 bg-opacity-10 px-4 text-right'
//                     >
//                         <img src='earth.svg' className='h-12 w-12 pr-4'></img>
//                         ENG
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
=======
import Link from 'next/link';
>>>>>>> a6efddb2f5829793e21854af1feb30c7b6c4d3f9
import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';
import GoogleLoginButton from './_components/common/google-login-button';

export default function Home() {
    return (
        <div
            className='flex min-h-dvh w-full flex-grow flex-col place-content-center items-center justify-center gap-5'
            style={{ backgroundColor: '#252525' }}
        >
            <div className='mt-2 flex w-full justify-between'>
                {' '}
                {/* Flexbox for buttons */}
                <div className='flex-grow text-left'>
                    <Button
                        variant='default'
                        color='brown'
                        size='lg'
                        className='ml-16 bg-opacity-10 px-4'
                    >
                        <img
                            src='shop.svg'
                            className='h-12 w-12 pr-4'
                            alt='Shop'
                        />
                        Shop
                    </Button>
                </div>
                <div className='flex-grow text-right'>
                    <Button
                        variant='default'
                        color='brown'
                        size='lg'
                        className='mr-16 bg-opacity-10 px-4'
                    >
                        <img
                            src='scoreboard.svg'
                            className='h-12 w-12 pr-4'
                            alt='Scoreboard'
                        />
                        Scoreboard
                    </Button>
                </div>
            </div>
            <div className='mb-12'>
                <div className='font-Montserrat text-center text-7xl font-bold'>
                    <span className='text-[#FFEDDF]'>Find My </span>
                    <span className='text-[#C33432]'>Mines</span>
                </div>
                <div className='font-Montserrat text-center text-base font-bold text-[#C59CC8]'>
                    Find the mines before they find you!
                </div>
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                {' '}
                {/* Centered buttons with icons */}
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
                    className='h-20 w-20'
                    alt='Left Icon'
                />
                <div className='mx-4 flex flex-none'>
                    <Button variant='default' size='lg' className='px-16'>
                        Log in with{' '}
                        <img
                            src='https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png'
                            className='ml-2 h-8 w-8 items-center'
                            alt='Google Login'
                        />
                    </Button>
                </div>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX0gHjqyXKg6J-jM7BbSY2f4komfCqs8RQwQ&s'
                    className='h-20 w-20'
                    alt='Right Icon'
                />
            </div>
            <div className='font-Montserrat text-center text-lg font-bold text-[#FFEDDF]'>
                OR
            </div>
            <div className='flex flex-col items-center'>
                <Input className='px-20' placeholder='Enter a Nickname' />
                <div className='font-Montserrat text-center text-base text-[#C33432]'>
                    Progress will not be saved
                </div>
            </div>
            <div className='mb-20 flex flex-wrap justify-center'>
                <Button
                    variant='default'
                    color='green'
                    size='lg'
                    className='px-28'
                >
                    Play
                </Button>
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                {' '}
                {/* Flexbox for footer buttons */}
                <Button
                    variant='default'
                    color='brown'
                    size='lg'
                    className='mx-2 ml-16 bg-opacity-10 px-4' // Added margin for spacing
                >
                    <img
                        src='skin.svg'
                        className='h-16 w-16 pr-4'
                        alt='My Skins'
                    />
                    My Skins
                </Button>
                <Button
                    variant='default'
                    color='brown'
                    size='lg'
                    className='mx-2 bg-opacity-10 px-4 text-center'
                >
                    <img src='circle-help.svg' className='pr-4' alt='Help' />
                    Help
                </Button>
                <Button
                    variant='default'
                    color='brown'
                    size='lg'
                    className='mx-2 mr-16 bg-opacity-10 px-12 text-right'
                >
                    <img
                        src='earth.svg'
                        className='h-12 w-12 pr-4'
                        alt='Language'
                    />
                    ENG
                </Button>
            </div>
        </div>
    );
}
