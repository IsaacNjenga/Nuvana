import { MongoClient } from 'mongodb'
import { seedProducts, type Product } from '../../shared/products'
let connection: Promise<MongoClient> | undefined
export async function getProducts(): Promise<Product[]> {
  const config = useRuntimeConfig()
  if (!config.mongodbUri) {
    if (config.demoMode === true || String(config.demoMode) === 'true') return seedProducts
    throw createError({ statusCode: 503, statusMessage: 'Catalogue unavailable. Configure MongoDB or enable demo mode.' })
  }
  try {
    connection ??= new MongoClient(config.mongodbUri, { serverSelectionTimeoutMS: 5000 }).connect().catch(error => { connection = undefined; throw error })
    const client = await connection
    return await client.db(config.mongodbDatabase).collection<Product>('products').find({}, { projection: { _id: 0 } }).sort({ name: 1 }).limit(200).toArray()
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'The collection is temporarily unavailable. Please try again shortly.' })
  }
}
