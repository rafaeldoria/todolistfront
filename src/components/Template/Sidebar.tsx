import { faGear, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons"
import { MenuItem } from "./MenuItem"
import { Logout } from "./Logout"
import Link from "next/link"

export function Sidebar() {
    return (
        <aside className="flex flex-col bg-gray-900 m-1">
                <div className="flex flex-col items-center justify-center mb-10
                    bg-gradient-to-tr from-indigo-500 via-blue-600 to-purple-800
                    h-20 w-36 border border-radius border-indigo-500/100 rounded">
                    <h2><Link href={`/`}>Home</Link></h2>  
                </div>
                <ul className="flex-grow">
                    <MenuItem url="/tasklist" text="TaskLists" icon={faListCheck}></MenuItem>
                    <MenuItem url="/takslist-create" text="Create" icon={faPlus}></MenuItem>
                    <MenuItem url="/settings" text="Settings" icon={faGear}></MenuItem>
                </ul>
                <Logout />
        </aside>
    )
}