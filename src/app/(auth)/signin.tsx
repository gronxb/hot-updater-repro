import { AntDesign } from '@expo/vector-icons'
import * as Sentry from '@sentry/react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'
import Input from '@/components/ui/atom/Input'
import PasswordField from '@/components/ui/molecule/PasswordField'
import { useSignIn } from '@/features/authentication/hooks/useSignIn'

const Signin: React.FC = (): React.JSX.Element => {
	const { theme } = useUnistyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { mutate: signIn, isPending } = useSignIn()

	const handleSignIn = (): void => {
		signIn({ email, password })
	}

	const handlePress = (): void => {
		// This message will appear on your Sentry dashboard!
		Sentry.captureMessage('Hello World from Production App!')

		// This will show up as a "breadcrumb" in Sentry
		console.log('User clicked the button.')
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
					<Text style={styles.title}>HI OTA</Text>
					<Text style={styles.subtitle}>Enter your login information</Text>
					<Text
						style={styles.subtitle}
						onPress={handlePress}>
						CLICK ERROR
					</Text>
				</View>

				<Button
					title='Test Sentry Crash'
					onPress={() => {
						throw new Error('This is a test crash from the Expo app!')
					}}
				/>

				{/* Social Buttons */}
				<View style={styles.socialContainer}>
					<Button
						title='Google'
						onPress={() => {}}
						variant='secondary'
						size='md'
						leftIcon={
							<AntDesign
								name='google'
								size={20}
								color={theme.colors.typography}
							/>
						}
						style={styles.socialButton}
					/>
					<Button
						title='Apple'
						onPress={() => {}}
						variant='secondary'
						size='md'
						leftIcon={
							<AntDesign
								name='apple1'
								size={20}
								color={theme.colors.typography}
							/>
						}
						style={styles.socialButton}
					/>
				</View>

				{/* Divider */}
				<View style={styles.dividerContainer}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>OR</Text>
					<View style={styles.dividerLine} />
				</View>

				{/* Form */}
				<View style={styles.form}>
					<Input
						label='Email Address'
						value={email}
						onChangeText={setEmail}
						keyboardType='email-address'
						autoCapitalize='none'
					/>
					<View>
						<PasswordField
							label='Password'
							value={password}
							onChangeText={setPassword}
						/>
						<Link
							href='/(auth)/forgot-password'
							asChild>
							<Text style={styles.forgotPassword}>Forgot Password?</Text>
						</Link>
					</View>

					<Button
						title='Sign In'
						onPress={handleSignIn}
						variant='primary'
						size='lg'
						style={styles.signInButton}
						loading={isPending}
					/>
				</View>

				{/* Footer Link */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>{`Don't have an account? `}</Text>
					<Link
						href='/(auth)/signup'
						asChild>
						<Text style={styles.footerLink}>Sign up</Text>
					</Link>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default Signin

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
		color: theme.colors.dimmed
	},
	socialContainer: {
		flexDirection: 'row',
		gap: theme.gap(2)
	},
	socialButton: {
		flex: 1
	},
	dividerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.gap(2),
		marginVertical: theme.gap(3)
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: theme.colors.dimmed
	},
	dividerText: {
		color: theme.colors.dimmed
	},
	form: {
		gap: theme.gap(2)
	},
	forgotPassword: {
		textAlign: 'right',
		color: theme.colors.link,
		fontWeight: '600',
		marginTop: theme.gap(1)
	},
	signInButton: {
		marginTop: theme.gap(2)
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.gap(3)
	},
	footerText: {
		color: theme.colors.typography
	},
	footerLink: {
		color: theme.colors.link,
		fontWeight: '600'
	}
}))
