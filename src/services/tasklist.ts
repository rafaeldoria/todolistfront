import { Api } from "./api";
import { validToken } from "./auth";

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