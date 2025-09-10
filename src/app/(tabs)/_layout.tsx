// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'

const TabsLayout: React.FC = (): React.JSX.Element => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			{/* Each file under (tabs)/ becomes a tab. You already have index.tsx */}
			<Tabs.Screen
				name='index'
				options={{ title: 'Home' }}
			/>
			{/* Example extra tabs: */}
			{/* <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} /> */}
			{/* <Tabs.Screen name="profile" options={{ title: 'Profile' }} /> */}
		</Tabs>
	)
}

export default TabsLayout
