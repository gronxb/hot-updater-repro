import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'
import Input from '@/components/ui/atom/Input'
import { useForgotPassword } from '@/features/authentication/hooks/useForgotPassword'

const ForgotPassword: React.FC = (): React.JSX.Element => {
	const [email, setEmail] = useState('')
	const { mutate: sendCode, isPending } = useForgotPassword()

	const handlePasswordReset = (): void => {
		sendCode({ email })
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.kav}>
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Forgot Password</Text>
					<Text style={styles.subtitle}>
						{`Enter your email and we'll send you a code to reset your password.`}
					</Text>
				</View>

				{/* Form */}
				<View style={styles.form}>
					<Input
						label='Email address'
						value={email}
						onChangeText={setEmail}
						placeholder='Enter your email address'
						keyboardType='email-address'
						autoCapitalize='none'
					/>
					<Button
						title='Send Code'
						onPress={handlePasswordReset}
						variant='primary'
						size='lg'
						loading={isPending}
						style={styles.sendButton}
					/>
				</View>

				{/* Footer Link */}
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

export default ForgotPassword

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
		fontSize: 32,
		fontWeight: 'bold',
		color: theme.colors.typography,
		marginBottom: theme.gap(1)
	},
	subtitle: {
		fontSize: 16,
		color: theme.colors.dimmed,
		textAlign: 'center'
	},
	form: {
		gap: theme.gap(2)
	},
	sendButton: {
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
