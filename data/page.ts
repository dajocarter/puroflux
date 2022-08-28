import { queryBySlug, wpClient } from '.'

export async function getHomePageData() {
  const [heroImg] = await wpClient
    .media()
    .find(queryBySlug('puroflux_home_hero_pf_4060'))
  const [page] = await wpClient.page().find(queryBySlug('home'))

  return {
    heroImg,
    page
  }
}

export async function getPageData(slug: string) {
  const [heroImg] = await wpClient
    .media()
    .find(queryBySlug('puroflux_home_hero_sample'))
  const [page] = await wpClient.page().find(queryBySlug(slug))

  return {
    heroImg,
    page
  }
}
