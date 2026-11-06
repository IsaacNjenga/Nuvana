export default defineEventHandler(async event => {
  const product = (await getProducts()).find(item => item.slug === getRouterParam(event, 'slug'))
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return product
})
