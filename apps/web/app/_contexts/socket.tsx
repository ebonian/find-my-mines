'use client';

import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
    socket: any;
    connect: () => void;
    disconnect: () => void;
    subscribe: (channel: string, callback: (data: any) => void) => void;
    unsubscribe: (channel: string) => void;
    send: (channel: string, data: any) => void;
}

const SocketContext = createContext<SocketContextValue>({
    socket: null,
    connect: () => {},
    disconnect: () => {},
    subscribe: () => {},
    unsubscribe: () => {},
    send: () => {},
});

interface SocketContextProviderProps {
    children: React.ReactNode;
}

export default function SocketContextProvider({
    children,
}: SocketContextProviderProps): JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!NEXT_PUBLIC_SERVER_URL) {
            throw new Error(
                'NEXT_PUBLIC_SERVER_URL environment variable not set'
            );
        }

        const socket = io(NEXT_PUBLIC_SERVER_URL, {
            autoConnect: true,
        });
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const connect = () => {
        if (!socket) {
            throw new Error('Socket is not initialized');
        }
        socket.connect();
    };

    const disconnect = () => {
        if (!socket) {
            throw new Error('Socket is not initialized');
        }
        socket.disconnect();
    };

    const subscribe = (channel: string, callback: (data: any) => void) => {
        if (!socket) {
            throw new Error('Socket is not initialized');
        }
        socket.on(channel, callback);
    };

    const unsubscribe = (channel: string) => {
        if (!socket) {
            throw new Error('Socket is not initialized');
        }
        socket.off(channel);
    };

    const send = (channel: string, data: any) => {
        if (!socket) {
            throw new Error('Socket is not initialized');
        }
        socket.emit(channel, data);
    };

    useEffect(() => {
        if (socket) {
            subscribe('error', (error) => {
                if (typeof error === 'string') {
                    alert(error);
                } else {
                    console.error(error);
                }
            });
        }
    }, [socket, subscribe]);

    if (!socket) {
        return <div>Loading...</div>; // TODO: Add a loading screen
    }

    return (
        <SocketContext.Provider
            value={{
                socket,
                connect,
                disconnect,
                subscribe,
                unsubscribe,
                send,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket(): SocketContextValue {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error(
            'useSocket must be used within a SocketContextProvider'
        );
    }
    return context;
}
