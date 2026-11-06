<script setup lang="ts">
const {
  data: products,
  error,
  refresh,
  status,
} = await useFetch("/api/products");
const category = ref("All jewellery");
const search = ref("");
const sort = ref("featured");
const categories = [
  "All jewellery",
  "Necklaces",
  "Earrings",
  "Rings",
  "Bracelets",
];
const filtered = computed(() => {
  let list = (products.value || []).filter(
    (p) =>
      (category.value === "All jewellery" || p.category === category.value) &&
      `${p.name} ${p.category}`
        .toLowerCase()
        .includes(search.value.toLowerCase()),
  );
  if (sort.value === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort.value === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort.value === "name")
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
});
usePageSeo(
  "Everyday Jewellery, Extraordinary You",
  "Discover Nuvana Glitter: thoughtfully chosen necklaces, earrings, rings and bracelets. Find a little everyday luxury, with jewellery that feels like you.",
  "/",
);
</script>
<template>
  <section class="mx-auto grid max-w-7xl md:grid-cols-2">
    <div
      class="flex flex-col justify-center bg-[#eee7df] px-6 py-14 sm:px-10 sm:py-20 lg:px-16"
    >
      <p class="mb-6 text-[10px] uppercase tracking-[0.25em] text-[#866944]">
        The everyday collection · Nuvana Glitter
      </p>
      <h1
        class="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
      >
        Small details.<br /><span class="italic text-[#80604e]">Endless</span
        ><br />possibilities.
      </h1>
      <p class="mt-6 max-w-xs text-sm leading-7 text-[#75655e]">
        Jewellery for the moments that make you, you. Discover your next
        everyday favourite.
      </p>
      <a
        href="#collection"
        class="mt-8 flex w-fit items-center gap-8 bg-[#452637] px-6 py-4 text-xs tracking-wide text-white transition hover:bg-[#613d50]"
        >Find your sparkle <span aria-hidden="true">↗</span></a
      >
      <p class="mt-9 text-[10px] tracking-wider text-[#86756a]">
        THOUGHTFULLY CHOSEN. BEAUTIFULLY YOU.
      </p>
    </div>
    <div
      class="relative h-90 overflow-hidden bg-[#d2bd9f] md:h-auto md:min-h-135"
    >
      <img
        :src="productImage('photo-1611652022419-a9419f74343d', 1200)"
        :srcset="`${productImage('photo-1611652022419-a9419f74343d', 640)} 640w, ${productImage('photo-1611652022419-a9419f74343d', 1200)} 1200w`"
        sizes="(max-width: 767px) 100vw, 50vw"
        alt="Golden necklaces and delicate jewellery, thoughtfully arranged"
        width="1200"
        height="1200"
        fetchpriority="high"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white [text-shadow:0_1px_8px_#352c30]"
      >
        <span class="font-serif text-2xl italic">Your kind of golden.</span
        ><span class="text-3xl">✧</span>
      </div>
    </div>
  </section>
  <div class="border-y border-[#e5dcd3]">
    <div
      class="mx-auto grid max-w-7xl grid-cols-3 gap-3 px-5 py-5 text-center text-[9px] tracking-wider text-[#786b63] sm:text-xs"
    >
      <span>✧ &nbsp; Everyday elegance</span
      ><span>♡ &nbsp; Chosen with care</span
      ><span>◇ &nbsp; A personal touch</span>
    </div>
  </div>
  <section
    id="collection"
    class="mx-auto max-w-7xl scroll-mt-6 px-5 pt-14 sm:px-10 sm:pt-20"
  >
    <div class="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p class="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#96744f]">
          Find something that feels like you
        </p>
        <h2 class="font-serif text-4xl sm:text-5xl">
          The little things, <span class="italic">beautifully.</span>
        </h2>
      </div>
      <p class="text-xs text-[#897a73]">Made for your everyday moments.</p>
    </div>
    <div
      class="mt-9 flex flex-col gap-5 border-b border-[#e5dcd3] pb-5 lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex flex-wrap gap-2" aria-label="Product categories">
        <button
          v-for="item in categories"
          :key="item"
          :aria-pressed="category === item"
          :class="
            category === item
              ? 'border-[#452637] bg-[#452637] text-white'
              : 'border-[#ddd3c9] hover:border-[#8d6543]'
          "
          class="rounded-full border px-4 py-2.5 text-xs transition"
          @click="category = item"
        >
          {{ item }}
        </button>
      </div>
      <label class="relative"
        ><span class="sr-only">Search jewellery</span
        ><input
          v-model="search"
          type="search"
          placeholder="Find your favourite…"
          class="w-full border-b border-[#b5a89d] bg-transparent py-2 pr-7 text-xs outline-none lg:w-48" /><svg
          class="absolute right-0 top-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 5 5" /></svg
      ></label>
    </div>
    <div class="flex items-center justify-between py-5 text-xs text-[#81736c]">
      <p role="status">{{ filtered.length }} little treasures</p>
      <label class="flex items-center gap-2"
        >Sort by
        <select
          v-model="sort"
          class="max-w-40 bg-transparent py-2 text-[#352c30]"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="name">Name: A–Z</option>
        </select></label
      >
    </div>
    <div v-if="error" class="border border-[#d9cabb] p-10 text-center">
      <h3 class="font-serif text-2xl">Our collection is taking a moment.</h3>
      <p class="mt-3 text-sm text-[#756b6e]">
        We couldn't load the jewellery. Please try again shortly.
      </p>
      <button
        class="mt-5 underline"
        :disabled="status === 'pending'"
        @click="refresh()"
      >
        {{ status === "pending" ? "Loading…" : "Try again" }}
      </button>
    </div>
    <div v-else-if="!filtered.length" class="py-16 text-center">
      <h3 class="font-serif text-2xl">No treasures found just yet.</h3>
      <button
        class="mt-4 text-sm underline"
        @click="
          search = '';
          category = 'All jewellery';
        "
      >
        Clear your filters
      </button>
    </div>
    <div
      v-else
      class="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4"
    >
      <ProductCard
        v-for="(product, index) in filtered"
        :key="product.slug"
        :product="product"
        :priority="index < 4"
      />
    </div>
    <div class="mt-14 flex items-center gap-5 text-[#bba88f]">
      <div class="h-px flex-1 bg-[#e5dcd3]" />
      <span class="text-2xl">✧</span>
      <p class="text-[10px] uppercase tracking-[0.2em]">
        Your everyday, a little brighter
      </p>
      <div class="h-px flex-1 bg-[#e5dcd3]" />
    </div>
  </section>
</template>
