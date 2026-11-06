export function usePageSeo(title: string, description: string, path: string, image?: string) {
  const base = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
  const url = `${base}${path}`
  const socialImage = image || productImage('photo-1611652022419-a9419f74343d', 1200)
  useSeoMeta({ title: `${title} | Nuvana Glitter`, description, ogTitle: `${title} | Nuvana Glitter`, ogDescription: description, ogUrl: url, ogType: 'website', ogSiteName: 'Nuvana Glitter', ogLocale: 'en_KE', ogImage: socialImage, ogImageAlt: title, twitterCard: 'summary_large_image', twitterTitle: title, twitterDescription: description, twitterImage: socialImage })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
