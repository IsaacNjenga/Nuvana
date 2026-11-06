import { z } from "zod";
import dotenv from "dotenv";

// Load the .env file into process.env
dotenv.config();

const envSchema = z.object({
  URI: z.string().default(''),
  MONGODB_DATABASE: z.string().default('nuvana'),
  DEMO_MODE: z.enum(['true', 'false']).default('false').transform(value => value === 'true'),
  PORT: z.string().default("3001"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  JWT_SECRET: z.string().optional(),
  REDIS_URL: z.string().optional(),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

export const env = envSchema.parse(process.env);
