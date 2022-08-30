import { queryBySlug, wpClient } from '.'
import { SeriesPostType } from './types'

export async function getPageData(slug: string) {
  const heroImgSlug =
    slug === 'home' ? 'puroflux_home_hero_pf_4060' : 'puroflux_home_hero_sample'
  const [heroImg] = await wpClient.media().find(queryBySlug(heroImgSlug))
  const [page] = await wpClient.page().find(queryBySlug(slug))

  if (page && page.template === 'page_products.php') {
    const [addlItem] = await wpClient.page().find(queryBySlug('installations'))
    const products = await wpClient.product().find()
    products.sort((a, b) => {
      if (!a) return 1 // sort a after b
      if (!b) return -1 // sort a before b
      return b.id - a.id
    })

    return {
      heroImg,
      page,
      addlItem,
      products
    }
  }

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

  if (page && page.template === 'page_typical-installations.php') {
    const series = await wpClient.series().find()

    const filterSeries: SeriesPostType[] = []
    const separatorSeries: SeriesPostType[] = []

    series.forEach((elt) => {
      if (!elt) return
      if (
        elt.acf.product_series?.find(
          (p) => p.post_title === 'Permanent Media Filters'
        )
      ) {
        filterSeries.push(elt)
      } else if (
        elt.acf.product_series?.find((p) => p.post_title === 'Separators')
      ) {
        separatorSeries.push(elt)
      }
    })

    return {
      heroImg,
      page,
      filterSeries,
      separatorSeries
    }
  }

  return {
    heroImg,
    page
  }
}
