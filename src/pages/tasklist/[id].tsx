import { getTasksByList, saveTask, updateTask } from "@/Services/api";
import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { useEffect, useState } from "react";
import { ProtectedLayout } from "../ProtectedLayout.tsx/ProtectedLayout";
import { Template } from '@/components/Template'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TaskTemplate } from "@/components/Task";
import { Task } from "@/model/Task";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/Form";

const taskSchema = z
    .object({
        title: z.string().min(5, {message: 'Title is required'})
    })

type taskData = z.infer<typeof taskSchema>

export default function Page({id, title}:any) {
    const { logout } = useAuth()
    const [ tasks, setTasks] = useState<Task[]>([])
    const [ loading, setLoading] = useState(true)

    function chageStatus(task: Task) {
        const newStatus : number = task.status ? 0 : 1
        task.status = newStatus
        updateTask(task)
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

    async function handleAddTask(data: any) {
        const myTasks = tasks.slice(0);
        const lengthMyTasks = myTasks.length

        
        const newTask : Task = {
            id: lengthMyTasks+1,
            list_id: id,
            title: data.title,
            status: 0
        }
        // saveTask(newTask)
        // console.log(newTask)
        // console.log(myTasks)
        // myTasks[lengthMyTasks+1] = newTask
        setTasks(myTasks)
        
    }

    const taskForm = useForm<taskData>({
        resolver: zodResolver(taskSchema)
    })
    const { handleSubmit, formState: {isSubmitting} } = taskForm

    return (
        <ProtectedLayout>
            <Template.Base>
                <Template.Sidebar></Template.Sidebar>
                <div className='flex flex-col h-screen w-screen'>
                    <Template.Topbar title="Tasks"></Template.Topbar>
                    <div className="flex flex-col mb-1 mx-2 p-10 h-full rounded bg-gray-800">
                        <FormProvider {...taskForm}>
                            <form 
                                onSubmit={handleSubmit(handleAddTask)}
                                className="flex justify-center mb-1">
                                    <Form.Input 
                                        type="text" name="title" placeholder="Type your new task" autoComplete="off"
                                        extra="w-1/2"
                                    />
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    // onClick={() => {console.log('clica')}}
                                    className={`
                                        ml-3 px-5 py-4 rounded-lg
                                        focus:outline-none
                                        bg-blueGray-600 text-xl
                                    `}>
                                    <FontAwesomeIcon size="xs" icon={faPlus}></FontAwesomeIcon>
                                </button>
                            </form>
                        </FormProvider>

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
