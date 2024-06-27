import { baseUrl } from '@/utils/baseUrl'

const loginCustomer = async (phone: string, password: string) => {
    try {
        const response = await fetch(`${baseUrl}/auth/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ phone, password }),
        })

        if (!response.ok) {
            throw new Error('Failed to login') // Throw an error if response is not successful
        }

        const data = await response.json() // Parse JSON response

        // Example: Assuming your API returns a token
        if (!data.token) {
            throw new Error('Invalid response: Missing token')
        }

        return data.token // Return the token
    } catch (error) {
        console.error('Error:', error) // Log any errors
        throw error // Propagate the error to the caller
    }
}

export default loginCustomer
