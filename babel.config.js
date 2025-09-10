module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'react-native-unistyles/plugin',
				{
					// This points to your app folder where screens live
					root: 'src/app'
				}
			],
			'hot-updater/babel-plugin',
			// This plugin must be listed last
			['react-native-reanimated/plugin']
		]
	}
}
