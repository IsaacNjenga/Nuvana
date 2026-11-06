import { Router } from 'express';
import { env } from '../config/env';
import { seedProducts } from '../data/products';
import { ProductModel } from './model';

export const productRouter = Router();
const fields = { _id: 0, slug: 1, name: 1, category: 1, price: 1, image: 1, alt: 1, description: 1, material: 1, badge: 1, stock: 1 };

productRouter.get('/', async (_req, res) => {
  const products = env.DEMO_MODE
    ? [...seedProducts].sort((a, b) => a.name.localeCompare(b.name))
    : await ProductModel.find({}, fields).sort({ name: 1 }).limit(200).lean().exec();
  res.json(products);
});

productRouter.get('/:slug', async (req, res) => {
  const slug = String(req.params.slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  const product = env.DEMO_MODE
    ? seedProducts.find(item => item.slug === slug)
    : await ProductModel.findOne({ slug }, fields).lean().exec();
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
});
