import { wpClient } from '.'

const heroQueryParams = new URLSearchParams({
  slug: 'puroflux_home_hero_pf_4060'
})

const pageQueryParams = new URLSearchParams({
  slug: 'home'
})

export default async function getHomePageData() {
  const [heroImg] = await wpClient.media().find(heroQueryParams)
  const [page] = await wpClient.page().find(pageQueryParams)

  return {
    heroImg,
    page
  }
}
