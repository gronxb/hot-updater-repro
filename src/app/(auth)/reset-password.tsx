import { Link, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'
import OtpField from '@/components/ui/molecule/OtpField'
import PasswordField from '@/components/ui/molecule/PasswordField'
import { useAlert } from '@/contexts/AlertProvider'
import { useResetPassword } from '@/features/authentication/hooks/useResetPassword'

const ResetPasswordScreen: React.FC = (): React.JSX.Element => {
	const { email } = useLocalSearchParams<{ email: string }>()
	const [otp, setOtp] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const { showAlert } = useAlert()

	const { mutate: reset, isPending } = useResetPassword()

	const handleResetPassword = (): void => {
		if (!email) {
			showAlert({
				title: 'Missing email',
				message: 'Email parameter is missing. Please go back and start the reset again.',
				type: 'error'
			})
			return
		}
		if (newPassword !== confirmPassword) {
			showAlert({
				title: "Passwords don't match",
				message: 'Please ensure both password fields are identical.',
				type: 'error'
			})
			return
		}
		reset({ email, otp, password: newPassword })
	}

	const isDisabled = otp.length !== 6 || !newPassword || !confirmPassword || newPassword !== confirmPassword

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.kav}>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.title}>Reset Your Password</Text>
					<Text style={styles.subtitle}>
						An OTP has been sent to {email ?? 'your email'}. Please enter it below along with your new
						password.
					</Text>
				</View>

				<View style={styles.form}>
					<OtpField
						value={otp}
						onChange={setOtp}
					/>
					<PasswordField
						label='New Password'
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<PasswordField
						label='Confirm New Password'
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<Button
						title='Reset Password'
						onPress={handleResetPassword}
						variant='primary'
						size='lg'
						disabled={isDisabled}
						loading={isPending}
						style={styles.button}
					/>
				</View>

				<View style={styles.footer}>
					<Link
						href='/(auth)/signin'
						asChild>
						<Text style={styles.footerLink}>Back to Sign In</Text>
					</Link>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default ResetPasswordScreen

const styles = StyleSheet.create(theme => ({
	kav: {
		flex: 1
	},
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		padding: theme.gap(3)
	},
	header: {
		alignItems: 'center',
		marginBottom: theme.gap(3)
	},
	title: {
		fontSize: theme.fontSizes.xl3,
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.typography,
		marginBottom: theme.gap(1)
	},
	subtitle: {
		fontSize: theme.fontSizes.md,
		color: theme.colors.dimmed,
		textAlign: 'center'
	},
	form: {
		gap: theme.gap(2)
	},
	button: {
		marginTop: theme.gap(1)
	},
	footer: {
		alignItems: 'center',
		marginTop: theme.gap(3)
	},
	footerLink: {
		color: theme.colors.link,
		fontWeight: '600'
	}
}))
