"use client"
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    user: {},
    setUser: () => { },
    accessToken: null,
    setAccessToken: () => { },
});

const AppContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setAccessToken(token);
        }
    }, []);


    const authContextValue: AuthContextType = {
        user,
        setUser,
        accessToken: accessToken,
        setAccessToken: (token: string | null) => {
            setAccessToken(token);
            if (token) {
                localStorage.setItem('access_token', token);
            } else {
                localStorage.removeItem('access_token');
            }
        },
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AppContext;

export const useAuthContext = () => React.useContext(AuthContext);
