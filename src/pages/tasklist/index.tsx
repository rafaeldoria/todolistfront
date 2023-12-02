import { useAuth } from '@/data/contexts/AuthProvider/useAuth'
import { ProtectedLayout } from './../ProtectedLayout.tsx/ProtectedLayout'
import { Template } from '@/components/Template'
import { useEffect, useState } from 'react'
import { getTaskLists } from '@/services/tasklist'
import Link from 'next/link'
 
export default function Page() {
  const { logout, user } = useAuth()
  const [ taskLists, setTaskLists] = useState<any>()
  const [ loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
        try {
            const response = await getTaskLists()
            if(response.data){
                setTaskLists(response.data)
                setLoading(false)
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
              <div key={value.id}>
                  <h1>-----------</h1>
                  <ul>
                      <li className="text-white">
                          <Link href={`/tasklist/${value.id}/?title=${value.title}`}>{value.id}</Link>
                      </li>
                      <li className="text-white">{value.title}</li>
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
            <Template.Topbar title="Task Lists"></Template.Topbar>
                <div className="flex flex-col mb-1 mx-2 p-10 h-full
                    rounded bg-gray-900
                ">
                    <br />
                    {user 
                        ? 'WELCOME ' + user?.name +' - '+ user?.email
                        : ''
                    }
                    <br /><br />
                    <h2>TAKS LIST
                    </h2>
                    <br />
                    ====================================
                    <br />
                    {renderTaskLists()}
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
}