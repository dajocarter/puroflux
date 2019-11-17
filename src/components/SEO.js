import React from 'react'
import { string } from 'prop-types'
import Helmet from 'react-helmet'

import SchemaOrg from './SchemaOrg'
import useSiteMetadata from './useStaticQuery/siteMetadata'
import favicon from '../images/purofluxlogo.png'
import image from '../images/puroflux_home_resources_bg.jpg'

const SEO = ({ pageTitle, pageSlug }) => {
  const { origin } = useSiteMetadata()
  const url = `${origin}/${pageSlug}`
  const title = `${pageTitle} | Puroflux Corporation`

  return (
    <>
      <Helmet>
        {/* General tags */}
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content='Industrial & Commercial Water Filtration and Control Systems' />
        <meta name='image' content={image} />
        <link rel='shortcut icon' href={favicon} />

        {/* OpenGraph tags */}
        <meta property='og:url' content={url} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content='Industrial & Commercial Water Filtration and Control Systems' />
        <meta property='og:image' content={image} />

        {/* Twitter Card tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content='Industrial & Commercial Water Filtration and Control Systems' />
        <meta name='twitter:image' content={image} />
      </Helmet>
      <SchemaOrg
        url={url}
        title={title}
        description='Industrial & Commercial Water Filtration and Control Systems'
        image={image}
      />
    </>
  )
}

SEO.propTypes = {
  pageTitle: string,
  pageSlug: string
}

SEO.defaultProps = {
  pageTitle: '',
  pageSlug: ''
}

export default SEO
