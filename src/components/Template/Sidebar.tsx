import Link from "next/link";
import { HTMLAttributes } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar(props: SidebarProps) {

    return (
        <nav className="left-0 block fixed top-0 bottom-0 overflow-y-auto flex-row flex-nowrap overflow-hidden 
            shadow-xl bg-white md:w-64 z-10 py-4 px-6">
            <div className="md:flex-col items-stretch flex-nowrap px-0 flex justify-between w-full mx-auto">
            <Link href="/" legacyBehavior>
                <a
                    href="#pablo"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 
                    inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 "
                >
                    MY TODO LIST
                </a>
            </Link>
            <hr className="my-4 min-w-full" />
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Task Lists
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="text-blueGray-700 items-center">
                    <Link href="/" legacyBehavior>
                        <a href="#" 
                            className={
                                "text-xs uppercase py-3 font-bold block " +
                                (1 == 1
                                ? "text-lightBlue-500 hover:text-lightBlue-600"
                                : "text-blueGray-700 hover:text-blueGray-500")
                            }
                        >
                            <FontAwesomeIcon icon={faTv} />{" "}
                                TASK LISTS
                        </a>
                    </Link>
                </li>
            </ul>
                {props.children}
            </div>
        </nav>
    )
}