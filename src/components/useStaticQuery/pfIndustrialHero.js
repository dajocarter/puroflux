import { useStaticQuery, graphql } from 'gatsby'

const usePFIndustrialHero = () => {
  const { pfIndustrialHero } = useStaticQuery(
    graphql`
      query {
        pfIndustrialHero: wordpressWpMedia(slug: {eq: "pfi-logo"}) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 450) {
                src
              }
            }
          }
        }
      }
    `
  )
  return pfIndustrialHero
}

export default usePFIndustrialHero
