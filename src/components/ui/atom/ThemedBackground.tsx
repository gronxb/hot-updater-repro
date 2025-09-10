import { View } from 'react-native'
import { Circle, Defs, Path, Pattern, RadialGradient, Rect, Stop, Svg } from 'react-native-svg'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

const ThemedBackground: React.FC = (): React.JSX.Element => {
	const { theme } = useUnistyles()

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<Svg
				width='100%'
				height='100%'>
				<Defs>
					{/* This is the radial gradient for the glow effect */}
					<RadialGradient id='grad'>
						<Stop
							offset='0'
							stopColor={theme.colors.glow}
							stopOpacity='1'
						/>
						<Stop
							offset='1'
							stopColor={theme.colors.glow}
							stopOpacity='0'
						/>
					</RadialGradient>

					{/* ✅ NEW: This defines the repeating grid pattern */}
					<Pattern
						id='gridPattern'
						width={14}
						height={24}
						patternUnits='userSpaceOnUse'>
						{/* Draws the faint vertical line of the grid */}
						<Path
							d='M 1 0 V 24'
							stroke={theme.colors.grid}
							strokeWidth='.4'
						/>
						{/* Draws the faint horizontal line of the grid */}
						<Path
							d='M 0 1 H 14'
							stroke={theme.colors.grid}
							strokeWidth='.4'
						/>
					</Pattern>
				</Defs>

				{/* Layer 1: The solid background color */}
				<Rect
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill={theme.colors.background}
				/>

				{/* ✅ NEW: Layer 2: A rectangle filled with our repeating grid pattern */}
				<Rect
					x='0'
					y='0'
					width='100%'
					height='100%'
					fill='url(#gridPattern)'
				/>

				{/* Layer 3: The glow effect, drawn on top of the grid */}
				<Circle
					cx='50%'
					cy='-5%'
					r='50%'
					fill='url(#grad)'
				/>
			</Svg>
		</View>
	)
}

export default ThemedBackground
