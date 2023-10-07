import AuthCheckbox from "@/components/Auth/AuthCheckbox"
import AuthInput from "@/components/Auth/AuthInput"
import { google } from "@/components/Icons/Icons"
import { useState } from "react"

export default function Authentication(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [env, setEnv] = useState<'login' | 'form'>('login')

    return (
        <div className={`
            h-screen w-screen
            flex justify-center items-center
            bg-img-login bg-no-repeat bg-cover
        `}>
            <div className={`
                    w-full md:w-1/2 lg:w-1/3
                    bg-[#1F2937] px-10 py-5
                    rounded-lg border border-[#707c91]
                `}>

                {/* title */}
                <div className={`
                    flex flex-col items-center justify-center mb-4
                `}>
                    <p className={
                        `text-white text-2xl font-bold`
                    }>
                       {env == 'login' ? 'Sign in to your account' : 'Create your account'}
                    </p>
                </div>

                {/* inputs */}
                <div className={`
                    flex flex-col my-8
                `}>
                    <AuthInput 
                        label='Your email'
                        value={email}
                        type='text'
                        onChange={setEmail}
                        placeholder='name@company.com'
                    />

                    <AuthInput 
                        label='Password'
                        value={password}
                        type='password'
                        onChange={setPassword}
                        placeholder='**********'
                    />

                    {env == 'form' ? (
                        <AuthInput 
                            label='Confirm password'
                            value={password}
                            type='password'
                            onChange={setPassword}
                            placeholder='**********'
                        />
                    ) : false}
                </div>

                {env == 'login' ? (
                    <div className={`flex my-3 md:flex-row md:items-center justify-between`}>
                        <AuthCheckbox 
                            label="Remember me"
                            className="border-1 border-[#707c91] rounded-md mt-1 bg-[#374151]
                            checked:bg-blue-500 checked:border-1"
                        />
                        <div className="flex items-center">
                            <button className={`
                                text-blue-500
                            `}>Forgot password?</button>  
                        </div>
                    </div>
                ): false}
                

                <div className={`flex flex-col items-center justify-center my-3`}>
                    <button className={`
                        my-3 py-3 w-full rounded-lg
                        bg-blue-500 text-blue-200
                    `}>
                        {env == 'login' ? 'Login' : 'Create an account'}
                    </button>

                    <hr className="my-1 border-gray-600 w-full"/>

                    <button className={`
                        flex justify-center items-center my-3 py-3
                        w-full bg-rose-800 hover:bg-rose-700
                        text-white rounded-lg px-1 
                    `}>
                        <span className={`mr-2`}>
                            {google}
                        </span>
                        <span>
                            Google
                        </span>
                    </button>
                </div>


                <div className={`flex flex-col items-center justify-center my-3`}>
                    <button className={`text-blue-500`}>
                        {env == 'login' 
                            ? 'Dont have an account?'
                            : 'Already have an account?'
                        }
                    </button>
                </div>

            </div>
        </div>
    )
}