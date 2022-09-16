import Head from 'next/head'

export default function PageSEO({
  slug,
  title
}: {
  slug: string
  title: string
}) {
  const description =
    'Industrial & Commercial Water Filtration and Control Systems'
  const pageTitle = `${title} | Puroflux Corporation`
  const url = `https://www.puroflux.com/${slug}`

  const favicon = '/purofluxlogo.png'
  const image = '/puroflux_home_resources_bg.png'

  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      description,
      image: {
        '@type': 'ImageObject',
        url: image
      }
    }
  ]

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <link rel='shortcut icon' href={favicon} />

      {/* OpenGraph tags */}
      <meta property='og:url' content={url} />
      <meta property='og:title' content={pageTitle} />
      <meta
        property='og:description'
        content='Industrial & Commercial Water Filtration and Control Systems'
      />
      <meta property='og:image' content={image} />

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta
        name='twitter:description'
        content='Industrial & Commercial Water Filtration and Control Systems'
      />
      <meta name='twitter:image' content={image} />

      {/* Schema.org tags */}
      <script type='application/ld+json'>{JSON.stringify(schema)}</script>
    </Head>
  )
}
