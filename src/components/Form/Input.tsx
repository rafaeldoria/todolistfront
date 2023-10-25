import { InputHTMLAttributes } from "react";
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
}

export function Input(props: InputProps) {
    const { register } = useFormContext()

    return (
        <input
            id={props.name}
            className="border border-[#707c91] rounded-lg bg-[#374151]
                focus:border-blue-400 focus:outline-none
                px-5 py-3 text-md text-white"
            {...register(props.name)} 
            {...props}
        >
        </input>
    )
}