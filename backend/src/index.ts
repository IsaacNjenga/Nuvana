import { connectToDB } from "./config/db";
import { env } from "./config/env";
import app from "./app";

const PORT = parseInt(env.PORT) || 3001;

async function startServer() {
  if (env.DEMO_MODE) {
    console.log('Demo mode: serving the backend sample catalogue.');
  } else {
    if (!env.URI) throw new Error('Set URI in backend/.env, or set DEMO_MODE=true for a sample preview.');
    await connectToDB();
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at PORT: ${PORT}`);
  });
}

startServer().catch(() => {
  console.error('Backend startup failed. Check URI, MongoDB availability and backend/.env configuration.');
  process.exitCode = 1;
});
