import { Danger } from "@/components/Alerts/Danger";
import { Form } from "@/components/Form";
import { alert, google } from "@/components/Icons/index"
import { Loading } from "@/components/Loading";
import { useAuth } from "@/data/contexts/AuthProvider/useAuth";
import { User } from "@/model/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

const userSchema = z
    .object({
        name: z.string().min(5, {message: 'Name is required'})
            .transform(name => {
                return name
                    .trim()
                    .split(' ')
                    .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
                    .join(' ')
            }),
        email: z.string().min(5, {message: 'Email is required'})
            .email('Invalid email format'),
        password: z.string().min(6, {message: 'Min 6 character for password'}),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don`'`t match",
        path: ['confirmPassword']
    })

type userData = z.infer<typeof userSchema>

export default function Register(){
    const { registerUser, loading } = useAuth()
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const userForm = useForm<userData>({
        resolver: zodResolver(userSchema)
    })
    
    const { handleSubmit, formState: {isSubmitting}, reset} = userForm

    async function handleSubmitForm(data: User){
        try {
            await registerUser(data)
            router.push('/')
        } catch (e: any) {
            setError(e.message)
            setTimeout(() => setError(''), 6 * 1000)
        }
    }

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
                            Create your account
                        </p>
                    </div>

                    {error ? (
                        <Danger 
                            icon={alert}
                            msg={error}
                        ></Danger>
                    ) : false}

                    <div className="flex flex-col my-4">
                        <Form.Field>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Input type="text" name="name" placeholder="Yusuke Urameshi" autoComplete="off"/>
                            <Form.ErrorMessage field="name"></Form.ErrorMessage>
                        </Form.Field>
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
                        <Form.Field>
                            <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                            <Form.Input type="password" name="confirmPassword" placeholder="*********" autoComplete="off"/>
                            <Form.ErrorMessage field="confirmPassword"></Form.ErrorMessage>
                        </Form.Field>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center my-3">
                        {loading ? <Loading></Loading> : 
                            <button 
                                disabled={isSubmitting}
                                type="submit"
                                className="my-3 py-3 w-full rounded-lg
                                    bg-blue-500 text-blue-200"
                            >
                               Create an account
                            </button>
                        }

                        <hr className="my-1 border-gray-600 w-full"/>

                        <Form.ButtonGoogle />
                    </div>

                    <div className="flex flex-col items-center justify-center my-3">
                        <Link className="text-blue-500" href="/auth">Already have an account?</Link>
                    </div>
                </form>
            </FormProvider>
        </main>
    )
}