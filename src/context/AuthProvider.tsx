'use client'

import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuthState] = useState({ isAuthenticated: false, user: null });
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
        if (storedAuth) {
            setAuthState(JSON.parse(storedAuth));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('auth', JSON.stringify(auth));
        }
    }, [auth, isInitialized]);

    const setAuth = (newAuthState: any) => {
        setAuthState(newAuthState);
    };

    if (!isInitialized) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};