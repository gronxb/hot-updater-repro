import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAlert } from '@/contexts/AlertProvider'
import { useAuth } from '@/contexts/AuthProvider' // Import useAuth
import { signIn, type SignInPayload, type SignInResponse } from '@/features/authentication/services/authApi'

export function useSignIn(): UseMutationResult<SignInResponse, Error, SignInPayload> {
	const { showAlert } = useAlert()
	const { setUserSession } = useAuth() // Get the session function

	return useMutation({
		mutationFn: (data: SignInPayload) => signIn(data),
		onSuccess: data => {
			// 1. Save the user session to the global context
			setUserSession(data)

			// 2. Navigate the user to the main part of the app
			router.replace('/(tabs)')
		},
		onError: error => {
			showAlert({
				title: 'Sign In Failed',
				message: error.message || 'Please check your credentials and try again.',
				type: 'error'
			})
		}
	})
}
