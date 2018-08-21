module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'pf.local',
        protocol: 'http',
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {},
        verboseOutput: true,
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: '//pf.local',
          replacementUrl: '//localhost:8000',
        },
        concurrentRequests: 10,
        excludedRoutes: ['/*/*/comments', '/yoast/**'],
      },
    },
  ],
}
