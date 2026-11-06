const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
process.env.DEMO_MODE = 'true';
process.env.URI = '';
const app = require('../dist/app').default;
const { ProductModel } = require('../dist/products/model');
const { seedProducts } = require('../dist/data/products');
let server;
let base;
before(async () => {
  server = await new Promise(resolve => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise(resolve => server.close(resolve)); });

test('standalone API serves catalogue and individual products without database internals', async () => {
  const response = await fetch(`${base}/api/products`);
  assert.equal(response.status, 200);
  const products = await response.json();
  assert.equal(products.length, 8);
  for (const product of products) {
    assert.equal(product._id, undefined);
    const detail = await fetch(`${base}/api/products/${product.slug}`);
    assert.equal(detail.status, 200);
    assert.deepEqual(await detail.json(), product);
  }
  const health = await (await fetch(`${base}/health`)).json();
  assert.equal(health.mode, 'demo');
});
test('unknown products, malformed slugs and endpoints return 404', async () => {
  for (const path of ['/api/products/does-not-exist', '/api/products/%24where', '/unknown']) {
    assert.equal((await fetch(`${base}${path}`)).status, 404);
  }
});
test('sample products satisfy the MongoDB schema and invalid stock is rejected', async () => {
  for (const product of seedProducts) await new ProductModel(product).validate();
  await assert.rejects(new ProductModel({ ...seedProducts[0], stock: -1 }).validate());
  await assert.rejects(new ProductModel({ ...seedProducts[0], stock: 1.5 }).validate());
});
