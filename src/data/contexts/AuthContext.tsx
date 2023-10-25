import { createContext, useState } from "react";

interface AuthContextProps {
    token: string,
    register?: (
        fullname: string,
        email: string,
        password: string
    ) => Promise<void>
    login?: (
        email: string,
        password: string
    ) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    token : ''
})

export function AuthProvider(props: any){
    const [token, setToken] = useState('asdioasdopoasolsdfklsdflklsdfpásd')
    return <AuthContext.Provider value={{
        token
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext