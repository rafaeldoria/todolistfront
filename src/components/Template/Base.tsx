export function Base(props : any) {
    return (
        
        <div className="flex h-screen w-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black">
            <div className="flex h-screen w-screen">
                {props.children}
            </div>
        </div>
    )
}