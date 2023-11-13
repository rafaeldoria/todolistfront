import { faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Logout() {
    return (
        <ul>
            <li className="hover:bg-gray-800 hover:rounded mb-2
            cursor-pointer flex items-center justify-center w-full h-16">
                <a className={`
                    flex flex-col justify-center items-center
                    h-16 w-full text-red-400
                    hover:bg-red-400 hover:text-white
                `}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span className={`
                        text-xs font-light mt-1
                    `}>
                        LOGOUT
                    </span>
                </a>
            </li>
        </ul>
    )
}