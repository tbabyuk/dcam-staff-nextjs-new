"use client"




import { useState } from "react"

export const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
        <form className="flex flex-col w-[300px] bg-black bg-opacity-30 text-gray-100 rounded-md mx-auto p-5">
            <h2 className="text-lg text-center mb-2">Login Form</h2>
            <label>
                <span className="block mb-1">Email:</span>
                <input type="email" className="w-full" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <span className="block mb-1">Password:</span>
                <input type="password" className="w-full" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button className="bg-green-600 hover:bg-green-700 mt-3 py-2 text-gray-100 rounded">Log In</button>
            <div className="text-red-500 mt-2">Error message</div>
        </form>
    )
}