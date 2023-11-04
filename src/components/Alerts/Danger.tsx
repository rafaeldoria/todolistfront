interface dangerProps {
    icon?: any
    msg: any
}

export function Danger(props: dangerProps){
    return (
        <div className="flex items-center justify-center pt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {props.icon ? (
            <span className="font-medium pr-1">
                {props.icon}
            </span>
        ) : false }
            <span className="mt-1">
                {props.msg}
            </span>
        </div>
    )
}