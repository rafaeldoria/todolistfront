import { getTaskLists } from "@/Services/api"
import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { Key, useEffect, useState } from "react"

export function Content() {
    const { user, logout } = useAuth()
    const [taskLists, setTaskLists] = useState<any>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                if(user && user.token){
                    const response = await getTaskLists(user.token)
                    if(response.error){
                        logout()
                    }
                    if(response.data){
                        setTaskLists(response.data)
                    }
                }
            }catch (error) {
                logout()
            }finally {
                setLoading(false)
            }
        }
        fetchAllData()
    }, [user, logout])

    function renderTaskLists() {
        return taskLists?.map((value:  any ) => {
            return (
                <div key={value.id}>
                    <h1>-----------</h1>
                    <ul>
                        <li className="text-white">{value.title}</li>
                    </ul>
                </div>
            )
        })
    }
    return (
        <div className="flex flex-col mb-1 mx-2 p-10 h-full
            rounded bg-gray-900
        ">
            CONTENT
            <br />
            {user 
                ? 'WELCOME ' + user?.name +' - '+ user?.email
                : ''
            }
            <br /><br />
            MY TASK LISTS
            <br />
            ====================================
            <br />
            {renderTaskLists()}
        </div>
    )
}