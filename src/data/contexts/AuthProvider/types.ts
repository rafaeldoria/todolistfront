import { User } from "@/model/User"

export interface IContext {
    authenticate: (email: string, password: string) => Promise<void>
    logout: () => void
    loading: boolean
    user?: User
    // register: (data: User) => Promise<void>
}

export interface IAuthProvider {
    children: JSX.Element
}