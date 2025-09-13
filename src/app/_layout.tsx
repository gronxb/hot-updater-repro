import 'react-native-reanimated'

import { getUpdateSource, HotUpdater } from '@hot-updater/react-native'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { router, Stack, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import type { ComponentType, ReactNode } from 'react'
import { useEffect } from 'react'
import { Platform, Text, View } from 'react-native'

import ThemedBackground from '@/components/ui/atom/ThemedBackground'
import AlertModal from '@/components/ui/molecule/AlertModal'
import { AlertProvider, useAlert } from '@/contexts/AlertProvider'
import { AuthProvider, useAuth } from '@/contexts/AuthProvider'

const queryClient = new QueryClient()

const transparentTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent'
	}
}

function RootLayoutNav(): React.JSX.Element {
	const { isVisible, options, hideAlert } = useAlert()
	const { isAuthenticated } = useAuth()
	const segments = useSegments()

	useEffect(() => {
		const inAuthGroup = segments[0] === '(auth)'

		// If the user is authenticated and not in the main app,
		// redirect them to the main app.
		if (isAuthenticated && inAuthGroup) {
			router.replace('/(tabs)')
		}
		// If the user is not authenticated and is trying to access
		// anything outside of the auth group, redirect them to sign in.
		else if (!isAuthenticated && !inAuthGroup) {
			router.replace('/(auth)/signin')
		}
	}, [isAuthenticated, segments])

	return (
		<ThemeProvider value={transparentTheme}>
			<ThemedBackground />
			<Stack>
				<Stack.Screen
					name='(tabs)'
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='(auth)'
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='index'
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='+not-found' />
			</Stack>
			<StatusBar style='auto' />
			<AlertModal
				isVisible={isVisible}
				options={options}
				onClose={hideAlert}
			/>
		</ThemeProvider>
	)
}

function RootLayout(): ReactNode {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
	})

	if (!loaded) return null

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<AlertProvider>
					<RootLayoutNav />
				</AlertProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}

// --- START: GUARDS TO PREVENT CRASHES ---

const bundleId = Platform.select({
	ios: Constants.expoConfig?.ios?.bundleIdentifier,
	android: Constants.expoConfig?.android?.package
})

if (!bundleId) {
	throw new Error('Could not determine bundleId from Constants.expoConfig. The app cannot start.')
}

const updaterUrl = process.env.EXPO_PUBLIC_HOT_UPDATER_URL
let App: ComponentType = RootLayout

if (updaterUrl) {
	console.log(`HotUpdater enabled for URL: ${updaterUrl} and bundleId: ${bundleId}`)
	App = HotUpdater.wrap({
		source: getUpdateSource(updaterUrl, {
			// We now know updaterUrl is a string
			updateStrategy: 'fingerprint'
		}),
		onProgress: progress => {
			console.log('Bundle downloading progress:', progress)
		},
		onError: (err: unknown) => {
			console.log('HotUpdate Error: ', err)
		},
		onUpdateProcessCompleted: (response: unknown) => {
			console.log('HotUpdate Response: ', response)
		},
		fallbackComponent: ({ progress, status }) => (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#111827'
				}}>
				<Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
					{status === 'UPDATING' ? 'Updating...' : 'Checking for Update...'}
				</Text>
				{progress > 0 ? (
					<Text
						style={{
							color: 'white',
							fontSize: 18,
							marginTop: 10
						}}>{`${Math.round(progress * 100)}%`}</Text>
				) : null}
			</View>
		)
	})(RootLayout)
} else {
	// If the URL is missing, we export the unwrapped component.
	// This disables OTA but prevents the app from crashing.
	console.warn('EXPO_PUBLIC_HOT_UPDATER_URL is not defined. OTA updates are disabled.')
}

export default App
