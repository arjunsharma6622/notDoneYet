'use client'

import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

interface AuthProviderProps {
    children: ReactNode;
}

const checkAccessToken = async () => {
    // call /checkAccessToken api and check the reponse, if 401 then call /refreshAccessToken api
    try {
        await axiosInstance.get('/auth/checkAccessToken');
    } catch (err : any) {
        if(err.response.status === 401) {
            console.log("refreshing access token...");
            try{
                await axiosInstance.post('/auth/refreshAccessToken');
            }
            catch(err : any) {
                if(err.response.status === 401) {
                    toast.error("Session expired, please login again");
                    console.log("access token expired, logging out...");
                    try{
                        const logoutResponse = await axiosInstance.post('/auth/logout');
                        if(logoutResponse.status === 200) {
                            localStorage.removeItem('auth');
                        }
                    }catch(err : any) {
                        console.log(err);
                        toast.error(err.response.data.message);
                    }
                }
            }
        }
    }
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

    useEffect(() => {
        if (isInitialized && auth.isAuthenticated === true) {
            checkAccessToken();
        }
    }, [isInitialized]);

    const setAuth = (newAuthState: any) => {
        setAuthState(newAuthState);
    };

    if (!isInitialized) {
        return <p>Loading...</p>
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};