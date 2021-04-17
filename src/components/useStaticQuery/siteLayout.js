import { useStaticQuery, graphql } from 'gatsby'

const useSiteLayout = () => {
  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        logo: wordpressWpMedia(slug: { eq: "purofluxlogo_white_2x" }) {
          localFile {
            childImageSharp {
              fixed(width: 200, height: 42) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        mainMenu: wordpressWpApiMenusMenusItems(slug: { eq: "header-desktop" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
              wordpress_children {
                wordpress_id
                order
                wordpress_parent
                title
                attr
                target
                classes
                object_id
                object_slug
              }
            }
          }
        }
        pagesMenu: wordpressWpApiMenusMenusItems(slug: { eq: "explore" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
            }
          }
        }
        productsMenu: wordpressWpApiMenusMenusItems(slug: { eq: "products" }) {
          wordpress_id
          name
          slug
          count
          items {
            wordpress_id
            order
            wordpress_parent
            title
            attr
            target
            classes
            object_id
            object_slug
            wordpress_children {
              wordpress_id
              order
              wordpress_parent
              title
              attr
              target
              classes
              object_id
              object_slug
            }
          }
        }
      }
    `
  )
  return data
}

export default useSiteLayout
