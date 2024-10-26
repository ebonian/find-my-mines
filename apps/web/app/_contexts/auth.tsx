'use client';

import { User } from '@repo/shared-types';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import axios from '../_lib/axios';

interface GameContextValue {
    user: User | null;
    logout: () => void;
}

const AuthContext = createContext<GameContextValue>({
    user: null,
    logout: () => {},
});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get('/auth/me');
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            'useAuthContext must be used within a AuthContextProvider'
        );
    }
    return context;
}
