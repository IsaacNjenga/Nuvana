import mongoose from 'mongoose';
import { connectToDB } from '../config/db';
import { env } from '../config/env';
import { seedProducts } from '../data/products';
import { ProductModel } from '../products/model';

async function seed() {
  if (!env.URI) throw new Error('Set URI in backend/.env before seeding.');
  try {
    await connectToDB();
    await ProductModel.createIndexes();
    for (const product of seedProducts) {
      await ProductModel.updateOne({ slug: product.slug }, { $setOnInsert: product }, { upsert: true, runValidators: true });
    }
    console.log(`Seeded ${seedProducts.length} products (existing products preserved).`);
  } finally {
    await mongoose.disconnect();
  }
}
seed().catch(() => {
  console.error('Seeding failed. Check URI, database access and product validation.');
  process.exitCode = 1;
});
