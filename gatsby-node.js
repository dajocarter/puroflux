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
        allWordpressCategory(filter: { slug: { ne: "uncategorized" } }) {
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

      const pageTemplate = path.resolve('./src/templates/page.js')
      const contactTemplate = path.resolve('./src/templates/page_contact.js')
      const galleryTemplate = path.resolve('./src/templates/page_gallery.js')
      const libraryTemplate = path.resolve('./src/templates/page_library.js')
      const typInstallTemplate = path.resolve(
        './src/templates/page_typical-installations.js'
      )
      const videosTemplate = path.resolve('./src/templates/page_videos.js')

      result.data.allWordpressPage.edges.forEach(({ node }) => {
        switch (node.template) {
          case 'page_contact.php':
            createPage({
              path: `/${node.slug}/`,
              component: contactTemplate,
              context: {
                id: node.id,
              },
            })
            break
          case 'page_gallery.php':
            createPage({
              path: `/${node.slug}/`,
              component: galleryTemplate,
              context: {
                id: node.id,
              },
            })
            break
          case 'page_library.php':
            createPage({
              path: `/${node.slug}/`,
              component: libraryTemplate,
              context: {
                id: node.id,
              },
            })
            break
          case 'page_typical-installations.php':
            createPage({
              path: `/${node.slug}/`,
              component: typInstallTemplate,
              context: {
                id: node.id,
              },
            })
            break
          case 'page_videos.php':
            createPage({
              path: `/${node.slug}/`,
              component: videosTemplate,
              context: {
                id: node.id,
              },
            })
            break
          default:
            createPage({
              path: `/${node.slug}/`,
              component: pageTemplate,
              context: {
                id: node.id,
              },
            })
        }
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
      })
      // ==== END PRODUCTS ====

      // ==== CATEGORIES ====
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
      // ==== END CATEGORIES ====
    })
  })
}
