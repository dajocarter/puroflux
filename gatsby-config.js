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
        icon: 'src/images/purofluxlogo_white_2x.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: `${process.env.BASE_URL}`,
        protocol: `${process.env.PROTOCOL}`,
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {},
        verboseOutput: true,
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: `${process.env.SOURCE_URL}`,
          replacementUrl: '',
        },
        concurrentRequests: 10,
        excludedRoutes: ['/*/*/comments', '/yoast/**'],
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
