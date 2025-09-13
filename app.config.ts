import 'dotenv/config'

export default {
	expo: {
		name: 'my-app',
		slug: 'my-app',
		version: '1.0.703',
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
					project: 'react-native',
					organization: 'hot-updater'
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
				projectId: 'da2a6561-c38c-4a8b-8bb8-516cd3e4f86c'
			}
		},
		// owner: 'phonepuffs',
		runtimeVersion: {
			policy: 'appVersion'
		},
		updates: {
			enabled: false
		}
	}
}
