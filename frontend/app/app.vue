<script setup lang="ts">
const { count, hydrate } = useCart()
onMounted(hydrate)
</script>
<template>
  <div class="min-h-screen bg-[#faf8f4] text-[#352c30]">
    <NuxtRouteAnnouncer />
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4">Skip to content</a>
    <div class="bg-[#452637] px-4 py-2 text-center text-[10px] tracking-[0.18em] text-white sm:text-xs">A LITTLE EVERYDAY LUXURY. A LOT OF YOU.</div>
    <header class="border-b border-[#e9e1da] bg-[#faf8f4]">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-10">
        <NuxtLink to="/" aria-label="Nuvana Glitter home" class="flex items-center gap-2"><span class="text-3xl text-[#987448]">✧</span><span><span class="block font-serif text-2xl leading-none tracking-[0.16em] sm:text-3xl">NUVANA</span><span class="mt-1 block text-center text-[9px] tracking-[0.48em]">GLITTER</span></span></NuxtLink>
        <nav aria-label="Main navigation" class="flex items-center gap-5 text-xs sm:gap-9 sm:text-sm">
          <NuxtLink to="/">The collection</NuxtLink><a href="/#our-story" class="hidden sm:block">Our story</a>
          <NuxtLink to="/cart" class="flex items-center gap-2" aria-label="Shopping bag"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg><span class="hidden sm:inline">Bag</span><span class="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#452637] px-1 text-[10px] text-white">{{ count }}</span></NuxtLink>
        </nav>
      </div>
    </header>
    <main id="main"><NuxtPage /></main>
    <footer id="our-story" class="mt-20 border-t border-[#e5dcd3] bg-[#f0ebe3]">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-10 md:grid-cols-2">
        <div><p class="font-serif text-3xl">A little glitter. A little you.</p><p class="mt-4 max-w-md text-sm leading-7 text-[#756b6e]">Nuvana Glitter is a collection of small expressions. Thoughtfully chosen jewellery for the everyday, the unforgettable, and everything in between.</p></div>
        <div class="flex gap-16 md:justify-end"><div><p class="mb-4 text-xs font-semibold uppercase tracking-widest">Explore</p><NuxtLink to="/" class="block text-sm">Shop all jewellery</NuxtLink><NuxtLink to="/cart" class="mt-3 block text-sm">Your bag</NuxtLink></div><div><p class="mb-4 text-xs font-semibold uppercase tracking-widest">Made for you</p><p class="text-sm leading-7 text-[#756b6e]">Little details.<br>Lasting impressions.</p></div></div>
      </div>
      <div class="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-[#dfd5cb] px-5 py-5 text-[11px] text-[#756b6e] sm:px-10"><span>© {{ new Date().getFullYear() }} Nuvana Glitter</span><span>For all the ways you shine. ✧</span></div>
    </footer>
  </div>
</template>
