import { google } from "../Icons";

export function ButtonGoogle() {
    return (
        <button 
            className="flex justify-center items-center my-3 py-3
                w-full bg-rose-800 hover:bg-rose-700
                text-white rounded-lg px-1"
        >
            <span className="mr-2">
                {google}
            </span>
            <span>
                Google
            </span>
        </button>
    )
}