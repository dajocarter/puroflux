import { queryBySlug, wpClient } from '.'

export async function getPageData(slug: string) {
  const heroImgSlug =
    slug === 'home' ? 'puroflux_home_hero_pf_4060' : 'puroflux_home_hero_sample'
  const [heroImg] = await wpClient.media().find(queryBySlug(heroImgSlug))
  const [page] = await wpClient.page().find(queryBySlug(slug))

  if (page && page.template === 'page_store-locator.php') {
    const reps = await wpClient.rep().find()
    const states = await wpClient.state().find()

    return {
      heroImg,
      page,
      reps,
      states
    }
  }

  return {
    heroImg,
    page
  }
}
