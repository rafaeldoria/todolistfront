import { Task } from "@/model/Task";
import { Api } from "./api";
import { validToken } from "./auth";

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
        const response = await fetch(urlApi + '/task', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + validatedtoken
            },
            body: JSON.stringify({
                title: task.title,
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

export async function updateTask(task: Task) {
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