import express from "express";
import cors from "cors";

import { productRouter } from "./products/routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import { env } from "./config/env";

const app = express();
app.disable('x-powered-by');

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/$/, "");
const allowedOrigins = [
  ...env.FRONTEND_URL.split(","),
]
  .map(normalizeOrigin)
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.get('/health', (_req, res) => res.json({ service: 'Nuvana Glitter API', mode: env.DEMO_MODE ? 'demo' : 'mongodb' }));
app.use('/api/products', productRouter);
app.use((_req, res) => res.status(404).json({ message: 'Endpoint not found' }));
app.use(globalErrorHandler);

export default app;

