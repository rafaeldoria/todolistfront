import Image from "next/image";

export function Avatar() {
    return (
        <div className="flex flex-grow justify-end items-center">
            <Image 
                src="/images/avatar.png"
                alt="Avatar"
                width={100}
                height={100}
                className="h-10 w-10 rounded-full cursor-pointer"
            ></Image>
        </div>
    )
}