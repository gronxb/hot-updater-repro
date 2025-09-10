import { AntDesign } from '@expo/vector-icons'
import { Modal, Text, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import Button from '@/components/ui/atom/Button'

export interface AlertOptions {
	title: string
	message: string
	type?: 'success' | 'error'
}

interface AlertModalProps {
	isVisible: boolean
	options: AlertOptions | null
	onClose: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({ isVisible, options, onClose }): React.JSX.Element => {
	const { theme } = useUnistyles()

	if (!options) return <></>

	const isSuccess = options.type === 'success'
	const iconName = isSuccess ? 'checkcircle' : 'closecircle'
	const iconColor = isSuccess ? theme.colors.accents.grass : theme.colors.accents.apple

	return (
		<Modal
			visible={isVisible}
			transparent
			animationType='fade'>
			<View style={styles.backdrop}>
				<View style={styles.card}>
					<AntDesign
						name={iconName}
						size={48}
						color={iconColor}
					/>
					<Text style={styles.title}>{options.title}</Text>
					<Text style={styles.message}>{options.message}</Text>
					<Button
						title='OK'
						onPress={onClose}
						variant='primary'
						size='md'
						style={styles.button}
					/>
				</View>
			</View>
		</Modal>
	)
}

export default AlertModal

const styles = StyleSheet.create(theme => ({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.gap(4)
	},
	card: {
		width: '100%',
		maxWidth: 400,
		backgroundColor: theme.colors.foreground,
		borderRadius: 24,
		padding: theme.gap(3),
		alignItems: 'center',
		gap: theme.gap(2)
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: theme.colors.typography,
		textAlign: 'center'
	},
	message: {
		fontSize: 16,
		color: theme.colors.dimmed,
		textAlign: 'center'
	},
	button: {
		marginTop: theme.gap(1)
	}
}))
