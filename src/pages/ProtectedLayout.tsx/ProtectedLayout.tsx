import { useAuth } from "@/data/contexts/AuthProvider/useAuth"
import { useRouter } from 'next/router'
import Image from "next/image"
import Loading from "../../../public/images/loading.gif"

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
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={Loading} alt={"loading"}></Image>
            </div>
        )
    }

    // TODO: varias chamadas, entender e corrigir
    console.log('email pl: ' + user?.email)
    
    if(!loading && user?.email) {
        return render()
    }else if(loading){
        return renderLoading()
    }else {
        router.push('/auth')
    }
}