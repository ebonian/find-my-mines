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
    fetchUser: () => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<GameContextValue>({
    user: null,
    fetchUser: () => {},
    logout: () => {},
    loading: true,
});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export default function AuthContextProvider({
    children,
}: AuthContextProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get('/auth/me');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await axios.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                fetchUser,
                logout,
                loading,
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
