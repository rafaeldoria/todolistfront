import { User } from "@/model/User";

export const Api = {
    baseUrl: process.env.NEXT_API_URL,
}

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

export async function validToken(token: string) {
    try {
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/auth/validtoken', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const result = await response.json()
        if(response.status == 200 && result.message === 'success'){
            return token;
        }else if(response.status == 498){
            return result.token
        }else {
            throw new Error('Error to make request.');
        }
    } catch (error) {
        return {'error' : error}
    }
}

export async function getTaskLists(token: string) {
    try {
        const validatedtoken = await validToken(token)
        if(validatedtoken.error){
            throw new Error('Invalid token.');
        }
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/task_list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + validatedtoken
            },
        });
        return await response.json()
    } catch (error) {
        return {'error' : error}
    }
}

export async function getUser(token: string, email: string) {
    const urlApi = Api.baseUrl
    const params = new URLSearchParams({'email':email})
    const response = await fetch(urlApi + '/user?' + params, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    return await response.json()
}