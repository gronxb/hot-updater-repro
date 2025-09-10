import { z } from 'zod'

import { post } from '@/services/apiClient'

// --- SIGN UP ---
export const SignUpSchema = z.object({
	name: z.string().min(1, 'Name is required.'),
	email: z.email(),
	password: z.string().min(8, 'Password must be at least 8 characters long.')
})

export type SignUpPayload = z.infer<typeof SignUpSchema>

export interface SignUpResponse {
	token: string | null
	user: {
		id: string
		email: string
		name: string
		emailVerified: boolean
		createdAt: string
		updatedAt: string
	}
}

export async function signUp(data: SignUpPayload): Promise<SignUpResponse> {
	SignUpSchema.parse(data)

	return await post<SignUpPayload, SignUpResponse>('/auth/sign-up/email', data)
}

// --- SIGN IN (New Code) ---
export const SignInSchema = z.object({
	email: z.email('Please enter a valid email address.'),
	password: z.string().min(1, 'Password is required.')
})
export type SignInPayload = z.infer<typeof SignInSchema>
export type SignInResponse = SignUpResponse // The API response for sign-in matches sign-up

export async function signIn(data: SignInPayload): Promise<SignInResponse> {
	SignInSchema.parse(data)
	return await post<SignInPayload, SignInResponse>('/auth/sign-in/email', data)
}

// --- VERIFY EMAIL (New Code) ---
export const VerifyEmailSchema = z.object({
	email: z.email(),
	otp: z.string().length(6, 'Code must be 6 digits.')
})
export type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>
export interface VerifyEmailResponse {
	status: boolean
	token: string | null
	user: SignUpResponse['user']
}

export async function verifyEmail(data: VerifyEmailPayload): Promise<VerifyEmailResponse> {
	VerifyEmailSchema.parse(data)
	return await post<VerifyEmailPayload, VerifyEmailResponse>('/auth/email-otp/verify-email', data)
}

// --- FORGOT PASSWORD (New Code) ---
export const ForgotPasswordSchema = z.object({
	email: z.email('Please enter a valid email address.')
})
export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>
export interface ForgotPasswordResponse {
	success: boolean
}

export async function requestPasswordReset(data: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
	ForgotPasswordSchema.parse(data)
	return await post<ForgotPasswordPayload, ForgotPasswordResponse>('/auth/forget-password/email-otp', data)
}

// --- RESET PASSWORD (New) ---
export const ResetPasswordSchema = z.object({
	email: z.email(),
	otp: z.string().length(6, 'Code must be 6 digits.'),
	password: z.string().min(8, 'Password must be at least 8 characters long.')
})
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>
export interface ResetPasswordResponse {
	success: boolean
}

export async function resetPassword(data: ResetPasswordPayload): Promise<ResetPasswordResponse> {
	ResetPasswordSchema.parse(data)
	return await post<ResetPasswordPayload, ResetPasswordResponse>('/auth/email-otp/reset-password', data)
}
