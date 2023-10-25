import { Form } from "@/components/Form"
import { google } from "@/components/Icons/index"
import useAuthData from "@/data/hooks/useAuthData"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form"
import z from "zod";

const userSchema = z
    .object({
        email: z.string().min(5, {message: 'Email is required'})
            .email('Invalid email format'),
        password: z.string().min(6, {message: 'Min 6 character for password'}),
    })

type userData = z.infer<typeof userSchema>

export default function Authentication(){
    const { token, login, register } = useAuthData()

    function handleSubmitForm(data: any){
        console.log(data)
    }

    const userForm = useForm<userData>({
        resolver: zodResolver(userSchema)
    })

    const { handleSubmit, formState: {isSubmitting}} = userForm

    return (
        <main className="h-screen w-screen flex justify-center items-center
                bg-img-login bg-no-repeat bg-cover"
        >
            <FormProvider {...userForm}>
                <form 
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="w-full md:w-1/2 lg:w-1/3 bg-[#1F2937] px-10 py-5
                        rounded-lg border border-[#707c91]"
                >
                    
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-white text-2xl font-bold">
                            Sign in to your account
                        </p>
                    </div>

                    <div className="flex flex-col my-4">
                        <Form.Field>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Input type="email" name="email" placeholder="name@company.com" autoComplete="off"/>
                            <Form.ErrorMessage field="email"></Form.ErrorMessage>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Input type="password" name="password" placeholder="*********" autoComplete="off"/>
                            <Form.ErrorMessage field="password"></Form.ErrorMessage>
                        </Form.Field>
                    </div>

                    <div className="flex my-3 md:flex-row md:items-center justify-between">
                        <Form.Checkbox 
                            label="Remember me"
                            className="border-1 border-[#707c91] rounded-md mt-1 bg-[#374151]
                            checked:bg-blue-500 checked:border-1"
                        />
                        <div className="flex items-center">
                            <button className="text-blue-500">Forgot password?</button>  
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center my-3">
                        <button 
                            disabled={isSubmitting}
                            type="submit"
                            className="my-3 py-3 w-full rounded-lg
                                bg-blue-500 text-blue-200"
                        >
                            Login
                        </button>

                        <hr className="my-1 border-gray-600 w-full"/>

                        <button 
                            className="flex justify-center items-center my-3 py-3
                                w-full bg-rose-800 hover:bg-rose-700
                                text-white rounded-lg px-1"
                        >
                            <span className="mr-2">
                                {google}
                            </span>
                            <span>
                                Google
                            </span>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center my-3">
                        <Link className="text-blue-500" href="/register">Dont have an account?</Link>
                    </div>
                </form>
            </FormProvider>
        </main>
    )
}