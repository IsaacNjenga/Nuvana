import type { Product } from '../../shared/products'

// Same-origin adapters only: the independent backend owns all product data.
async function backendRequest<T>(path: string): Promise<T> {
  const base = useRuntimeConfig().backendUrl.replace(/\/$/, '')
  try {
    return await $fetch<T>(`${base}/api/products${path}`, { timeout: 8000, retry: 0 }) as T
  } catch (error) {
    const status = (error as { response?: { status?: number } }).response?.status
    throw createError({
      statusCode: status === 404 ? 404 : 503,
      statusMessage: status === 404 ? 'Product not found' : 'The collection is temporarily unavailable. Please try again shortly.'
    })
  }
}

export const getProducts = () => backendRequest<Product[]>('')
export const getProduct = (slug: string) => backendRequest<Product>(`/${encodeURIComponent(slug)}`)
