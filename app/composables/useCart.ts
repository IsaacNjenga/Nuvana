import type { Product } from '../../shared/products'
export interface CartItem { product: Product; quantity: number }
export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])
  const ready = useState('cart-ready', () => false)
  const persist = () => { if (import.meta.client) { try { localStorage.setItem('nuvana-cart', JSON.stringify(items.value)) } catch { /* Bag remains available in memory. */ } } }
  function hydrate() {
    if (ready.value) return
    try {
      const saved = JSON.parse(localStorage.getItem('nuvana-cart') || '[]')
      if (Array.isArray(saved)) items.value = saved.filter(item => item?.product && typeof item.product.slug === 'string' && typeof item.product.name === 'string' && Number.isFinite(item.product.price) && item.product.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20)
    } catch { items.value = [] }
    ready.value = true
  }
  function add(product: Product, quantity = 1) {
    hydrate()
    if (product.stock < 1) return
    const existing = items.value.find(item => item.product.slug === product.slug)
    const limit = Math.min(20, product.stock)
    if (existing) existing.quantity = Math.min(limit, existing.quantity + quantity)
    else items.value.push({ product, quantity: Math.min(limit, quantity) })
    persist()
  }
  function update(slug: string, quantity: number) {
    const item = items.value.find(row => row.product.slug === slug)
    if (!item) return
    if (quantity <= 0) items.value = items.value.filter(row => row.product.slug !== slug)
    else item.quantity = Math.min(quantity, 20, item.product.stock)
    persist()
  }
  function clear() { items.value = []; persist() }
  return { items, ready, hydrate, add, update, clear, count: computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0)), total: computed(() => items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)) }
}
