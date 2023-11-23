import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function HomeLink(){
    return (
        <div className="mt-4">
            <h2><Link href={`/`}><FontAwesomeIcon icon={faHouse} /> Home</Link></h2>
        </div>
    )
}