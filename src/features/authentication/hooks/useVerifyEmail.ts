import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAlert } from '@/contexts/AlertProvider'
import { useAuth } from '@/contexts/AuthProvider'
import {
	verifyEmail,
	type VerifyEmailPayload,
	type VerifyEmailResponse
} from '@/features/authentication/services/authApi'

export function useVerifyEmail(): UseMutationResult<VerifyEmailResponse, Error, VerifyEmailPayload> {
	const { showAlert } = useAlert()
	const { setUserSession } = useAuth()

	return useMutation({
		mutationFn: (data: VerifyEmailPayload) => verifyEmail(data),
		onSuccess: data => {
			console.log('Verification successful:', data)
			// IMPORTANT: Your example API returns `token: null`. For a real login flow,
			// the backend should return a valid token here.
			// Our AuthProvider will handle this, but the user won't be "authenticated"
			// until a token is present.
			setUserSession(data)
			router.replace('/(tabs)')
		},
		onError: error => {
			showAlert({
				title: 'Verification Failed',
				message: error.message || 'The code is invalid or has expired.',
				type: 'error'
			})
		}
	})
}
