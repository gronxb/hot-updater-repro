// The new, real BASE_URL for your API.
const BASE_URL = process.env.BASE_URL

/**
 * A basic wrapper for POST requests using fetch.
 * @param path The API endpoint path (e.g., '/auth/sign-up/email').
 * @param body The request body to be sent as JSON.
 * @returns The JSON response from the server.
 */
export async function post<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
	const response = await fetch(`${BASE_URL}${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.message || 'An unknown error occurred')
	}

	return (await response.json()) as TResponse
}
