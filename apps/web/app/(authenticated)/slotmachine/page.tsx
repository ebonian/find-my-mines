'use client';

import React, { useEffect, useState } from 'react';
// import BackButton from '../_components/ui/BackButton';
import BackButton from './_components/back-button';
import { Button } from '../../_components/ui/button';
import axios from '../../_lib/axios';
import { useAuthContext } from '../../_contexts/auth';

export default function Page() {
    type emojiState = {
        [key: number]: string;
    };

    // type WeightPairs = {
    //     r6: number;
    //     r5: number;
    //     r4: number;
    //     r3: number;
    //     r2: number;
    //     r1: number;
    //     r0: number;
    // };

    const { user } = useAuthContext();
    const [visual, setvisual] = useState({
        spinAnimation: false,
        buttonDisable: false,
        imageHidden: true,
    });
    const [spinStart, setSpinStart] = useState({
        slot1: false,
        slot2: false,
        slot3: false,
    });
    const [showMotivation, setshowMotivation] = useState(false);
    const [hoverSlot1, sethoverSlot1] = useState(false);
    const [hoverSlot2, sethoverSlot2] = useState(false);
    const [hoverSlot3, sethoverSlot3] = useState(false);

    const totalPercent = 100;
    const [balance, setbalance] = useState(0);
    const [gained, setgained] = useState(0);
    const [emojiSlots, setemojiSlots] = useState({
        1: '👲',
        2: '🇨🇳',
        3: '🎰',
    });
    const [admin, setAdmin] = useState(false);
    // const randomWeight = !admin ?
    //                     '6'.repeat(1) +
    //                     '5'.repeat(3) +
    //                     '4'.repeat(7) +
    //                     '3'.repeat(14) +
    //                     '2'.repeat(20) +
    //                     '1'.repeat(25) +
    //                     '0'.repeat(30)
    //                     : '6'.repeat(100);
    // const [randomWeight, setrandomWeight] = useState(
    //     admin ?
    //         '6'.repeat(1) +
    //         '5'.repeat(3) +
    //         '4'.repeat(7) +
    //         '3'.repeat(14) +
    //         '2'.repeat(20) +
    //         '1'.repeat(25) +
    //         '0'.repeat(30)
    //     : '6'.repeat(100)
    // );
    const weight = !admin
        ? '6'.repeat(1) +
          '5'.repeat(3) +
          '4'.repeat(7) +
          '3'.repeat(14) +
          '2'.repeat(20) +
          '1'.repeat(25) +
          '0'.repeat(30)
        : '6'.repeat(100);
    const emojis: emojiState = {
        0: '🥢',
        1: '🥮',
        2: '👲',
        3: '🇨🇳',
        4: '🧧',
        5: '🐉',
        6: '🎰',
    };

    useEffect(() => {
        if (user) {
            setbalance(user.balance);
            if (user.username === 'TungDude') {
                setAdmin(true);
            }
        }
    }, [user]);
    // useEffect(() => {
    //     if (session) {
    //         initComponent();
    //     }
    // }, [session]);

    // const initComponent = async () => {
    //     setSlotEmojis(2, 5, 6);
    //     setRandomWeight({
    //         r6: 1,
    //         r5: 3,
    //         r4: 7,
    //         r3: 14,
    //         r2: 20,
    //         r1: 25,
    //         r0: 30,
    //     });
    // }

    // const setSlotEmojis = (key1: number, key2: number, key3: number) => {
    //     const emojiStates: emojiState = {
    //         1: emojis[key1]!,
    //         2: emojis[key2]!,
    //         3: emojis[key3]!,
    //     };

    //     setemojiSlots((prevSlots) => ({ ...prevSlots, ...emojiStates }));
    // };

    // const setRandomWeight = (weightPairs: WeightPairs) => {
    //     const sum = Object.keys(weightPairs)
    //     .map(key => weightPairs[key as keyof WeightPairs])
    //     .reduce((cur, val) => cur + val, 0);

    //     if (sum !== totalPercent) {
    //       weightPairs["r0"] += totalPercent - sum;
    //     }

    //     const { r6, r5, r4, r3, r2, r1, r0 } = weightPairs;
    //     setrandomWeight(prevWeight =>
    //         "6".repeat(r6) +
    //         "5".repeat(r5) +
    //         "4".repeat(r4) +
    //         "3".repeat(r3) +
    //         "2".repeat(r2) +
    //         "1".repeat(r1) +
    //         "0".repeat(r0)
    //     );
    // }

    const updateGamblerBalance = async (newBalance: number) => {
        try {
            const response = await axios.patch(`/users`, {
                updatingUser: {
                    balance: newBalance,
                },
            });
        } catch (exception) {
            console.log(exception);
        }
    };

    const spinSlot = () => {
        if (balance <= 0) {
            alert("Bro's broke 😭🙏");
            return;
        }

        setvisual({
            ...visual,
            ...{ spinAnimation: true, buttonDisable: true },
        });

        setSpinStart((prev) => ({
            ...prev,
            slot1: true,
        }));

        setTimeout(() => {
            setSpinStart((prev) => ({
                ...prev,
                slot2: true,
            }));
        }, 600);

        setTimeout(() => {
            setSpinStart((prev) => ({
                ...prev,
                slot3: true,
            }));
        }, 1200);

        const slot1 = parseInt(
            weight.charAt(Math.floor(Math.random() * totalPercent))
        );
        const slot2 = parseInt(
            weight.charAt(Math.floor(Math.random() * totalPercent))
        );
        var slot3 = admin ? 6 : slot1 + Math.floor(Math.random() * 3) - 1;
        if (!admin) {
            if (slot3 > 6) {
                slot3 = (slot3 % 6) - 1;
            }
            if (slot3 < 0) {
                slot3 += 7;
            }
        }

        setTimeout(() => {
            setemojiSlots((prevSlots) => ({ ...prevSlots, 1: emojis[slot1]! }));
            setSpinStart((prev) => ({
                ...prev,
                slot1: false,
            }));
        }, 1800);

        setTimeout(() => {
            setemojiSlots((prevSlots) => ({ ...prevSlots, 2: emojis[slot2]! }));
            setSpinStart((prev) => ({
                ...prev,
                slot2: false,
            }));
        }, 2400);

        setTimeout(() => {
            setemojiSlots((prevSlots) => ({ ...prevSlots, 3: emojis[slot3]! }));
            setSpinStart((prev) => ({
                ...prev,
                slot3: false,
            }));
        }, 3000);

        setTimeout(() => {
            if (slot1 == slot2 && slot1 == slot3) {
                visual.imageHidden = false;
                const audio = document.getElementById(
                    'gong'
                ) as HTMLAudioElement;
                const gain = (slot1 + 1) * 100 * Math.pow(10, slot1);
                const bal = balance + gain - 20;
                audio.play();
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                    setvisual({ ...visual, ...{ imageHidden: true } });
                }, 6500);
                setgained(gain);
                setbalance(bal);
                updateGamblerBalance(bal);
            } else {
                setgained(0);
                setbalance(balance - 20);
                updateGamblerBalance(balance - 20);
            }
            setvisual({
                ...visual,
                ...{ spinAnimation: false, buttonDisable: false },
            });
        }, 3000);
    };

    const motivationBeforeQuit = () => {
        setshowMotivation(!showMotivation);
    };

    return (
        <>
            {/* <main className="flex min-h-screen flex-col items-center justify-between p-2"> */}
            <div
                className='flex min-h-screen flex-grow items-center justify-center'
                style={{ backgroundColor: '#0D1321' }}
            >
                <div
                    className='container mx-auto py-5'
                    style={{ marginBottom: '96px' }}
                >
                    <BackButton
                        actionBeforeBack={motivationBeforeQuit}
                        confirmation={true}
                        setShow={setshowMotivation}
                    />
                    <img
                        id='quiteBeforeWinBig'
                        src='/images/quiteBeforeWinBig.png'
                        className={`absolute left-1/2 top-0 h-full w-auto -translate-x-1/2 ${showMotivation ? '' : 'hidden'}`}
                    ></img>
                    <img
                        id='slotsWin'
                        src='/images/slotsWin.jpg'
                        className={`absolute left-0 top-0 h-full w-auto ${visual['imageHidden'] ? 'hidden' : 'animate-ping'}`}
                    ></img>
                    <audio
                        id='gong'
                        src='/sounds/gong.mp3'
                        className='hidden'
                    ></audio>
                    <h1
                        className='text-center text-3xl font-bold'
                        style={{ color: '#FFEDDF' }}
                    >
                        Slot machine of Infinite Wealth 🙏
                    </h1>
                    <p
                        className='text-center font-semibold'
                        style={{ color: '#FFEDDF', marginTop: '24px' }}
                    >
                        Each spin costs{' '}
                        <span style={{ color: '#EE964B' }}>$ 20</span>
                    </p>
                    {/* <p className="text-center">Welcome... Let's make money</p> */}
                    <p
                        className='text-center font-semibold'
                        style={{ color: '#FFEDDF', marginTop: '24px' }}
                    >
                        Your balance:{' '}
                        <span style={{ color: '#C5D86D' }}>$ {balance}</span>
                    </p>
                    <br></br>
                    <div className='grid w-full grid-cols-3 justify-items-center'>
                        <div
                            className='card flex h-full min-h-[144px] w-[90%] items-center justify-center overflow-hidden rounded border-2 border-[#252525] bg-[#FFEDDF] text-6xl shadow-md transition duration-300 hover:shadow-[0_0_12px_#fff]'
                            id='slot-1'
                        >
                            <p
                                className={`${visual['spinAnimation'] && spinStart['slot1'] ? 'animate-spinSlot' : ''} cursor-pointer`}
                                onMouseEnter={() => {
                                    sethoverSlot1(true);
                                }}
                                onMouseLeave={() => {
                                    sethoverSlot1(false);
                                }}
                            >
                                {hoverSlot1 ? '🖕' : emojiSlots[1]}
                            </p>
                        </div>
                        <div
                            className='card flex h-full min-h-[144px] w-[90%] items-center justify-center overflow-hidden rounded border-2 border-[#252525] bg-[#FFEDDF] text-6xl shadow-md transition duration-300 hover:shadow-[0_0_12px_#fff]'
                            id='slot-2'
                        >
                            <p
                                className={`${visual['spinAnimation'] && spinStart['slot2'] ? 'animate-spinSlot' : ''} cursor-pointer`}
                                onMouseEnter={() => {
                                    sethoverSlot2(true);
                                }}
                                onMouseLeave={() => {
                                    sethoverSlot2(false);
                                }}
                            >
                                {hoverSlot2 ? '🖕' : emojiSlots[2]}
                            </p>
                        </div>
                        <div
                            className='card flex h-full min-h-[144px] w-[90%] items-center justify-center overflow-hidden rounded border-2 border-[#252525] bg-[#FFEDDF] text-6xl shadow-md transition duration-300 hover:shadow-[0_0_12px_#fff]'
                            id='slot-3'
                        >
                            <p
                                className={`${visual['spinAnimation'] && spinStart['slot3'] ? 'animate-spinSlot' : ''} cursor-pointer`}
                                onMouseEnter={() => {
                                    sethoverSlot3(true);
                                }}
                                onMouseLeave={() => {
                                    sethoverSlot3(false);
                                }}
                            >
                                {hoverSlot3 ? '🖕' : emojiSlots[3]}
                            </p>
                        </div>
                    </div>
                    <br></br>
                    <p
                        className='text-center font-semibold'
                        style={{ color: '#FFEDDF' }}
                    >
                        You've gained:{' '}
                        <span style={{ color: '#AFE0CE' }}>$ {gained}</span>
                    </p>
                    <br></br>
                    <div className={'text-center'}>
                        <Button
                            variant='default'
                            color='green'
                            size='lg'
                            disabled={visual['buttonDisable']}
                            onClick={spinSlot}
                        >
                            SPIN!!!
                        </Button>
                    </div>
                </div>
            </div>
            {/* </main> */}
        </>
    );
}
