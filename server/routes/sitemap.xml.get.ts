export default defineEventHandler(async event => {
  const base = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const products = await getProducts()
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...products.map(p => `/products/${encodeURIComponent(p.slug)}`)].map(path => `<url><loc>${escape(`${base}${path}`)}</loc></url>`).join('')}</urlset>`
})
