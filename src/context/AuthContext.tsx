'use client'

import { createContext } from "react";

interface AuthContextType {
    auth: any;
    setAuth: (auth: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);