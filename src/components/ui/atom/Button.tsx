import type { ReactNode } from 'react'
import type { PressableProps, PressableStateCallbackType, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

// export type ButtonProps = Omit<PressableProps, 'style' | 'children'> &
// 	UnistylesVariants<typeof styles> & {
// 		readonly title?: string
// 		readonly loading?: boolean
// 		readonly textStyle?: StyleProp<TextStyle>
// 		readonly style?: StyleProp<ViewStyle>
// 		readonly leftIcon?: ReactNode
// 		readonly rightIcon?: ReactNode
// 		readonly children?: ReactNode
// 		readonly size?: 'sm' | 'md' | 'lg'
// 	}

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
	readonly title?: string
	readonly loading?: boolean
	readonly variant?: 'primary' | 'secondary' | 'link'
	readonly size?: 'sm' | 'md' | 'lg'
	readonly style?: StyleProp<ViewStyle>
	readonly textStyle?: StyleProp<TextStyle>
	readonly leftIcon?: ReactNode
	readonly rightIcon?: ReactNode
	readonly children?: ReactNode // Redefine children here
}

const Button: React.FC<ButtonProps> = ({
	title,
	children,
	disabled,
	loading,
	variant = 'primary',
	size = 'md',
	style,
	textStyle,
	onPress,
	leftIcon,
	rightIcon,
	...rest
}): React.JSX.Element => {
	styles.useVariants({ variant, size })

	const content = children ?? <Text style={[styles.text, textStyle]}>{title}</Text>

	return (
		<Pressable
			accessibilityRole='button'
			accessibilityState={{ disabled: disabled || loading }}
			disabled={disabled || loading}
			onPress={onPress}
			style={state => [styles.container, styles.pressedOrDisabled(state, disabled || loading), style]}
			{...rest}>
			{leftIcon}
			{loading ? <ActivityIndicator color={styles.text.color as string} /> : content}
			{rightIcon}
		</Pressable>
	)
}

export default Button

const styles = StyleSheet.create(theme => ({
	container: {
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: theme.gap(1),
		borderWidth: 1,
		width: '100%',

		// ✅ ALL variants are now consolidated here for reliable type inference.
		variants: {
			variant: {
				primary: {
					backgroundColor: theme.colors.tint,
					borderColor: theme.colors.tint
				},
				secondary: {
					backgroundColor: theme.colors.foreground,
					borderColor: theme.colors.dimmed
				},
				link: {
					backgroundColor: 'transparent',
					borderColor: 'transparent'
				}
			},
			size: {
				sm: {
					paddingVertical: theme.gap(1),
					paddingHorizontal: theme.gap(1.5)
				},
				md: {
					paddingVertical: theme.gap(1.5),
					paddingHorizontal: theme.gap(2)
				},
				lg: {
					paddingVertical: theme.gap(2),
					paddingHorizontal: theme.gap(2.5)
				}
			}
		}
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		// This text style will also react to the 'variant' selection from useVariants
		variants: {
			variant: {
				primary: {
					color: theme.colors.background
				},
				secondary: {
					color: theme.colors.typography
				},
				link: {
					color: theme.colors.link
				}
			}
		}
	},
	pressedOrDisabled: (
		state: PressableStateCallbackType,
		isDisabledOrLoading: boolean | undefined
	): {
		opacity: number
	} => ({
		opacity: isDisabledOrLoading ? 0.5 : state.pressed ? 0.9 : 1
	})
}))
