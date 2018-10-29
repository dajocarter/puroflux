const path = require(`path`)

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
              template
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

        const dontCreatePagesFor = ['home']
        const pageTemplate = path.resolve('./src/templates/page.js')
        const contactTemplate = path.resolve('./src/templates/page_contact.js')
        const galleryTemplate = path.resolve('./src/templates/page_gallery.js')
        const libraryTemplate = path.resolve('./src/templates/page_library.js')
        const typInstallTemplate = path.resolve(
          './src/templates/page_typInstall.js'
        )

        result.data.allWordpressPage.edges
          .filter(({ node }) => !dontCreatePagesFor.includes(node.slug))
          .forEach(({ node }) => {
            switch (node.template) {
              case 'page_contact.php':
                createPage({
                  path: `/${node.slug}/`,
                  context: {
                    id: node.id,
                  },
                })
                break
              case 'page_gallery.php':
                createPage({
                  path: `/${node.slug}/`,
                  context: {
                    id: node.id,
                  },
                })
                break
              case 'page_library.php':
                createPage({
                  path: `/${node.slug}/`,
                  context: {
                    id: node.id,
                  },
                })
                break
              case 'page_typical-installations.php':
                createPage({
                  path: `/${node.slug}/`,
                  context: {
                    id: node.id,
                  },
                })
                break
              default:
                createPage({
                  path: `/${node.slug}/`,
                  context: {
                    id: node.id,
                  },
                })
            }
          })
                component: contactTemplate,
                component: galleryTemplate,
                component: libraryTemplate,
                component: typInstallTemplate,
                component: pageTemplate,
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
              component: productTemplate,
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
              component: categoryTemplate,
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
