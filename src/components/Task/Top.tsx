interface TopProps {
    title: string
}
export function Top (props: TopProps){
    return (
        <div className="flex h-1/3 bg-img-todobgr bg-no-repeat bg-cover
                bg-gray-400 rounded-t-lg">
            <div className={`
                flex flex-1 h-full justify-center mt-24
                text-4xl text-lightBlue-400
            `}>
                {props.title}
            </div>
        </div>
    )
}