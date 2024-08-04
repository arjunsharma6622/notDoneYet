'use client'

import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState({
        isAuthenticated : true,
        user : {
            "_id": "6634d5b0e3a83ed0e86f08fe",
            "name": "Upender Reddy",
            "userName": "doctor",
            "email": "doctor@mail.com",
            "role": "doctor",
            "image": "https://res.cloudinary.com/dexnb3wk2/image/upload/v1716747960/ndy/users/6634d5b0e3a83ed0e86f08fe/profileImages/crop_ii2001.jpg",
            "bio": "Committed to athlete well-being and peak performance through expertise in sports medicine!",
            "backgroundImg": "https://res.cloudinary.com/dexnb3wk2/image/upload/v1721421824/ndy/users/6634d5b0e3a83ed0e86f08fe/profileImages/crop_silb9b.jpg",
            "followers": 1,
            "following": 1
          }
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

