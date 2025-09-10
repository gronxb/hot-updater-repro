import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAlert } from '@/contexts/AlertProvider'
import {
	resetPassword,
	type ResetPasswordPayload,
	type ResetPasswordResponse
} from '@/features/authentication/services/authApi'

export function useResetPassword(): UseMutationResult<ResetPasswordResponse, Error, ResetPasswordPayload> {
	const { showAlert } = useAlert()

	return useMutation({
		mutationFn: (data: ResetPasswordPayload) => resetPassword(data),
		onSuccess: data => {
			if (data.success) {
				router.replace('/(auth)/signin')
			}
		},
		onError: error => {
			showAlert({
				title: 'Reset failed',
				message: error.message || 'Could not reset password. Please try again.',
				type: 'error'
			})
		}
	})
}
