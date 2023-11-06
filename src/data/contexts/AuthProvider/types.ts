import { User } from "@/model/User"

export interface IContext {
    user?: User
    authenticate: (email: string, password: string) => Promise<void>
    registerUser: (data: User) => Promise<void>
    logout: () => void
    loading: boolean
}

export interface IAuthProvider {
    children: JSX.Element
}