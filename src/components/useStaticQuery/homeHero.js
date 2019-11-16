import { useStaticQuery, graphql } from 'gatsby'

const useHomeHero = () => {
  const { homeHero } = useStaticQuery(
    graphql`
      query {
        homeHero: wordpressWpMedia(
          slug: { eq: "puroflux_home_hero_pf_4060" }
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
  return homeHero
}

export default useHomeHero
