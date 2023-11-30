import { getTasksByList, saveTask } from "@/Services/api";
import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { useEffect, useState } from "react";
import { ProtectedLayout } from "../ProtectedLayout.tsx/ProtectedLayout";
import { Template } from '@/components/Template'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { TaskTemplate } from "@/components/Task";
import { Task } from "@/model/Task";

export default function Page({id, title}:any) {
    const { logout } = useAuth()
    const [ tasks, setTasks] = useState<any>()
    const [ loading, setLoading] = useState(true)

    function chageStatus(task: Task) {
        const newStatus : number = task.status ? 0 : 1
        task.status = newStatus
        saveTask(task)
        return newStatus
    }

    function handleStatusTask(id: number) {
        const newTasks = tasks.map((task: Task) => {
            if(task.id === id){
                task.status = chageStatus(task)
                return task
            }else {
                return task
            }
        })
        setTasks(newTasks)
    }

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
            let textStyle = 'text-gray-600'
            let gradient = ''
            if(value.status == 1){
                textStyle = 'line-through text-gray-300' 
                gradient = 'bg-gradient-to-br from-blue-400 to-purple-500' 
            }

            return (
                <li  key={value.id} className="text-block flex items-center p-5 
                    text-xl border-b border-gray-400 cursor-pointer"
                    onClick={() => {handleStatusTask(value.id)}}
                    >
                        <div className={`flex justify-center items-center
                            h-7 w-7 rounded-full cursor-pointer text-white
                            border border-gray-400 ${gradient}`}>
                            {value.status == 1 
                                ? <FontAwesomeIcon size="sm" icon={faCheck}></FontAwesomeIcon>
                                : ''
                            }
                        </div>
                        <span className={`font-light ml-5 ${textStyle}`}>{value.title}</span>
                </li>
            )
        })
    }
    return (
        <ProtectedLayout>
            <Template.Base>
                <Template.Sidebar></Template.Sidebar>
                <div className='flex flex-col h-screen w-screen'>
                    <Template.Topbar title="Tasks"></Template.Topbar>
                    <div className="flex flex-col mb-1 mx-2 p-10 h-full rounded bg-gray-800">
                        <TaskTemplate.Top title={title} />

                        {/* TODO: criar components para div e li */}
                        <div className="flex flex-1 justify-center bg-blueGray-600 rounded-b-lg
                        ">
                            <div className="flex w-3/5 items-start relative">
                            <ul className="absolute -top-12 w-full list-none
                                bg-white shadow-lg rounded-lg">
                                {renderTask()}
                            </ul>
                            </div>
                        </div>

                        <Template.HomeLink />

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
