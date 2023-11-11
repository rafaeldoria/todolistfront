import { ProtectedLayout } from "@/pages/ProtectedLayout.tsx/ProtectedLayout";
import { HTMLAttributes } from "react";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

export function Layout(props: LayoutProps) {
    return (
        <div className="flex h-screen w-screen items-center justify-center 
            bg-gradient-to-b from-gray-700 via-gray-900 to-black"
        >
            {props.children}
        </div>
    )
}