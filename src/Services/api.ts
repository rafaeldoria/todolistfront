import { enccryptedString, getUserCookie, managerCookieAuth } from "@/data/contexts/AuthProvider/utils";
import { Task } from "@/model/Task";
import { User } from "@/model/User";

export const Api = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    myToken: getUserCookie()
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

export async function getTaskLists() {
    try {
        const validatedtoken = await validToken()
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

export async function getUser(email: string) {
    const urlApi = Api.baseUrl
    const params = new URLSearchParams({'email':email})
    const response = await fetch(urlApi + '/user?' + params, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Api.myToken
        },
    });
    return await response.json()
}

export async function getTasksByList(id: number) {
    try {
        const validatedtoken = await validToken()
        if(validatedtoken.error){
            throw new Error('Invalid token.');
        }
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/task/bylist/' + id, {
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

export async function saveTask(task: Task) {
    try {
        const validatedtoken = await validToken()
        if(validatedtoken.error){
            throw new Error('Invalid token.');
        }
        const urlApi = Api.baseUrl
        const response = await fetch(urlApi + '/task/' + task.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + validatedtoken
            },
            body: JSON.stringify({
                task: task.title,
                list_id: task.list_id,
                status: task.status
            })
        });
        const result = await response.json()
        return result
    } catch (error) {
        return {'error' : error}
    }
}