import { useStaticQuery, graphql } from 'gatsby'

const useDefaultHero = () => {
  const { defaultHero } = useStaticQuery(
    graphql`
      query {
        defaultHero: wordpressWpMedia(
          slug: { eq: "puroflux_home_hero_sample" }
        ) {
          localFile {
            childImageSharp {
              fluid(maxHeight: 450) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    `
  )
  return defaultHero
}

export default useDefaultHero
