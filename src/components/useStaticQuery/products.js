import { useStaticQuery, graphql } from 'gatsby'

const useProducts = () => {
  const { products } = useStaticQuery(
    graphql`
      query {
        products: allWordpressWpProducts {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  )
  return products.edges
}

export default useProducts
