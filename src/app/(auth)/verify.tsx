import { Link, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'
import OtpField from '@/components/ui/molecule/OtpField'
import { useVerifyEmail } from '@/features/authentication/hooks/useVerifyEmail' // Import the new hook

const Verify: React.FC = (): React.JSX.Element => {
	const { email } = useLocalSearchParams<{ email: string }>()
	const [otp, setOtp] = useState('')
	const [countdown, setCountdown] = useState(30)
	const [canResend, setCanResend] = useState(false)

	const { mutate: verify, isPending } = useVerifyEmail() // Use the hook

	useEffect((): void | (() => void) => {
		if (countdown === 0) {
			setCanResend(true)
			return
		}
		const timer = setTimeout(() => {
			setCountdown(countdown - 1)
		}, 1000)
		return () => clearTimeout(timer)
	}, [countdown])

	const handleVerify = (): void => {
		if (!email) return
		verify({ email, otp }) // Call the mutation
	}

	const handleResendCode = (): void => {
		if (!canResend) return
		// You would add the API call to resend the code here
		console.log('Resending code...')
		setCanResend(false)
		setCountdown(30)
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.kav}>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.title}>Verify Your Account</Text>
					<Text style={styles.subtitle}>{`We've sent a six-digit code to your email address.`}</Text>
				</View>

				<View style={styles.form}>
					<OtpField
						value={otp}
						onChange={setOtp}
					/>

					<View style={styles.resendContainer}>
						<Text style={styles.resendText}>{`Didn't receive the code?`}</Text>
						<Pressable
							onPress={handleResendCode}
							disabled={!canResend}>
							<Text style={[styles.resendLink, !canResend && styles.disabledLink]}>
								{canResend ? 'Resend Code' : `Resend in ${countdown}s`}
							</Text>
						</Pressable>
					</View>

					<Button
						title='Verify'
						onPress={handleVerify}
						variant='primary'
						size='lg'
						disabled={otp.length !== 6}
						loading={isPending} // Add loading state
						style={styles.verifyButton}
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

export default Verify

// Styles are unchanged
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
	resendContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.gap(1)
	},
	resendText: {
		color: theme.colors.dimmed,
		fontSize: theme.fontSizes.sm
	},
	resendLink: {
		color: theme.colors.link,
		fontWeight: theme.fontWeights.semiBold,
		fontSize: theme.fontSizes.sm
	},
	disabledLink: {
		color: theme.colors.dimmed
	},
	verifyButton: {
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
