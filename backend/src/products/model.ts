import mongoose from 'mongoose';
import type { Product } from '../data/products';

const productSchema = new mongoose.Schema<Product>({
  slug: { type: String, required: true, unique: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: true },
  material: { type: String, required: true },
  badge: String,
  stock: { type: Number, required: true, min: 0, validate: Number.isInteger }
}, { collection: 'products', versionKey: false, bufferCommands: false, autoIndex: false, autoCreate: false });

export const ProductModel = mongoose.model<Product>('Product', productSchema);
