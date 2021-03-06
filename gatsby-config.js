require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    origin: process.env.ORIGIN
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'puroflux',
        short_name: 'puroflux',
        start_url: '/',
        background_color: '#000',
        theme_color: '#05C6C7',
        display: 'minimal-ui',
        icon: 'src/images/purofluxlogo.png' // This path is relative to the root of the site.
      }
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
        auth: {
          htaccess_user: process.env.WP_USERNAME,
          htaccess_pass: process.env.WP_PASSWORD,
          htaccess_sendImmediately: false
        },
        verboseOutput: true,
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: '',
          replacementUrl: ''
        },
        concurrentRequests: 10,
        excludedRoutes: ['/*/*/comments', '/*/*/themes', '/*/*/blocks', '/*/*/types', '/*/*/statuses', '/*/*/users*', '/*/*/search'],
        normalizer: function ({ entities }) {
          const products = entities.filter(
            e => e.__type === 'wordpress__wp_products'
          )
          const series = entities.filter(
            e => e.__type === 'wordpress__wp_series'
          )
          const models = entities.filter(
            e => e.__type === 'wordpress__wp_models'
          )
          const states = entities.filter(
            e => e.__type === 'wordpress__wp_states'
          )

          return entities.map(e => {
            const productHasSeries =
              e.acf &&
              e.acf.product_series &&
              Array.isArray(e.acf.product_series) &&
              e.acf.product_series.length
            const seriesHasModels =
              e.acf &&
              e.acf.series_models &&
              Array.isArray(e.acf.series_models) &&
              e.acf.series_models.length
            const seriesHasProducts =
              e.acf &&
              e.acf.product_series &&
              Array.isArray(e.acf.product_series) &&
              e.acf.product_series.length
            const modelHasSeries =
              e.acf &&
              e.acf.series_models &&
              Array.isArray(e.acf.series_models) &&
              e.acf.series_models.length
            const repHasState =
              e.states && Array.isArray(e.states) && e.states.length
            switch (e.__type) {
              case 'wordpress__wp_products':
                if (productHasSeries) {
                  e.acf.series___NODE = e.acf.product_series.map(
                    ps =>
                      series.find(s => ps.wordpress_id === s.wordpress_id).id
                  )
                  delete e.acf.product_series
                }
                break
              case 'wordpress__wp_series':
                if (seriesHasModels) {
                  e.acf.models___NODE = e.acf.series_models.map(
                    sm =>
                      models.find(m => sm.wordpress_id === m.wordpress_id).id
                  )
                  delete e.acf.series_models
                }
                if (seriesHasProducts) {
                  e.acf.products___NODE = e.acf.product_series.map(
                    ps =>
                      products.find(p => ps.wordpress_id === p.wordpress_id).id
                  )
                  delete e.acf.product_series
                }
                break
              case 'wordpress__wp_models':
                if (modelHasSeries) {
                  e.acf.series___NODE = e.acf.series_models.map(
                    sm =>
                      series.find(s => sm.wordpress_id === s.wordpress_id).id
                  )
                  delete e.acf.series_models
                }
                break
              case 'wordpress__wp_reps':
                if (repHasState) {
                  e.states___NODE = e.states.map(
                    s => states.find(state => s === state.wordpress_id).id
                  )
                  delete e.states
                }
                break
              default:
                return e
            }
            return e
          })
        }
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Lato', 'Josefin Sans']
      }
    }
  ]
}
