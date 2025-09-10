import { forwardRef, type ReactNode } from 'react'
import { Text, TextInput, type TextInputProps, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export interface InputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
	readonly label?: string
	readonly error?: string
	readonly hint?: string
	readonly value: string
	readonly onChangeText: (text: string) => void
	readonly testID?: string
	// ✅ This new prop allows us to pass any component to be rendered on the right side.
	readonly rightAccessory?: ReactNode
}

const Input = forwardRef<TextInput, InputProps>(function Input(
	{ label, error, hint, testID, editable = true, rightAccessory, ...rest },
	ref
): React.JSX.Element {
	return (
		<View style={styles.wrapper}>
			{label ? <Text style={styles.label}>{label}</Text> : null}
			{/* ✅ The container now handles the border and layout */}
			<View style={[styles.container, !!error && styles.error]}>
				<TextInput
					ref={ref}
					testID={testID}
					style={styles.input}
					editable={editable}
					placeholderTextColor={styles.placeholder.color as string}
					{...rest}
				/>
				{/* ✅ Render the accessory here if it exists */}
				{rightAccessory}
			</View>
			{error ? (
				<Text style={styles.errorText}>{error}</Text>
			) : hint ? (
				<Text style={styles.hint}>{hint}</Text>
			) : null}
		</View>
	)
})

export default Input

const styles = StyleSheet.create(theme => ({
	wrapper: {
		width: '100%',
		gap: theme.gap(1)
	},
	label: {
		color: theme.colors.typography,
		fontWeight: '500',
		fontSize: 16,
		paddingLeft: theme.gap(0.5)
	},
	// ✅ This is the new container for the input field and accessory
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: theme.colors.dimmed,
		backgroundColor: theme.colors.foreground,
		paddingHorizontal: theme.gap(1.5)
	},
	// ✅ The TextInput itself is now simpler
	input: {
		flex: 1,
		height: 54, // Set a fixed height for consistency
		color: theme.colors.typography,
		fontSize: 16
	},
	placeholder: {
		color: theme.colors.dimmed
	},
	error: {
		borderColor: theme.colors.accents.apple
	},
	errorText: {
		color: theme.colors.accents.apple,
		fontSize: 12,
		paddingLeft: theme.gap(0.5)
	},
	hint: {
		color: theme.colors.dimmed,
		fontSize: 12,
		paddingLeft: theme.gap(0.5)
	},
	disabled: {
		opacity: 0.6
	}
}))
