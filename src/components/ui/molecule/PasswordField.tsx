import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'

import Input, { type InputProps } from '@/components/ui/atom/Input'

type PasswordFieldProps = Omit<InputProps, 'secureTextEntry' | 'rightAccessory'>

const PasswordField: React.FC<PasswordFieldProps> = props => {
	const { theme } = useUnistyles()
	const [visible, setVisible] = useState<boolean>(false)

	const toggleVisibility = (): void => {
		setVisible(prev => !prev)
	}

	return (
		<Input
			{...props}
			secureTextEntry={!visible}
			rightAccessory={
				<Pressable onPress={toggleVisibility}>
					<Feather
						name={visible ? 'eye' : 'eye-off'}
						size={20}
						color={theme.colors.dimmed}
					/>
				</Pressable>
			}
		/>
	)
}

export default PasswordField
