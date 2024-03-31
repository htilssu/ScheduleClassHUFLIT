import {createContext, FC, ReactNode, useContext, useState} from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

type User = {
    userId: string;
    email: string;
    avatar: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
}

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<void>;
}



export const AuthProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [currentUser, setCurrentUser] = useState<User|null>(null)

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}} >
            {props.children}
        </AuthContext.Provider>
    );
}
