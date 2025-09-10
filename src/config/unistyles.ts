import { StyleSheet } from 'react-native-unistyles'

const sharedTheme = {
	spacing: {
		xxs: 2,
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		xl: 24,
		xl2: 32,
		xl3: 48,
		xl4: 64
	},
	fontSizes: {
		xs: 12,
		caption: 12,
		sm: 14,
		md: 16,
		normal: 16,
		lg: 18,
		xl: 20,
		xl2: 24,
		xl3: 30,
		xl4: 36
	},
	fontWeights: {
		regular: '400',
		medium: '500',
		semiBold: '600',
		bold: '700'
	},
	lineHeights: {
		none: 1,
		tight: 1.05,
		normal: 1.2,
		relaxed: 1.6
	},
	letterSpacings: {
		tight: -0.5,
		wide: 0.75
	},
	radii: {
		sm: 8,
		md: 9,
		lg: 11
	},
	shadows: {
		main: {
			// For iOS
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 8
			},
			shadowOpacity: 0.075,
			shadowRadius: 16,
			// For Android
			elevation: 8
		}
	}
} as const

const lightTheme = {
	...sharedTheme,
	colors: {
		// Main background - a very light, clean grey
		background: '#F6F6F6',
		// Card and element background - pure white for a subtle layered effect
		foreground: '#FFFFFF',
		// Main text color - high contrast black
		typography: '#000000',
		// Borders and less important text - the muted seafoam green
		dimmed: '#A2D5C6',
		// The primary accent color - the main seafoam green
		tint: '#A2D5C6',
		// Active/focused elements - high contrast black
		activeTint: '#000000',
		// Link color - consistent with the main accent
		link: '#A2D5C6',
		glow: '#CFFFE2',
		grid: 'rgba(0, 0, 0, 0.05)',
		accents: {
			banana: '#F6E58D',
			pumpkin: '#FFBE76',
			apple: '#FF7979',
			grass: '#BADC58',
			storm: '#686DE0'
		}
	},
	gap: (v: number) => v * 8
} as const

const darkTheme = {
	...sharedTheme,
	colors: {
		background: '#111827',
		foreground: '#1f2937',
		typography: '#FFFFFF',
		dimmed: '#9ca3af',
		tint: '#C9AD92',
		activeTint: '#FFFFFF',
		link: '#0C2461',
		glow: '#EC4899', // Fuchsia,
		grid: 'rgba(200, 200, 200, 0.05)',
		accents: {
			banana: '#f9CA24',
			pumpkin: '#F0932B',
			apple: '#EB4D4B',
			grass: '#6AB04C',
			storm: '#4834D4'
		}
	},
	gap: (v: number) => v * 8
} as const

const themes = {
	light: lightTheme,
	dark: darkTheme
}

const breakpoints = {
	xs: 0,
	sm: 300,
	md: 500,
	lg: 800,
	xl: 1200
}

type Breakpoints = typeof breakpoints
type Themes = typeof themes

declare module 'react-native-unistyles' {
	export interface UnistylesThemes extends Themes {}
	export interface UnistylesBreakpoints extends Breakpoints {}
}

StyleSheet.configure({
	settings: {
		adaptiveThemes: true
	},
	themes,
	breakpoints
})
