import { useRef } from 'react'
import { type NativeSyntheticEvent, TextInput, type TextInputKeyPressEventData, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

interface OtpFieldProps {
	readonly value: string
	readonly onChange: (val: string) => void
	readonly length?: number // Default is 6
	readonly testID?: string
}

const OtpField: React.FC<OtpFieldProps> = ({ value, onChange, length = 6, testID }): React.JSX.Element => {
	const inputs = Array.from({ length })
	const refs = useRef<(TextInput | null)[]>([])

	const handleChange = (text: string, index: number): void => {
		const newOtp = value.split('')
		newOtp[index] = text
		const nextOtp = newOtp.join('').slice(0, length)

		onChange(nextOtp)

		if (text && index < length - 1) {
			refs.current[index + 1]?.focus()
		}
	}

	const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number): void => {
		if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
			refs.current[index - 1]?.focus()
		}
	}

	return (
		<View
			style={styles.row}
			testID={testID}>
			{inputs.map((_, index) => (
				<TextInput
					key={index}
					ref={el => {
						refs.current[index] = el
					}}
					style={styles.box}
					keyboardType='number-pad'
					textAlign='center'
					maxLength={1}
					value={value[index] ?? ''}
					onChangeText={text => handleChange(text, index)}
					onKeyPress={e => handleKeyPress(e, index)}
					accessible
					accessibilityLabel={`OTP digit ${index + 1}`}
				/>
			))}
		</View>
	)
}

export default OtpField

const styles = StyleSheet.create(theme => ({
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: theme.gap(1.5)
	},
	box: {
		width: 48,
		height: 54,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: theme.colors.dimmed,
		backgroundColor: theme.colors.foreground,
		color: theme.colors.typography,
		fontSize: 20,
		fontWeight: '600'
	}
}))
