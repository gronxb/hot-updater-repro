import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type NotFoundProps = object

const NotFound: React.FC<NotFoundProps> = () => {
	return (
		<View style={styles.container}>
			<Text>NotFound</Text>
		</View>
	)
}

export default NotFound

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})
