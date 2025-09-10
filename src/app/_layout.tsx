import 'react-native-reanimated'

import { getUpdateSource, HotUpdater } from '@hot-updater/react-native'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import * as Sentry from '@sentry/react-native'
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

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,
	// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
	// We recommend adjusting this value in production.
	tracesSampleRate: 1.0,
	// profilesSampleRate is relative to tracesSampleRate.
	// Here, we'll capture profiles for 100% of transactions.
	profilesSampleRate: 1.0,
	// Record Session Replays for 10% of Sessions and 100% of Errors
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
	debug: true,
	integrations: [Sentry.mobileReplayIntegration()]
})

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
	Sentry.captureMessage('HotUpdater enabled for URL', {
		level: 'info',
		extra: {
			updaterUrl,
			bundleId
		}
	})
	App = HotUpdater.wrap({
		source: getUpdateSource(updaterUrl, {
			// We now know updaterUrl is a string
			updateStrategy: 'fingerprint'
		}),
		onProgress: progress => {
			Sentry.captureMessage('progress-ota-update-onProgress', {
				level: 'info',
				extra: {
					progress: progress
				}
			})
			console.log('Bundle downloading progress:', progress)
		},
		onError: (err: unknown) => {
			Sentry.captureMessage('progress-ota-update-onError', {
				level: 'error',
				extra: {
					err: err
				}
			})
			Sentry.captureException(err)
			console.log('HotUpdate Error: ', err)
		},
		onUpdateProcessCompleted: (response: unknown) => {
			Sentry.captureMessage('progress-ota-update-onUpdateProcessCompleted', {
				level: 'info',
				extra: {
					err: response
				}
			})
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

export default Sentry.wrap(App)
