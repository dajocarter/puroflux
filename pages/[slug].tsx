import { GetStaticProps, GetStaticPropsContext } from 'next'
import { HeroContentProps } from '../components/hero-unit'
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
  page: {
    template:
      | 'page_contact.php'
      | 'page_form.php'
      | 'page_library.php'
      | 'page_store-locator.php'
      | 'page_videos.php'
      | ''
    content: {
      rendered: string
    }
    acf: HeroContentProps
  }
}

export default function Page(
  props:
    | ContactPageProps
    | FormPageProps
    | LibraryTemplateProps
    | StoreLocatorProps
    | VideoPageProps
) {
  switch (props.page.template) {
    case 'page_contact.php':
      return <ContactPage {...(props as ContactPageProps)} />
    case 'page_form.php':
      return <FormPage {...(props as FormPageProps)} />
    case 'page_library.php':
      return <LibraryTemplate {...(props as LibraryTemplateProps)} />
    case 'page_store-locator.php':
      return <StoreLocatorTemplate {...(props as StoreLocatorProps)} />
    case 'page_videos.php':
      return <VideoPageTemplate {...(props as VideoPageProps)} />
    default:
      return <PageTemplate {...props} />
  }
}

export async function getStaticPaths() {
  const pages = await wpClient.page().find()
  const paths = pages.map((page) => ({
    params: { slug: page?.slug }
  }))
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
