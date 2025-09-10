// import { z } from 'zod'

// enum NodeEnv {
// 	Local = 'local',
// 	Development = 'development',
// 	Staging = 'staging',
// 	Production = 'production'
// }

// const nodeEnvValues = [NodeEnv.Development, NodeEnv.Staging, NodeEnv.Production] as const

// const envSchema = z.object({
// 	EXPO_PUBLIC_NODE_ENV: z.enum(nodeEnvValues).default(NodeEnv.Development),
// 	EXPO_PUBLIC_APP_CONTEXT: z.string().optional(),
// 	EXPO_PUBLIC_HOT_UPDATER_URL: z.string()
// })

// const parsedEnv = envSchema.safeParse(process.env)

// if (!parsedEnv.success) {
// 	console.error('❌ Invalid environment variables:', z.treeifyError(parsedEnv.error).properties)
// 	throw new Error('Invalid environment variables. Application cannot start.')
// }

// export type EnvVars = z.infer<typeof envSchema>

// export const env: EnvVars = parsedEnv.data

// export const isLocal: boolean = env.EXPO_PUBLIC_APP_CONTEXT === NodeEnv.Local
// export const isDev: boolean = env.EXPO_PUBLIC_NODE_ENV === NodeEnv.Development
// export const isDevelopment: boolean = isLocal || isDev
// export const isStaging: boolean = env.EXPO_PUBLIC_NODE_ENV === NodeEnv.Staging
// export const isProduction: boolean = env.EXPO_PUBLIC_NODE_ENV === NodeEnv.Production
