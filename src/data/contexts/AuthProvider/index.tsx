import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext } from "./types";
import { loginRequest, register, enccryptedString, getUserCookie,  managerCookieAuth } from "./utils";
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

    async function configSession(response: any, email: string){
        if(response.error || response.errors){
            setUser(userEmpty)
            managerCookieAuth('',false)
            setLoading(false)
            return false
        }
        const payload = response.data != null ? 
        {
            token: response.data.token,
            email: response.data.email, 
            name: response.data.name,
            id: response.data.id
        } : userEmpty

        setUser(payload)
        managerCookieAuth(enccryptedString(JSON.stringify(payload)),true)
        setLoading(false)
        return email
    }

    async function registerUser(data: User){
        try {
            setLoading(true)
            const response = await register(data)
            const session = await configSession(response, data.email)
            if(!session){
                throw new Error('Error to create an user.');
            }
        } finally {
            setLoading(false)
        } 
    }

    async function authenticate(email: string, password: string) {
        try {
            setLoading(true)
            const response = await loginRequest(email, password)
            const session = await configSession(response, email)
            if(!session){
                throw new Error('Incorrect username or password.');
            }
        }   finally {
            setLoading(false)
        }
    }

    function logout() {
        try {
            setUser(userEmpty)
            managerCookieAuth('', false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const user = getUserCookie()
        
        if(user) {
            setUser(user)
            setLoading(false)
        }else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, authenticate, registerUser, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}