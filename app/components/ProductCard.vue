<script setup lang="ts">
import type { Product } from '../../shared/products'
defineProps<{ product: Product; priority?: boolean }>()
const { add } = useCart()
const added = ref(false)
let timer: ReturnType<typeof setTimeout>
function addToBag(product: Product) { add(product); added.value = true; clearTimeout(timer); timer = setTimeout(() => added.value = false, 1800) }
onBeforeUnmount(() => clearTimeout(timer))
</script>
<template>
  <article class="group min-w-0">
    <div class="relative overflow-hidden rounded-sm bg-[#eee8df]">
      <NuxtLink :to="`/products/${product.slug}`" class="block overflow-hidden"><img :src="productImage(product.image)" :srcset="`${productImage(product.image, 320)} 320w, ${productImage(product.image, 640)} 640w, ${productImage(product.image, 960)} 960w`" sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw" :alt="product.alt" width="640" height="800" :loading="priority ? 'eager' : 'lazy'" decoding="async" class="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></NuxtLink>
      <span v-if="product.badge" class="absolute left-3 top-3 bg-[#faf8f4]/95 px-2.5 py-1.5 text-[9px] uppercase tracking-widest">{{ product.badge }}</span>
      <button :disabled="product.stock < 1" :aria-label="`Add ${product.name} to bag`" class="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf8f4] text-xl shadow-sm transition hover:bg-[#452637] hover:text-white disabled:opacity-40" @click="addToBag(product)">{{ added ? '✓' : '+' }}</button>
    </div>
    <div class="pt-4"><p class="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#857774]">{{ product.category }}</p><NuxtLink :to="`/products/${product.slug}`" class="font-serif text-base sm:text-lg">{{ product.name }}</NuxtLink><p class="mt-1.5 text-xs text-[#75645e] sm:text-sm">{{ money(product.price) }}</p><span class="sr-only" role="status">{{ added ? `${product.name} added to bag` : '' }}</span></div>
  </article>
</template>
