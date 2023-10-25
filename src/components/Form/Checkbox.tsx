import { check } from "../Icons"

interface CheckoboxProps{
    label: string
    className?: any
}

export function Checkbox(props: CheckoboxProps){
    return (
        <div className={`flex items-center`}>
            <input 
                className={`
                    peer relative appearance-none shrink-0 w-5 h-5
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-300 focus:border-2
                    disabled:border-steel-400 disabled:bg-steel-400
                    ${props.className}
                `}
                type="checkbox"
                name="rememberme"
            />
            {check}
            <label className={
                `ml-3 mt-1 font-medium 
                text-[#D1D5DB] text-opacity-90
            `}
            >
                {props.label}
            </label>

        </div>
    )
}