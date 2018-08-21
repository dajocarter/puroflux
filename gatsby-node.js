const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress products (route : /{slug})
// Will create pages for WordPress categories (route : /{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // ==== PAGES ====
    graphql(`
      {
        allWordpressPage {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const pageTemplate = path.resolve('./src/templates/page.js')
        result.data.allWordpressPage.edges.forEach(({ node }) => {
          createPage({
            path: `/${node.slug}/`,
            component: slash(pageTemplate),
            context: {
              id: node.id,
            },
          })
        })
      })
      // ==== END PAGES ====

      // ==== PRODUCTS ====
      .then(() => {
        graphql(`
          {
            allWordpressWpProducts {
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
          const productTemplate = path.resolve('./src/templates/product.js')
          result.data.allWordpressWpProducts.edges.forEach(({ node }) => {
            createPage({
              path: `/${node.slug}/`,
              component: slash(productTemplate),
              context: {
                id: node.id,
              },
            })
          })
        })
      })
      // ==== END PRODUCTS ====

      // ==== CATEGORIES ====
      .then(() => {
        graphql(`
          {
            allWordpressCategory {
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
          const categoryTemplate = path.resolve('./src/templates/category.js')
          result.data.allWordpressCategory.edges.forEach(({ node }) => {
            createPage({
              path: `/${node.slug}/`,
              component: slash(categoryTemplate),
              context: {
                id: node.id,
              },
            })
          })
          resolve()
        })
      })
    // ==== END CATEGORIES ====
  })
}
