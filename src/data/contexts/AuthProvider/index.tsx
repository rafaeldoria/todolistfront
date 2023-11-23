import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext } from "./types";
import { enccryptedString, getUserCookie,  managerCookieAuth, decodeToken } from "./utils";
import { User } from "@/model/User";
import { loginRequest, register } from "@/Services/api";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    const userEmpty = {
        email:'',
        name:'',
        token:''
    }

    async function configSession(response: any){
        if(response.error || response.errors){
            setUser(userEmpty)
            managerCookieAuth('',false)
            setLoading(false)
            return false
        }
        const decodeData : any = decodeToken(response.token)
        const payload = decodeData !== null && decodeData.user ? 
        {
            email: decodeData.user.email, 
            name: decodeData.user.name,
            id: decodeData.user.id
        } : userEmpty
        setUser(payload)
        managerCookieAuth(enccryptedString(JSON.stringify(response.token)),true)
        setLoading(false)
        return (payload?.email) ?? ''
    }

    async function registerUser(data: User){
        try {
            setLoading(true)
            const response = await register(data)
            if(!response){
                throw new Error('Error to create an user.');
            }
            if(data.password){
                await authenticate(response.data.email, data.password)
            }
        }catch(error){
            throw new Error('Error to create an user.');
        } finally {
            setLoading(false)
        } 
    }

    async function authenticate(email: string, password: string) {
        try {
            setLoading(true)
            const response = await loginRequest(email, password)
            if(response.status === 200 && response.token && !response.error ){
                const session = await configSession(response)
                if(!session){
                    throw new Error('Error to login.');
                }
            }else{
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
        const token = getUserCookie()
        // TODO: Contar requests/passagens por aqui
        // TODO: Da pra criar uma função payload?
        if(token) {
            const decodeData : any = decodeToken(token)
            const payload = decodeData !== null && decodeData.user ? 
            {
                email: decodeData.user.email, 
                name: decodeData.user.name,
                id: decodeData.user.id
            } : userEmpty
            setUser(payload)
            setLoading(false)
        }else {
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={{user, authenticate, registerUser, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}