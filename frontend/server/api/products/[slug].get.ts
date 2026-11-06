export default defineEventHandler(async event => {
  return getProduct(getRouterParam(event, 'slug') || '')
})
