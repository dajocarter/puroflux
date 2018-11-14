require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Puroflux',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'puroflux',
        short_name: 'puroflux',
        start_url: '/',
        background_color: '#000',
        theme_color: '#05C6C7',
        display: 'minimal-ui',
        icon: 'src/images/purofluxlogo.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: process.env.BASE_URL,
        protocol: process.env.PROTOCOL,
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {},
        verboseOutput: true,
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: process.env.SOURCE_URL,
          replacementUrl: '',
        },
        concurrentRequests: 10,
        excludedRoutes: ['/*/*/comments', '/yoast/**'],
        normalizer: function({ entities }) {
          const series = entities.filter(
            e => e.__type === 'wordpress__wp_series'
          )
          const models = entities.filter(
            e => e.__type === 'wordpress__wp_models'
          )

          return entities.map(e => {
            if (e.__type === 'wordpress__wp_products') {
              let hasSeries =
                e.acf &&
                e.acf.product_series &&
                Array.isArray(e.acf.product_series) &&
                e.acf.product_series.length
              if (hasSeries) {
                e.acf.series___NODE = e.acf.product_series.map(
                  ps => series.find(s => ps.wordpress_id === s.wordpress_id).id
                )
                delete e.acf.product_series
              }
            } else if (e.__type === 'wordpress__wp_series') {
              let hasModels =
                e.acf &&
                e.acf.series_models &&
                Array.isArray(e.acf.series_models) &&
                e.acf.series_models.length
              if (hasModels) {
                e.acf.models___NODE = e.acf.series_models.map(
                  sm => models.find(m => sm.wordpress_id === m.wordpress_id).id
                )
                delete e.acf.series_models
              }
            }
            return e
          })
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Lato', 'Josefin Sans'],
      },
    },
  ],
}
