import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'
import Input from '@/components/ui/atom/Input'
import PasswordField from '@/components/ui/molecule/PasswordField'
import { useSignUp } from '@/features/authentication/hooks/useSignUp'

const Signup: React.FC = (): React.JSX.Element => {
	const { theme } = useUnistyles()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { mutate: signUp, isPending } = useSignUp()

	const handleSignUp = (): void => {
		signUp({ name, email, password })
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
					<Text style={styles.title}>Sign Up Account</Text>
					<Text style={styles.subtitle}>Enter your personal data to create your account.</Text>
				</View>

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
						label='Name'
						value={name}
						onChangeText={setName}
						containerStyle={styles.nameInput}
					/>

					<Input
						label='Email Address'
						value={email}
						onChangeText={setEmail}
						keyboardType='email-address'
						autoCapitalize='none'
					/>

					<PasswordField
						label='Password'
						value={password}
						onChangeText={setPassword}
					/>
					<Text style={styles.hintText}>Must contain at least 8 characters.</Text>

					<Button
						title='Sign Up'
						onPress={handleSignUp}
						variant='primary'
						size='lg'
						loading={isPending}
						style={styles.signUpButton}
					/>
				</View>

				{/* Footer Link */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account? </Text>
					<Link
						href='/(auth)/signin'
						asChild>
						<Text style={styles.footerLink}>Sign in</Text>
					</Link>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

// Add a new prop to our Input component for container styling
declare module '@/components/ui/atom/Input' {
	interface InputProps {
		containerStyle?: View['props']['style']
	}
}

export default Signup

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
	nameInput: {
		flex: 1
	},
	hintText: {
		color: theme.colors.dimmed,
		fontSize: 12,
		paddingLeft: theme.gap(0.5),
		marginTop: -theme.gap(1) // Negative margin to bring it closer to the password field
	},
	signUpButton: {
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
