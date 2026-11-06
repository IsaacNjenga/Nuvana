import { MongoClient } from 'mongodb'
import { seedProducts } from '../shared/products.ts'
const uri = process.env.NUXT_MONGODB_URI
if (!uri) throw new Error('Set NUXT_MONGODB_URI in frontend/.env before seeding.')
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 })
try {
  await client.connect()
  const products = client.db(process.env.NUXT_MONGODB_DATABASE || 'nuvana').collection('products')
  await products.createIndex({ slug: 1 }, { unique: true })
  for (const product of seedProducts) await products.updateOne({ slug: product.slug }, { $setOnInsert: product }, { upsert: true })
  console.log(`Seeded ${seedProducts.length} products (existing products preserved).`)
} finally { await client.close() }
