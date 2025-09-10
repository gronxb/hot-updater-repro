import 'dotenv/config'

export default {
	expo: {
		name: 'gym-app',
		slug: 'gym-app',
		version: '1.0.699',
		orientation: 'portrait',
		icon: './src/assets/images/icon.png',
		scheme: 'gymapp',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.ajay.test'
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './src/assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff'
			},
			edgeToEdgeEnabled: true,
			package: 'com.ajay.test'
		},
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './src/assets/images/favicon.png'
		},
		plugins: [
			[
				'@sentry/react-native/expo',
				{
					url: 'https://sentry.io/',
					project: 'YOUR_PROJECT_SLUG',
					organization: 'YOUR_ORGNIZATION_SLUG'
				}
			],
			'expo-router',
			'expo-dev-client',
			[
				'expo-splash-screen',
				{
					image: './src/assets/images/splash-icon.png',
					imageWidth: 200,
					resizeMode: 'contain',
					backgroundColor: '#ffffff'
				}
			],
			'react-native-edge-to-edge',
			[
				'@hot-updater/react-native',
				{
					channel: 'preview'
				}
			]
		],
		experiments: {
			typedRoutes: true
		},
		extra: {
			router: {},
			eas: {
				// TODO: PLEASE ADD YOUR
				projectId: 'xyz'
			}
		},
		// owner: 'phonepuffs',
		runtimeVersion: {
			policy: 'appVersion'
		},
		updates: {
			enabled: true,
			// TODO: PLEASE ADD YOUR
			url: 'https://u.expo.dev/xyz'
		}
	}
}
