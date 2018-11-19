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
        let template = node.template
          ? node.template.replace('php', 'js')
          : `page.js`
        createPage({
          path: `/${node.slug}/`,
          component: path.resolve(`./src/templates/${template}`),
          context: {
            id: node.id,
          },
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
            id: node.id,
          },
        })
      })
      // ==== END PRODUCTS ====

      // ==== SERIES ====
      const seriesTemplate = path.resolve('./src/templates/series.js')
      result.data.allWordpressWpSeries.edges.forEach(({ node }) => {
        createPage({
          path: `/${node.slug}/`,
          component: seriesTemplate,
          context: {
            id: node.id,
          },
        })
      })
      // ==== END SERIES ====
      resolve()
    })
  })
}
