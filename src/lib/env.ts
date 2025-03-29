import { z } from 'zod';

const envSchema = z.object({
  X_APP_KEY: z.string(),
  X_APP_SECRET: z.string(),
  X_ACCESS_TOKEN: z.string(),
  X_ACCESS_SECRET: z.string(),
  X_ENABLED: z.string().transform((val) => val.toLowerCase() === 'true'),
  CRON_SCHEDULE: z.string(),
  MONGO_URI: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
