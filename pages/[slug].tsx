import { GetStaticProps, GetStaticPropsContext } from 'next'
import { wpClient } from '../data'
import getLayoutData from '../data/layout'
import { getPageData } from '../data/page'
import { HeaderProps } from '../components/header'
import { FooterProps } from '../components/footer'
import PageTemplate from '../templates/page'
import LibraryTemplate, { LibraryTemplateProps } from '../templates/library'
import ContactPage, { ContactPageProps } from '../templates/contact'
import FormPage, { FormPageProps } from '../templates/form'
import StoreLocatorTemplate, {
  StoreLocatorProps
} from '../templates/store-locator'
import VideoPageTemplate, { VideoPageProps } from '../templates/videos'
import GalleryPageTemplate, { GalleryPageProps } from '../templates/gallery'
import TypicalInstallationsPage, {
  TypicalInstallationsPageProps
} from '../templates/typical-installations'
import ProductsPageTemplate, { ProductsPageProps } from '../templates/products'
import { WordPressPage } from '../data/types'
import ProductTemplate, { ProductPageProps } from '../templates/product'
import SeriesTemplate, { SeriesPageProps } from '../templates/series'

export interface PageProps {
  header: HeaderProps
  footer: FooterProps
  heroImg: {
    media_details: {
      sizes: {
        full: {
          source_url: string
        }
      }
    }
  }
  page: WordPressPage
}

export default function Page(
  props:
    | ContactPageProps
    | FormPageProps
    | GalleryPageProps
    | LibraryTemplateProps
    | ProductPageProps
    | ProductsPageProps
    | SeriesPageProps
    | StoreLocatorProps
    | TypicalInstallationsPageProps
    | VideoPageProps
) {
  if (!props.page.template) {
    switch (props.page.type) {
      case 'product':
        return <ProductTemplate {...(props as ProductPageProps)} />
      case 'series':
        return <SeriesTemplate {...(props as SeriesPageProps)} />
    }
  }
  switch (props.page.template) {
    case 'page_contact.php':
      return <ContactPage {...(props as ContactPageProps)} />
    case 'page_form.php':
      return <FormPage {...(props as FormPageProps)} />
    case 'page_gallery.php':
      return <GalleryPageTemplate {...(props as GalleryPageProps)} />
    case 'page_library.php':
      return <LibraryTemplate {...(props as LibraryTemplateProps)} />
    case 'page_products.php':
      return <ProductsPageTemplate {...(props as ProductsPageProps)} />
    case 'page_store-locator.php':
      return <StoreLocatorTemplate {...(props as StoreLocatorProps)} />
    case 'page_typical-installations.php':
      return (
        <TypicalInstallationsPage
          {...(props as TypicalInstallationsPageProps)}
        />
      )
    case 'page_videos.php':
      return <VideoPageTemplate {...(props as VideoPageProps)} />
    default:
      return <PageTemplate {...props} />
  }
}

export async function getStaticPaths() {
  let paths: { params: { slug: string } }[] = []

  const pages = await wpClient.page().find()
  pages.forEach((page) => {
    if (page && page.slug)
      paths.push({
        params: { slug: page.slug }
      })
  })

  const products = await wpClient.product().find()
  products.forEach((page) => {
    if (page && page.slug)
      paths.push({
        params: { slug: page.slug }
      })
  })

  const series = await wpClient.series().find()
  series.forEach((page) => {
    if (page && page.slug)
      paths.push({
        params: { slug: page.slug }
      })
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const layoutData = await getLayoutData()

  if (!context.params) return { notFound: true }
  let slug =
    (Array.isArray(context.params.slug)
      ? context.params.slug[0]
      : context.params.slug) || ''
  const pageData = await getPageData(slug)

  return {
    props: {
      ...layoutData,
      ...pageData
    }
  }
}
