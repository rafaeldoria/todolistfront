import Cookies from 'js-cookie'
import Cryptr from 'cryptr';
import { Api } from "@/Services/api"
import { User } from "@/model/User";

export async function loginRequest (email: string, password: string) {
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
        return {'error' : error}
    }
}

export async function register (data: User) {
    try {
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:data.name,
                email:data.email,
                password:data.password
            })
        })
        const result = await response.json()
        return result
    } catch (error) {
        return {'error' : error}
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

export function getUserCookie() {
    const cookieAuth = (process.env.NEXT_COOKIE_LOGIN) ?? 'lca'
    let user = null
    let json = Cookies.get(cookieAuth)
    if(json && json != '' && json != undefined){
        try {
            user = JSON.parse(deccryptedString(json))
        } catch (error) {
            return null
        }
    }
    return user 
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
