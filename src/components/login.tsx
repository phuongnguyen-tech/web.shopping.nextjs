'use client'

import loginCustomer from '@/apiServives/auth'
import { useState } from 'react'

const Login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle login logic here
        const token = await loginCustomer(phone, password)

        console.log('Logging in with:', phone, password)
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Phone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
