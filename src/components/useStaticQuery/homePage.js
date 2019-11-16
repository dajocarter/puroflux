import { useStaticQuery, graphql } from 'gatsby'

const useHomePage = () => {
  const { page } = useStaticQuery(
    graphql`
      query HomeQuery {
        page: wordpressPage(slug: { eq: "home" }) {
          title
          acf {
            content
            buttons {
              button_link {
                title
                target
                url
              }
            }
            featured_content
            featured_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            layouts_page {
              __typename
              ... on WordPressAcf_full_width_content {
                content
                link {
                  title
                  url
                  target
                }
              }
              ... on WordPressAcf_split_content {
                left_background_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 768) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                left_title
                left_content
                left_link {
                  title
                  url
                  target
                }
                right_background_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 768) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                right_title
                right_content
                right_link {
                  title
                  url
                  target
                }
              }
            }
          }
        }
      }
    `
  )
  return page
}

export default useHomePage
