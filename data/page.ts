import { queryBySlug, wpClient } from '.'
import { SeriesPostType } from './types'

export async function getPageData(slug: string) {
  const heroImgSlug =
    slug === 'home' ? 'puroflux_home_hero_pf_4060' : 'puroflux_home_hero_sample'
  const [heroImg] = await wpClient.media().find(queryBySlug(heroImgSlug))

  const [page] = await wpClient.page().find(queryBySlug(slug))
  if (!page) {
    const products = await wpClient.product().find()
    const product = products.find((p) => p && p.slug === slug)

    // we need more info about the series than what the ACF data provides so we have to fetch :(
    let series: SeriesPostType[] = []
    if (product) {
      const productSeries = product.acf.product_series
      if (productSeries) {
        const seriesData = await Promise.all(
          productSeries.map((node) => wpClient.series().find(node.ID))
        )
        seriesData.forEach((node) => {
          const data = node[0]
          if (data) series.push(data)
        })
      }
    }

    return {
      heroImg,
      page: product,
      products,
      series
    }
  } else {
    if (page.template === 'page_products.php') {
      const [addlItem] = await wpClient
        .page()
        .find(queryBySlug('installations'))
      const products = await wpClient.product().find()

      return {
        heroImg,
        page,
        addlItem,
        products
      }
    }

    if (page.template === 'page_store-locator.php') {
      const reps = await wpClient.rep().find()
      const states = await wpClient.state().find()

      return {
        heroImg,
        page,
        reps,
        states
      }
    }

    if (page.template === 'page_typical-installations.php') {
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
}
