export interface Product {
  slug: string
  name: string
  category: string
  price: number
  image: string
  alt: string
  description: string
  material: string
  badge?: string
  stock: number
}
export const seedProducts: Product[] = [
  { slug: 'solstice-gold-hoops', name: 'Solstice Gold Hoops', category: 'Earrings', price: 2400, image: 'photo-1535632066927-ab7c9ab60908', alt: 'A pair of polished gold hoop earrings', description: 'Your everyday golden hour. A softly rounded pair of hoops with just the right amount of presence, made to take you from a quiet morning to an evening out.', material: '18k gold-plated stainless steel · hinged closure · 22 mm', badge: 'Bestseller', stock: 20 },
  { slug: 'celeste-pendant-necklace', name: 'Celeste Pendant Necklace', category: 'Necklaces', price: 3200, image: 'photo-1599643477877-530eb83abc8e', alt: 'Delicate gold necklace with a pendant', description: 'A little light, close to your heart. This delicate pendant catches the light beautifully, worn on its own or layered with your favourite chains.', material: '18k gold-plated brass · 40 cm chain with 5 cm extender', badge: 'New arrival', stock: 16 },
  { slug: 'aura-stacking-ring', name: 'Aura Stacking Ring', category: 'Rings', price: 1800, image: 'photo-1605100804763-247f67b3557e', alt: 'Fine gold ring with a sparkling stone', description: 'A small detail with a beautiful effect. A delicate, adjustable ring designed for mixing, matching, and making entirely your own.', material: 'Gold-plated sterling silver · adjustable band · cubic zirconia', stock: 12 },
  { slug: 'golden-hour-bracelet', name: 'Golden Hour Bracelet', category: 'Bracelets', price: 2800, image: 'photo-1611591437281-460bfbe1220a', alt: 'Elegant gold bracelet with delicate detailing', description: 'Sunshine for your wrist. A refined bracelet that brings a warm glimmer to every gesture, with an adjustable fastening for a comfortable fit.', material: '18k gold-plated stainless steel · 16–20 cm adjustable length', badge: 'Bestseller', stock: 15 },
  { slug: 'luna-pearl-earrings', name: 'Luna Pearl Earrings', category: 'Earrings', price: 2600, image: 'photo-1630019852942-f89202989a4d', alt: 'Gold earrings with delicate pearl details', description: 'A modern love letter to the pearl. Gentle curves and luminous details make these earrings an effortless finishing touch.', material: 'Gold-plated brass · freshwater pearls · butterfly backs', stock: 8 },
  { slug: 'muse-layered-necklace', name: 'Muse Layered Necklace', category: 'Necklaces', price: 3600, image: 'photo-1611652022419-a9419f74343d', alt: 'Layered gold chains and pendants', description: 'The art of layering, already perfected. Two complementary chains create a quietly expressive look you can wear every day.', material: '18k gold-plated stainless steel · 38 cm and 45 cm chains', badge: 'New arrival', stock: 10 },
  { slug: 'evermore-ring', name: 'Evermore Ring', category: 'Rings', price: 2200, image: 'photo-1603561591411-07134e71a2a9', alt: 'Gold ring with a delicate decorative setting', description: 'An everyday keepsake. An elegant ring with a subtle sparkle, created for the moments you want to hold onto.', material: 'Gold-plated sterling silver · adjustable band', stock: 7 },
  { slug: 'serene-chain-bracelet', name: 'Serene Chain Bracelet', category: 'Bracelets', price: 2100, image: 'photo-1573408301185-9146fe634ad0', alt: 'Fine gold chain jewellery with polished links', description: 'Simple, considered, endlessly wearable. This fine chain bracelet feels as good with a white tee as it does with your favourite dress.', material: '18k gold-plated brass · 16 cm with 4 cm extender', stock: 18 }
]

