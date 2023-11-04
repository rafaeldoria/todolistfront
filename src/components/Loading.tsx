import { loadingIcon } from "./Icons";

export function Loading(){
    return (
        <div className="flex items-center justify-center rounded-lg bg-blue-500 text-blue-200 w-full my-3">
            {loadingIcon}
        </div>
    )
}