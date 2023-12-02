import { getTasksByList, saveTask, updateTask } from "@/services/task";
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
        title: z.string().min(5, {message: 'Looks like empty'})
    })

type taskData = z.infer<typeof taskSchema>

export default function Page({id, title}:any) {
    const { logout } = useAuth()
    const [ tasks, setTasks] = useState<Task[]>([])
    const [ loading, setLoading] = useState(true)

    function chageStatus(task: Task) {
        try {
            setLoading(true)
            const newStatus : number = task.status ? 0 : 1
            task.status = newStatus
            updateTask(task)
            return newStatus
        } finally {
            setLoading(false)
        }
    }

    function handleStatusTask(id: number) {
        try {
            setLoading(true)
            const newTasks = tasks.map((task: Task) => {
                if(task.id === id){
                    task.status = chageStatus(task)
                    return task
                }else {
                    return task
                }
            })
            setTasks(newTasks)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true)
                if(id){
                    const response = await getTasksByList(id)
                    if(response.data){
                        setTasks(response.data)
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

    function renderLoading(){
        <Template.LoadingPage />
    }

    async function handleAddTask(data: any) {
        try {
            setLoading(true)
            let newTask : Task = {
                title: data.title,
                list_id: id,
                status: 0
            }
            const response = await saveTask(newTask)
            newTask.id = response.data.id
            console.log(newTask)
            const myTasks = tasks.slice(0);
            myTasks.push(newTask)
            setTasks(myTasks)
            reset()
        } finally {
            setLoading(false)
        }
    }

    const taskForm = useForm<taskData>({
        resolver: zodResolver(taskSchema)
    })
    const { handleSubmit, formState: {isSubmitting}, reset } = taskForm

    function render(){
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
                                    <div className="flex items-center justify-center mb-5 mr-2 ">
                                        <Form.ErrorMessage field="title"></Form.ErrorMessage>
                                    </div>
                                    <Form.Input 
                                        type="text" name="title" placeholder="Type your new task" autoComplete="off"
                                        extra="w-1/2"
                                    />
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
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
    }

    if(!loading) {
        return render()
    }else if(loading){
        return renderLoading()
    }
};

Page.getInitialProps = ({ query } : any) => {
    const { id, title } = query
    return { id, title }
}
