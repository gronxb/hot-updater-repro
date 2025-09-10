import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAlert } from '@/contexts/AlertProvider'
import { signUp, type SignUpPayload, type SignUpResponse } from '@/features/authentication/services/authApi'

export function useSignUp(): UseMutationResult<SignUpResponse, Error, SignUpPayload> {
	const { showAlert } = useAlert()

	return useMutation({
		mutationFn: (data: SignUpPayload) => signUp(data),
		onSuccess: data => {
			// On success, navigate to the verify screen, passing the email as a parameter
			router.push({
				pathname: '/(auth)/verify',
				params: { email: data.user.email }
			})
		},
		onError: error => {
			showAlert({
				title: 'Sign Up Failed',
				message: error.message,
				type: 'error'
			})
		}
	})
}
