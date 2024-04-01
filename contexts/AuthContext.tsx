import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {User} from "@prisma/client";
import jwt from "jsonwebtoken";

const AuthContext = createContext({
    user: null, setCurrentUser: (user: User) => {
    }
} as { user: User | null, setCurrentUser: (user: User) => void, loading: boolean});
export const useAuth = () => useContext(AuthContext);


export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
}



export const AuthProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            const user = jwt.decode(token) as User
            setCurrentUser(user)
        }

        setIsLoadingUser(false)

    }, []);

    return (
        <AuthContext.Provider value={{user: currentUser, setCurrentUser, loading: isLoadingUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}
