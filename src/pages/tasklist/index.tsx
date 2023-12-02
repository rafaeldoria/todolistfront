import { useAuth } from '@/data/contexts/AuthProvider/useAuth'
import { ProtectedLayout } from './../ProtectedLayout.tsx/ProtectedLayout'
import { Template } from '@/components/Template'
import { useEffect, useState } from 'react'
import { getTaskLists } from '@/services/tasklist'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreativeCommonsNd } from '@fortawesome/free-brands-svg-icons'
 
export default function Page() {
    const { logout, user } = useAuth()
    const [ taskLists, setTaskLists] = useState<any>()
    const [ loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchAllData = async () => {
        try {
            setLoading(true)
            const response = await getTaskLists()
            if(response.data){
                setTaskLists(response.data)
            }else if(response.error){
                logout()
            }
        }catch (error) {
            setLoading(false)
            logout()
        }finally {
            setLoading(false)
        }
    }
    fetchAllData()
    }, [])

    function renderTaskLists() {
        return taskLists?.map((value:  any ) => {
            return (
                <li  key={value.id} className="text-block flex items-center p-5 
                    text-xl border-b border-gray-400 cursor-pointer"
                    >
                        <FontAwesomeIcon className="mr-2" icon={faCreativeCommonsNd} />
                        <Link href={`/tasklist/${value.id}/?title=${value.title}`}>{value.title}</Link>
                </li>
            )
        })
    }

    function renderLoading(){
        <Template.LoadingPage />
    }

    function render(){
        return (
            <ProtectedLayout>
                <Template.Base>
                    <Template.Sidebar></Template.Sidebar>
                    <div className='flex flex-col h-screen w-screen'>
                    <Template.Topbar title="Task Lists"></Template.Topbar>
                        <div className="flex flex-col mb-1 mx-2 p-10 h-full
                            rounded bg-gray-900
                        ">
                            {/* <br />
                            {user 
                                ? 'WELCOME ' + user?.name +' - '+ user?.email
                                : ''
                            }
                            <br /><br />*/}
                            
                            {renderTaskLists()}
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
}