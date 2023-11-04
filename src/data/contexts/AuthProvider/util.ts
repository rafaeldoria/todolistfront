import Cookies from 'js-cookie'
import Cryptr from 'cryptr';
import { Api } from "@/Services/api"
import { User } from "@/model/User";

export async function LoginRequest (email: string, password: string) {
    try {
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        });
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
}

export async function Register (data: User) {
    try {
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi, {
            method: 'POST',
            body: JSON.stringify({

            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export function setUserLocalStorage(user: User | null) {
    localStorage.setItem('u', JSON.stringify(user))
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('u')
    let user = null
    if(json && json != '' && json != undefined){
        user = JSON.parse(json)
    }
    return user 
}

export function managerCookieAuth(value: string, logged: boolean) {
    const cookieAuth = (process.env.NEXT_COOKIE_LOGIN) ?? 'lca'
    if(logged){
        Cookies.set(cookieAuth, value, {expires: 1})
    }else{
        Cookies.remove(cookieAuth)
    }
}

export function enccryptedString(value: string) {
    const secret = (process.env.NEXT_PUBLIC_KEY) ?? 'ABC1324564123lca'
    const cryptr = new Cryptr(secret)
    return cryptr.encrypt(value)
}

export function deccryptedString(value: string) {
    const secret = (process.env.NEXT_PUBLIC_KEY) ?? 'ABC1324564123lca'
    const decryptr = new Cryptr(secret)
    return decryptr.decrypt(value)
}