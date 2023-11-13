import { Avatar } from "./Avatar";

interface TitleProps {
    title: string
}

export function Topbar(props: TitleProps) {
    return (
        <div className="flex my-1 mx-2 p-10 h-1
            rounded bg-gray-900
        ">
            <div>
                <h1 className="font-black text-2xl
                text-blueGray-200">{props.title}</h1>
            </div>
            <Avatar />
        </div>
    )
}