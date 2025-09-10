import { createContext, type ReactNode, useCallback, useContext, useState } from 'react'

import { type AlertOptions } from '@/components/ui/molecule/AlertModal'

interface AlertContextType {
	showAlert: (options: AlertOptions) => void
	hideAlert: () => void
	isVisible: boolean
	options: AlertOptions | null
}

const AlertContext = createContext<AlertContextType | null>(null)

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }): React.JSX.Element => {
	const [isVisible, setIsVisible] = useState(false)
	const [options, setOptions] = useState<AlertOptions | null>(null)

	const showAlert = useCallback((newOptions: AlertOptions): void => {
		setOptions(newOptions)
		setIsVisible(true)
	}, [])

	const hideAlert = useCallback((): void => {
		setIsVisible(false)
	}, [])

	return (
		<AlertContext.Provider
			value={{
				showAlert,
				hideAlert,
				isVisible,
				options
			}}>
			{children}
		</AlertContext.Provider>
	)
}

export function useAlert(): AlertContextType {
	const context = useContext(AlertContext)
	if (!context) {
		throw new Error('useAlert must be used within an AlertProvider')
	}
	return context
}
