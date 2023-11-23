import { useAuth } from "@/data/contexts/AuthProvider/useAuth"

export function Home(){
    const { user } = useAuth()
    const msg = "You're logged !!! :)"
    return (
        <div>
            <div className="flex flex-col mb-1 mx-2 p-10 h-full
            rounded bg-gray-900
            ">
                <br />
                {user 
                    ? 'WELCOME ' + user?.name +' - '+ user?.email
                    : ''
                }
                <br /><br />
                HOME PAGE
                <br />
                ====================================
                <br />
                {/* <br />
                {props.list}
                <br /><br /> */}
                {msg}
                {/* TODO: msg apenas primeira vez */}
            </div>
        </div>
    )
}