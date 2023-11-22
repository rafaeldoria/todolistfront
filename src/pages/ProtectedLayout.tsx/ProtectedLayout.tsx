import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { useRouter } from 'next/router'

export const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const {user, loading} = useAuth()
    const router = useRouter()

    function render(){
        return (
            <>
                {children}
            </>
        )
    }

    function renderLoading(){
        return <div>Loading...</div>
    }

    // TODO:: varias chamadas, entender e corrigir
    console.log('email pl: ' + user?.email)
    
    if(!loading && user?.email) {
        return render()
    }else if(loading){
        return renderLoading()
    }else {
        router.push('/auth')
    }
}