import { Redirect } from 'expo-router'

const StartPage: React.FC = (): React.JSX.Element => {
	// This component will automatically redirect the user from the root URL ('/')
	// to the '/signup' page.
	return <Redirect href='/(auth)/signin' />
}

export default StartPage
