import { User } from "@/model/User";
import { Api } from "./api";
import { enccryptedString, getUserCookie, managerCookieAuth } from "@/data/contexts/AuthProvider/utils";

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
        result.status = response.status
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
        if(response.status != 200 || !result.data){
            throw new Error('Error to login.');
        }
        return result
    } catch (error) {
        return {'error' : error}
    }
}

export async function validToken() {
    try {
        const urlApi = Api.baseUrl
        // TODO: TOKEN necessidade de validação, e após home separada criar funcion ou colocar na api
        const myToken = Api.myToken !== null ? Api.myToken : getUserCookie()
        const response = await fetch(urlApi + '/auth/validtoken', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken
            },
        });
        const result = await response.json()
        if(response.status == 200 && result.message === 'success'){
            return myToken;
        }else if(response.status == 498){
            managerCookieAuth(enccryptedString(JSON.stringify(result.token)),true)
            return result.token
        }else {
            throw new Error('Error to make request.');
        }
    } catch (error) {
        return {'error' : error}
    }
}