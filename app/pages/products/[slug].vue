<script setup lang="ts">
definePageMeta({ key: (route) => route.params.slug as string });
const route = useRoute();
const { data: product, error } = await useFetch(
  `/api/products/${encodeURIComponent(String(route.params.slug))}`,
);
if (!product.value)
  throw createError({
    statusCode: error.value?.statusCode || 404,
    statusMessage:
      error.value?.statusCode === 503
        ? "The collection is temporarily unavailable"
        : "This little treasure could not be found",
  });
const item = product.value;
const quantity = ref(1);
const added = ref(false);
const { add } = useCart();
usePageSeo(
  item.name,
  item.description,
  `/products/${item.slug}`,
  productImage(item.image, 1200),
);
const base = useRuntimeConfig().public.siteUrl.replace(/\/$/, "");
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: item.name,
        image: [productImage(item.image, 1200)],
        description: item.description,
        sku: item.slug,
        brand: { "@type": "Brand", name: "Nuvana Glitter" },
        offers: {
          "@type": "Offer",
          url: `${base}/products/${item.slug}`,
          priceCurrency: "KES",
          price: item.price,
          availability:
            item.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      }).replace(/</g, "\\u003c"),
    },
  ],
});
</script>
<template>
  <div class="mx-auto max-w-7xl px-5 pt-7 sm:px-10">
    <nav aria-label="Breadcrumb" class="mb-8 flex gap-2 text-xs text-[#887970]">
      <NuxtLink to="/" class="hover:underline">The collection</NuxtLink
      ><span>/</span><span>{{ item.name }}</span>
    </nav>
    <div class="grid gap-9 md:grid-cols-2 lg:gap-20">
      <img
        :src="productImage(item.image, 960)"
        :srcset="`${productImage(item.image, 480)} 480w, ${productImage(item.image, 960)} 960w, ${productImage(item.image, 1400)} 1400w`"
        sizes="(max-width: 767px) 100vw, 50vw"
        :alt="item.alt"
        width="960"
        height="1120"
        fetchpriority="high"
        class="aspect-6/7 w-full bg-[#eee8df] object-cover"
      />
      <div class="py-3 lg:py-10">
        <p class="text-[10px] uppercase tracking-[0.22em] text-[#96744f]">
          {{ item.category }} · The everyday collection
        </p>
        <h1 class="mt-5 font-serif text-4xl leading-tight lg:text-5xl">
          {{ item.name }}
        </h1>
        <p class="mt-5 text-xl">{{ money(item.price) }}</p>
        <p class="mt-7 text-sm leading-7 text-[#756b6e]">
          {{ item.description }}
        </p>
        <p class="mt-6 text-xs text-[#756b6e]">
          {{
            item.stock > 0
              ? "● In stock, ready for your everyday"
              : "Currently sold out"
          }}
        </p>
        <div class="mt-7 flex gap-3">
          <label class="sr-only" for="quantity">Quantity</label
          ><select
            id="quantity"
            v-model="quantity"
            class="border border-[#d6c9bc] bg-transparent px-4 py-4"
          >
            <option v-for="n in Math.min(20, item.stock)" :key="n" :value="n">
              {{ n }}
            </option></select
          ><button
            class="flex-1 bg-[#452637] px-6 py-4 text-sm text-white transition hover:bg-[#613d50] disabled:opacity-40"
            :disabled="item.stock < 1"
            @click="
              add(item, quantity);
              added = true;
            "
          >
            {{
              added
                ? "Added to your bag ✓"
                : item.stock < 1
                  ? "Sold out"
                  : "Add to bag"
            }}
          </button>
        </div>
        <p v-if="added" role="status" class="mt-4 text-sm">
          A little sparkle, saved.
          <NuxtLink to="/cart" class="underline">View your bag →</NuxtLink>
        </p>
        <div class="mt-9 border-t border-[#dfd5cb]">
          <details open class="border-b border-[#dfd5cb] py-5">
            <summary class="text-sm">The finer details</summary>
            <p class="mt-3 text-sm leading-7 text-[#756b6e]">
              {{ item.material }}
            </p>
          </details>
          <details class="border-b border-[#dfd5cb] py-5">
            <summary class="text-sm">Keep your sparkle</summary>
            <p class="mt-3 text-sm leading-7 text-[#756b6e]">
              Store separately in a dry pouch. Keep away from water, perfume and
              lotions, and gently polish with a soft cloth.
            </p>
          </details>
          <details class="border-b border-[#dfd5cb] py-5">
            <summary class="text-sm">Delivery &amp; checkout</summary>
          </details>
        </div>
        <NuxtLink
          to="/"
          class="mt-7 inline-block text-xs underline underline-offset-4"
          >← Discover the rest of the collection</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
