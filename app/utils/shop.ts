export const money = (value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(value)
export const productImage = (id: string, width = 640) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`
