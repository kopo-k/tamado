import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  YOUTUBE_API_KEY: z.string().optional(),
  TWITCH_CLIENT_ID: z.string().optional(),
  TWITCH_CLIENT_SECRET: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format())
  process.exit(1)
}

export const env = parsed.data
