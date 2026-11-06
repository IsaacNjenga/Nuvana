import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import { ref, computed } from 'vue'
import { seedProducts } from '../shared/products.ts'

const source = (await readFile(new URL('../app/composables/useCart.ts', import.meta.url), 'utf8')).replace(/^import type .*$/m, '').replaceAll('import.meta.client', 'true')
const { useCart } = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`)
globalThis.computed = computed
function setup(saved = '[]', broken = false) {
  const state = new Map()
  const storage = new Map([['nuvana-cart', saved]])
  globalThis.useState = (key, init) => { if (!state.has(key)) state.set(key, ref(init())); return state.get(key) }
  globalThis.localStorage = { getItem: key => { if (broken) throw Error('Blocked'); return storage.get(key) }, setItem: (key, value) => { if (broken) throw Error('Blocked'); storage.set(key, value) } }
  return { cart: useCart(), storage }
}
test('cart merges additions, caps stock, computes totals and persists removal', () => {
  const { cart, storage } = setup()
  const product = { ...seedProducts[0], stock: 3 }
  cart.add(product, 2); cart.add(product, 2)
  assert.equal(cart.items.value.length, 1)
  assert.equal(cart.count.value, 3)
  assert.equal(cart.total.value, product.price * 3)
  cart.update(product.slug, 1)
  assert.equal(cart.total.value, product.price)
  cart.update(product.slug, 0)
  assert.equal(cart.count.value, 0)
  assert.deepEqual(JSON.parse(storage.get('nuvana-cart')), [])
})
test('cart restores valid storage, ignores invalid entries, and clears checkout bag', () => {
  const saved = JSON.stringify([{ product: seedProducts[1], quantity: 2 }, { product: seedProducts[0], quantity: -1 }, { bad: true }])
  const { cart } = setup(saved)
  cart.hydrate(); cart.hydrate()
  assert.equal(cart.count.value, 2)
  cart.clear()
  assert.equal(cart.total.value, 0)
})
test('cart tolerates blocked and malformed storage and rejects sold-out products', () => {
  for (const [saved, broken] of [['not JSON', false], ['[]', true]]) {
    const { cart } = setup(saved, broken)
    cart.add({ ...seedProducts[0], stock: 0 })
    assert.equal(cart.count.value, 0)
    cart.add(seedProducts[1])
    assert.equal(cart.count.value, 1)
  }
})
