const path = require(`path`)

// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress products (route : /{slug})
// Will create pages for WordPress series (route : /{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPage(filter: { slug: { ne: "home" } }) {
          edges {
            node {
              id
              slug
              template
            }
          }
        }
        allWordpressWpProducts {
          edges {
            node {
              id
              slug
            }
          }
        }
        allWordpressWpSeries(filter: { slug: { ne: "pf-10" } }) {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // ==== PAGES ====
      result.data.allWordpressPage.edges.forEach(({ node }) => {
        const template = node.template
          ? node.template.replace('php', 'js')
          : `page.js`
        createPage({
          path: `/${node.slug}/`,
          component: path.resolve(`./src/templates/${template}`),
          context: {
            slug: node.slug
          }
        })
      })
      // ==== END PAGES ====

      // ==== PRODUCTS ====
      const productTemplate = path.resolve('./src/templates/product.js')
      result.data.allWordpressWpProducts.edges.forEach(({ node }) => {
        createPage({
          path: `/${node.slug}/`,
          component: productTemplate,
          context: {
            slug: node.slug
          }
        })
      })
      // ==== END PRODUCTS ====

      // ==== SERIES ====
      const seriesTemplate = path.resolve('./src/templates/series.js')
      const pfIndustrialTemplate = path.resolve('./src/templates/pf-industrial.js')

      const industrialSeries = ['pfi-pump-package-systems']

      result.data.allWordpressWpSeries.edges.forEach(({ node }) =>
        industrialSeries.includes(node.slug)
          ? (
            createPage({
              path: `/${node.slug}/`,
              component: pfIndustrialTemplate,
              context: {
                slug: node.slug
              }
            })
          ) : (
            createPage({
              path: `/${node.slug}/`,
              component: seriesTemplate,
              context: {
                slug: node.slug
              }
            })
          )
      )
      // ==== END SERIES ====
      resolve()
    })
  })
}
