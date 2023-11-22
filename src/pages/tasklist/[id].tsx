import { getTasksByList } from "@/Services/api";
import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { useEffect, useState } from "react";
import { ProtectedLayout } from "../ProtectedLayout.tsx/ProtectedLayout";
import { Template } from '@/components/Template'
import Link from "next/link";

export default function Page({id, title}:any) {
    const { user, logout } = useAuth()
    const [ tasks, setTasks] = useState<any>()
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                if(id){
                    const response = await getTasksByList(id)
                    if(response.data){
                        setTasks(response.data)
                        setLoading(false)
                    }
                }
            } catch (error) {
                logout()
            } finally {
                setLoading(false)
            }
        }
        fetchAllData()
    }, [id])

    function renderTask() {
        return tasks?.map((value:  any ) => {
            return (
                <div key={value.id}>
                    <h1>-----------</h1>
                    <ul>
                        <li className="text-white">{value.title}</li>
                        <li className="text-white">
                            {value.status == 1 ? 'Done' : 'To do'}
                        </li>
                    </ul>
                </div>
            )
        })
    }
    return (
        <ProtectedLayout>
            <Template.Base>
                <Template.Sidebar></Template.Sidebar>
                <div className='flex flex-col h-screen w-screen'>
                    <Template.Topbar title="Tasks"></Template.Topbar>
                    <div className="flex flex-col mb-1 mx-2 p-10 h-full
                    rounded bg-gray-900
                    ">
                        <br />
                        {user 
                            ? 'WELCOME ' + user?.name +' - '+ user?.email
                            : ''
                        }
                        <br /><br />
                        <h2>{title}
                        </h2>
                        <br />
                        ====================================
                        <br />
                        {renderTask()}
                        <br /><br />
                        <div>
                            <div>
                                <h2><Link href={`/`}>Home</Link></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </Template.Base>
        </ProtectedLayout>
    )
};

Page.getInitialProps = ({ query } : any) => {
    const { id, title } = query
    return { id, title }
}
