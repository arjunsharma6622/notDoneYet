// 'use client'

// import { useState, useEffect, ReactNode } from "react";
// import { AuthContext } from "./AuthContext";
// import axiosInstance from "@/utils/axiosInstance";
// import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";



// interface AuthProviderProps {
//     children: ReactNode;
// }

// const checkAccessToken = async (setAuth: (auth: { isAuthenticated: boolean; user: any; }) => void) => {
//     // call /checkAccessToken api and check the reponse, if 401 then call /refreshAccessToken api
//     try {
//         await axiosInstance.get('/auth/checkAccessToken');
//         await fetchUser(setAuth);
//     } catch (err: any) {
//         if (err.response.status === 401) {
//             console.log("refreshing access token...");
//             try {
//                 await axiosInstance.post('/auth/refreshAccessToken');
//                 await fetchUser(setAuth);
//             }
//             catch (err: any) {
//                 if (err?.response?.status === 401) {
//                     toast.error("Session expired, please login again");
//                     console.log("access token expired, logging out...");
//                     try {
//                         const logoutResponse = await axiosInstance.post('/auth/logout');
//                         if (logoutResponse?.status === 200) {
//                             localStorage.removeItem('auth');
//                         }
//                     } catch (err: any) {
//                         console.log(err);
//                         toast.error(err.response.data.message);
//                     }
//                 }
//             }
//         }
//     }
// }

// const fetchUser = async (setAuth: (auth: { isAuthenticated: boolean; user: any; }) => void) => {
//     try {
//         const response = await axiosInstance.get('/user/authenticatedUser'); // Endpoint to get user data
//         if (response?.status === 200) {
//             setAuth({ isAuthenticated: true, user: response.data.data });
//         }
//     } catch (err: any) {
//         console.log("Error fetching user:", err);
//         toast.error("Failed to fetch user data");
//     }
// }


// export const AuthProvider = ({ children }: AuthProviderProps) => {
//     const [auth, setAuthState] = useState({ isAuthenticated: false, user: null });
//     const [isInitialized, setIsInitialized] = useState(false);

//     useEffect(() => {
//         const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
//         if (storedAuth) {
//             setAuthState(JSON.parse(storedAuth));
//         }
//         setIsInitialized(true);
//     }, []);

//     useEffect(() => {
//         if (isInitialized) {
//             localStorage.setItem('auth', JSON.stringify(auth));
//         }
//     }, [auth, isInitialized]);

//     useEffect(() => {
//         if (isInitialized) {
//             checkAccessToken(setAuth);
//         }
//     }, [isInitialized]);

//     const setAuth = (newAuthState: any) => {
//         setAuthState(newAuthState);
//     };

//     if (!isInitialized) {
//         return <div className="w-full flex h-screen items-center justify-center">
//             <Skeleton className="bg-transparent">
//                 <Image src="/logo_long.svg" alt="logo" width={200} height={200} />
//             </Skeleton>
//         </div>;
//     }

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };




'use client'

import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// Define types for the authentication state and user data
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface User {
    id: string;
    name: string;
    email: string;
    // Add other user fields as needed
}

interface AuthProviderProps {
    children: ReactNode;
}

const checkAccessToken = async (setAuth: (auth: AuthState) => void) => {
    try {
        await axiosInstance.get('/auth/checkAccessToken');
        await fetchUser(setAuth);
    } catch (err: any) {
        if (err.response?.status === 401) {
            console.log("Refreshing access token...");
            try {
                await axiosInstance.post('/auth/refreshAccessToken');
                await fetchUser(setAuth);
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    toast.error("Session expired, please login again");
                    console.log("Access token expired, logging out...");
                    try {
                        const logoutResponse = await axiosInstance.post('/auth/logout');
                        if (logoutResponse?.status === 200) {
                            localStorage.removeItem('auth');
                            setAuth({ isAuthenticated: false, user: null });
                        }
                    } catch (err: any) {
                        console.error("Error during logout:", err);
                        toast.error("An error occurred during logout");
                    }
                }
            }
        }
    }
}

const fetchUser = async (setAuth: (auth: AuthState) => void) => {
    try {
        const response = await axiosInstance.get('/user/authenticatedUser'); // Adjust endpoint as necessary
        if (response?.status === 200) {
            setAuth({ isAuthenticated: true, user: response.data.data });
        }
    } catch (err: any) {
        console.error("Error fetching user:", err);
        toast.error("Failed to fetch user data");
    }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuthState] = useState<AuthState>({ isAuthenticated: false, user: null });
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = () => {
            const storedAuth = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
            if (storedAuth) {
                setAuthState(JSON.parse(storedAuth));
            }
            setIsInitialized(true);
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('auth', JSON.stringify(auth));
        }
    }, [auth, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            checkAccessToken(setAuthState);
        }
    }, [isInitialized]);

    if (!isInitialized) {
        return (
            <div className="w-full flex h-screen items-center justify-center">
                <Skeleton className="bg-transparent">
                    <Image src="/logo_long.svg" alt="logo" width={200} height={200} />
                </Skeleton>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth: setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};
