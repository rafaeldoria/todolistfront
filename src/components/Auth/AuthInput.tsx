interface AuthInputProps {
    label: string
    value: any
    placeholder?: any
    required?: boolean
    type: 'text' | 'email' | 'password'
    onChange: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps){
    return(
        <div className={` flex flex-col my-4`}>
            <label>{props.label}</label>
            <input 
                type={props.type ?? 'text'}
                value={props.value}
                required={props.required}
                placeholder={props.placeholder}
                className={`
                    border border-[#707c91] rounded-lg bg-[#374151]
                    focus:border-blue-400 focus:outline-none
                    px-5 py-3 mt-2 text-md text-white 
                `}
                onChange={e => props.onChange?.(e.target.value)}
            ></input>
        </div>
    )
}

// jsonplacehholder