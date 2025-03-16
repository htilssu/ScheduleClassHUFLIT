'use client';
import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {User} from "@prisma/client";

const AuthContext = createContext<{ user: User | null, setCurrentUser: (user: User) => void, loading: boolean }>(
    {
        loading: false, setCurrentUser(user): void {
        }, user: null
    }
);
export const useAuth = () => useContext(AuthContext);


export const AuthProvider: FC<{ children: ReactNode }> = props => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    useEffect(() => {
        setIsLoadingUser(false)

    }, [currentUser]);

    return (
        <AuthContext.Provider value={{user: currentUser, setCurrentUser, loading: isLoadingUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}
