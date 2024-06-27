'use client'

import { useState } from 'react'
import Login from './login'
import Register from './register'
import { Box } from '@mui/material'

const AuthSelector = () => {
    const [isLogin, setIsLogin] = useState(true) // State variable to track current mode (Login or Register)

    return (
        <Box
            sx={{
                height: 'calc(100vh - 168px)',
            }}
        >
            <div className="flex flex-col items-center justify-center mt-12 ">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full">
                    <h2 className="text-2xl font-bold mb-4">Welcome</h2>
                    <div className="mb-4">
                        <button
                            className={`mr-2 px-4 py-2 ${
                                isLogin
                                    ? 'bg-blue-500 hover:bg-blue-700'
                                    : 'bg-gray-500 hover:bg-gray-700'
                            } text-white font-bold rounded focus:outline-none focus:shadow-outline`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`px-4 py-2 ${
                                !isLogin
                                    ? 'bg-green-500 hover:bg-green-700'
                                    : 'bg-gray-500 hover:bg-gray-700'
                            } text-white font-bold rounded focus:outline-none focus:shadow-outline`}
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </button>
                    </div>
                    {isLogin ? <Login /> : <Register />}{' '}
                    {/* Render either Login or Register based on state */}
                </div>
            </div>
        </Box>
    )
}

export default AuthSelector
