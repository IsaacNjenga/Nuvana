<script setup lang="ts">
const { items, ready, total, update, clear } = useCart();
const checkout = ref(false);
const complete = ref(false);
const orderTotal = ref(0);
const name = ref("");
const email = ref("");
function placeOrder() {
  orderTotal.value = total.value;
  clear();
  complete.value = true;
  checkout.value = false;
}
usePageSeo(
  "Your Shopping Bag",
  "Your favourite Nuvana Glitter jewellery, all in one place. Review your bag and checkout to complete your order.",
  "/cart",
);
useSeoMeta({ robots: "noindex, follow" });
</script>
<template>
  <div class="mx-auto min-h-[55vh] max-w-7xl px-5 pt-12 sm:px-10 sm:pt-16">
    <NuxtLink to="/" class="text-xs text-[#897a73]"
      >← Back to the collection</NuxtLink
    >
    <h1 class="mt-6 font-serif text-4xl sm:text-5xl">
      {{
        complete ? "A little joy, on the way." : "Your bag of little treasures."
      }}
    </h1>
    <div
      v-if="complete"
      role="status"
      class="mx-auto mt-12 max-w-lg border border-[#dfd5cb] bg-[#f0ebe3] p-8 text-center"
    >
      <span class="text-5xl text-[#987448]">✧</span>
      <h2 class="mt-5 font-serif text-3xl">Thank you, {{ name }}.</h2>
      <p class="mt-4 text-sm leading-7 text-[#756b6e]">
        Your order for {{ money(orderTotal) }} is complete.
      </p>
      <NuxtLink
        to="/"
        class="mt-7 inline-block bg-[#452637] px-6 py-4 text-sm text-white"
        >Find more favourites</NuxtLink
      >
    </div>
    <p v-else-if="!ready" class="py-14 text-sm">Opening your bag…</p>
    <div v-else-if="!items.length" class="py-16 text-center">
      <span class="text-5xl text-[#b49c7c]">◇</span>
      <h2 class="mt-5 font-serif text-3xl">
        A little room for something lovely.
      </h2>
      <p class="mt-3 text-sm text-[#756b6e]">
        Your bag is empty. Let's find your next everyday favourite.
      </p>
      <NuxtLink
        to="/"
        class="mt-7 inline-block bg-[#452637] px-7 py-4 text-sm text-white"
        >Explore the collection →</NuxtLink
      >
    </div>
    <div v-else class="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        <article
          v-for="row in items"
          :key="row.product.slug"
          class="flex gap-4 border-b border-[#e5dcd3] py-6 first:pt-0 sm:gap-6"
        >
          <NuxtLink :to="`/products/${row.product.slug}`" class="shrink-0"
            ><img
              :src="productImage(row.product.image, 240)"
              :alt="row.product.alt"
              width="120"
              height="150"
              class="h-32 w-24 bg-[#eee8df] object-cover sm:h-40 sm:w-32"
          /></NuxtLink>
          <div class="flex flex-1 flex-col">
            <p class="text-[9px] uppercase tracking-widest text-[#897a73]">
              {{ row.product.category }}
            </p>
            <NuxtLink
              :to="`/products/${row.product.slug}`"
              class="mt-2 font-serif text-lg"
              >{{ row.product.name }}</NuxtLink
            >
            <p class="mt-2 text-xs">{{ money(row.product.price) }}</p>
            <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center border border-[#d6c9bc]">
                <button
                  :aria-label="`Decrease quantity of ${row.product.name}`"
                  class="h-10 w-10"
                  @click="update(row.product.slug, row.quantity - 1)"
                >
                  −</button
                ><span class="px-2 text-xs">{{ row.quantity }}</span
                ><button
                  :aria-label="`Increase quantity of ${row.product.name}`"
                  :disabled="row.quantity >= Math.min(20, row.product.stock)"
                  class="h-10 w-10 disabled:opacity-30"
                  @click="update(row.product.slug, row.quantity + 1)"
                >
                  +
                </button>
              </div>
              <button
                class="text-xs text-[#897a73] underline"
                @click="update(row.product.slug, 0)"
              >
                Remove
              </button>
              <p class="text-sm">
                {{ money(row.product.price * row.quantity) }}
              </p>
            </div>
          </div>
        </article>
      </div>
      <aside class="border border-[#e1d7cc] bg-[#f0ebe3] p-6 sm:p-8">
        <h2 class="font-serif text-2xl">A lovely little summary</h2>
        <div class="mt-7 flex justify-between text-sm">
          <span>Subtotal</span><span>{{ money(total) }}</span>
        </div>
        <div class="mt-4 flex justify-between text-xs text-[#756b6e]">
          <span>Delivery</span>
        </div>
        <div
          class="mt-6 flex justify-between border-t border-[#d9cdbf] pt-5 text-lg"
        >
          <span>Total</span><span>{{ money(total) }}</span>
        </div>
        <button
          v-if="!checkout"
          class="mt-7 w-full bg-[#452637] px-5 py-4 text-sm text-white hover:bg-[#613d50]"
          @click="checkout = true"
        >
          Checkout
        </button>
        <form v-else class="mt-7 space-y-4" @submit.prevent="placeOrder">
                   <label class="block text-xs"
            >Your name<input
              v-model.trim="name"
              required
              maxlength="80"
              autocomplete="given-name"
              class="mt-2 w-full border border-[#cdbfac] bg-[#faf8f4] p-3 text-sm" /></label
          ><label class="block text-xs"
            >Email address<input
              v-model.trim="email"
              type="email"
              required
              maxlength="200"
              autocomplete="email"
              class="mt-2 w-full border border-[#cdbfac] bg-[#faf8f4] p-3 text-sm" /></label
          ><button class="w-full bg-[#452637] px-5 py-4 text-sm text-white">
            Place order</button
          ><button
            type="button"
            class="w-full text-xs underline"
            @click="checkout = false"
          >
            Back to summary
          </button>
        </form>
        <p class="mt-4 text-center text-[10px] leading-5 text-[#756b6e]">
          Your checkout details stay in this browser tab.
        </p>
      </aside>
    </div>
  </div>
</template>
