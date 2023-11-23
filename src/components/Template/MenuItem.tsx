import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import router, { useRouter } from "next/router"
import { useState } from "react"

interface MenuItemProps {
    text: string
    icon: any
    url: string
}

export function MenuItem(props: MenuItemProps) {
    const pathname = usePathname()
    const [validPage, setValidPage] = useState<boolean>(true)

    //TODO: resolver link page state

    return (
        <li className="hover:bg-gray-800 hover:rounded mb-2
            cursor-pointer flex items-center justify-center w-full h-16">
            <Link href={props.url} legacyBehavior>
            <a className={"flex flex-col justify-center items-center" +
                (1 == 1
                  ? "text-lightBlue-400 hover:text-lightBlue-600"
                  : "text-blueGray-400 hover:text-blueGray-200")
              }>
                <FontAwesomeIcon icon={props.icon} />
                <span className="text-xs font-light mt-2">
                    {props.text}
                </span>
            </a>
            </Link>
        </li>
    )
}