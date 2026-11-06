import mongoose from "mongoose";
import { env } from "./env";

const uri = env.URI || "";

export async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      dbName: env.MONGODB_DATABASE,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true,
    });

    const database = mongoose.connection.db;
    if (!database) {
      throw new Error("Database connection is not available");
    }

    console.log("Database connected");
  } catch (error) {
    throw new Error('Database connection failed. Check URI and MongoDB availability.');
  }
}
