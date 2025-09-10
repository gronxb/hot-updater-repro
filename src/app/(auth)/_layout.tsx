import { Stack } from 'expo-router'

const AuthLayout: React.FC = (): React.JSX.Element => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: 'transparent' },
				animation: 'none'
			}}
		/>
	)
}

export default AuthLayout
