import { enccryptedString, getUserCookie, managerCookieAuth } from "@/data/contexts/AuthProvider/utils";
import { Task } from "@/model/Task";
export const Api = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    myToken: getUserCookie()
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

