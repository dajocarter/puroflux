import React, { Fragment } from 'react'
import { string } from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import SchemaOrg from './SchemaOrg'
import favicon from '../images/purofluxlogo.png'
import image from '../images/puroflux_home_resources_bg.jpg'

const SEO = ({ pageTitle, pageSlug }) => (
  <StaticQuery
    query={graphql`
      query {
        wordpressWpSettings {
          title
          description
        }
      }
    `}
    render={({ wordpressWpSettings: settings }) => {
      const url = `${window.origin}/${pageSlug}`
      const title = `${pageTitle} | ${settings.title}`

      return (
        <Fragment>
          <Helmet>
            {/* General tags */}
            <html lang='en' />
            <title>{title}</title>
            <meta name='description' content={settings.description} />
            <meta name='image' content={image} />
            <link rel='shortcut icon' href={favicon} />

            {/* OpenGraph tags */}
            <meta property='og:url' content={url} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={settings.description} />
            <meta property='og:image' content={image} />

            {/* Twitter Card tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content={settings.description} />
            <meta name='twitter:image' content={image} />
          </Helmet>
          <SchemaOrg
            url={url}
            title={title}
            description={settings.description}
            image={image}
          />
        </Fragment>
      )
    }}
  />
)

SEO.propTypes = {
  pageTitle: string,
  pageSlug: string
}

SEO.defaultProps = {
  pageTitle: ``,
  pageSlug: ``
}

export default SEO
