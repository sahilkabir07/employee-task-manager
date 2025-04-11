import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        handleLogin(email, password)
        console.log("Form Submitted!!! with email:", email, "and password:", password);
        setEmail("")
        setPassword("")
    }
    return (
        <div className='bg-[#111]'>
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="border-2 border-emerald-600 p-20 rounded-2xl">
                    <form className="flex flex-col items-center justify-center gap-2" onSubmit={(e) => { submitHandler(e) }}>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} required className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent" type="email" placeholder='Enter Your Email' />
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} required className="border-2 border-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-gray-400 outline-none bg-transparent" type="password" placeholder='Enter Your Password' />
                        <button className="!bg-emerald-600 text-xl py-3 px-5 rounded-full placeholder:text-white text-white outline-none border-none hover:!bg-black" >Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login