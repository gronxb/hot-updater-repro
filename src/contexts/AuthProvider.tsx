import { createContext, type ReactNode, useContext, useState } from 'react'

import type { SignUpResponse } from '@/features/authentication/services/authApi'

// Define the shape of the user and the session
type User = SignUpResponse['user']
type Token = SignUpResponse['token']

// Define the shape of the authentication context
interface AuthContextType {
	user: User | null
	token: Token | null
	isAuthenticated: boolean
	setUserSession: (data: SignUpResponse) => void
	signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): React.JSX.Element => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<Token | null>(null)

	// Function to set the user session after a successful sign-in/sign-up
	const setUserSession = (data: SignUpResponse): void => {
		setUser(data.user)
		setToken(data.token)
	}

	// Function to clear the session on sign-out
	const signOut = (): void => {
		setUser(null)
		setToken(null)
	}

	const value = {
		user,
		token,
		isAuthenticated: !!token, // User is authenticated if a token exists
		setUserSession,
		signOut
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to easily access the auth context
export function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
