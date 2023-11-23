import Cookies from 'js-cookie'
import Cryptr from 'cryptr';
import { User } from "@/model/User";
import { jwtDecode } from 'jwt-decode';

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
    let token = null
    let json = Cookies.get(cookieAuth)
    if(json && json != '' && json != undefined){
        try {
            token = JSON.parse(deccryptedString(json))
        } catch (error) {
            return null
            // TODO: getCookie null pode deslogar?
        }
    }
    return token 
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

export function decodeToken(token: string) {
    return jwtDecode(token)
}