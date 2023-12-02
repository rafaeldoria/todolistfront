import Image from "next/image"
import Loading from "../../../public/images/loading.gif"

export function LoadingPage() {
    return (
        <div className={`
            flex justify-center items-center h-screen
        `}>
            <Image src={Loading} alt={"loading"}></Image>
        </div>
    )
}