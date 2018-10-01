import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const GalleryTemplate = () => (
  <StaticQuery
    query={graphql`
      query GalleryQuery {
        page: wordpressPage(template: { eq: "page_gallery.php" }) {
          content
          acf {
            content
            buttons {
              button_link {
                title
                target
                url
              }
            }
            gallery {
              id
              localFile {
                childImageSharp {
                  fluid(maxWidth: 768) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
        {data.page.content && (
          <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
        )}
        {data.page.acf.gallery &&
          data.page.acf.gallery.map(img => (
            <Img key={img.id} fluid={img.localFile.childImageSharp.fluid} />
          ))}
      </Layout>
    )}
  />
)

export default GalleryTemplate
