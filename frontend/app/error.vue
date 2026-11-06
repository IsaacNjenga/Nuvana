<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
useSeoMeta({ title: 'Page unavailable | Nuvana Glitter', robots: 'noindex, follow' })
</script>
<template><main class="flex min-h-screen flex-col items-center justify-center bg-[#faf8f4] px-6 text-center text-[#452637]"><span class="text-6xl">✧</span><p class="mt-6 text-xs tracking-widest">NUVANA GLITTER · {{ error.statusCode }}</p><h1 class="mt-5 font-serif text-4xl">{{ error.statusCode === 404 ? 'This treasure is a little out of reach.' : 'A little pause in the sparkle.' }}</h1><p class="mt-4 text-sm">{{ error.statusCode === 404 ? 'The page may have moved, or this piece is no longer available.' : 'Please try again in a moment.' }}</p><button class="mt-8 bg-[#452637] px-7 py-4 text-sm text-white" @click="clearError({ redirect: '/' })">Back to the collection</button></main></template>
