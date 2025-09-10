import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAlert } from '@/contexts/AlertProvider'
import {
	type ForgotPasswordPayload,
	type ForgotPasswordResponse,
	requestPasswordReset
} from '@/features/authentication/services/authApi'

export function useForgotPassword(): UseMutationResult<ForgotPasswordResponse, Error, ForgotPasswordPayload> {
	const { showAlert } = useAlert()

	return useMutation({
		mutationFn: (data: ForgotPasswordPayload) => requestPasswordReset(data),
		onSuccess: (data, variables) => {
			if (data.success) {
				// Navigate to the verify screen, passing the email
				router.push({
					pathname: '/(auth)/reset-password',
					params: { email: variables.email }
				})
			}
		},
		onError: error => {
			showAlert({
				title: 'Request Failed',
				message: error.message || 'Could not send reset code. Please try again.',
				type: 'error'
			})
		}
	})
}
