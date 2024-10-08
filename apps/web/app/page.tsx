// import React, { useEffect, useState } from 'react';

export default function Home() {
    return (
        <div
            className='flex min-h-screen flex-grow flex-col items-center justify-center'
            style={{ backgroundColor: '#0D1321' }}
        >
            <div className='container mx-auto mb-10 py-4'>
                <header
                    className='mb-14 mt-12 text-center text-6xl font-bold'
                    style={{
                        fontFamily: 'Montserrat',
                        fontSize: '96px',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ color: '#FFEDDF' }}>Find My</span>
                    <span style={{ color: '#C33432' }}>Mines</span>
                </header>
                <h1
                    className='mb-14 mt-12 text-center text-6xl font-bold'
                    style={{
                        fontFamily: 'Montserrat',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#C59CC8',
                    }}
                >
                    Find the mines before they find you!
                </h1>
            </div>
            <div
                className='mb-14 mt-12 text-center text-6xl font-bold'
                style={{
                    fontFamily: 'Montserrat',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#FFEDDF',
                }}
            >
                OR
            </div>
        </div>
    );
}
