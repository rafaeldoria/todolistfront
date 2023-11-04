import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext } from "./types";
import { LoginRequest, Register, enccryptedString, getUserLocalStorage, managerCookieAuth, setUserLocalStorage } from "./util";
import { User } from "@/model/User";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    const userEmpty = {
        email:'',
        name:'',
        token:''
    }

    async function configSession(data: any, email: string){
        if(data.error){
            setUser(userEmpty)
            managerCookieAuth('',false)
            setLoading(false)
            return false
        }
        const payload = data != null ? {token: data.token, email: email, name:'rafaeL'} : userEmpty
        setUser(payload)
        managerCookieAuth(enccryptedString(payload.token),true)
        setLoading(false)
        return email
    }

    async function register(data: User){
        const newUser = await Register(data)
        setUser(newUser)
    }

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password)
        const session = await configSession(response, email)
        if(!session){
            throw new Error('Incorrect username or password');
        }
    }

    function logout() {
        setUser(userEmpty)
        managerCookieAuth('', false)
    }

    useEffect(() => {
        const user = getUserLocalStorage()
        
        if(user) {
            setUser(user)
            setLoading(false)
        }else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, authenticate, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}