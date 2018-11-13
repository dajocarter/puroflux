import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import Carousel from 'react-bootstrap/lib/Carousel'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Main = styled(Container)`
  padding: 45px 15px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const GalleryTemplate = ({ data: { page } }) => (
  <Layout>
    <Hero html={page.acf.content} links={page.acf.buttons} />
    <Main>
      <Row>
        <Col xs={12}>
          {page.content && (
            <Content dangerouslySetInnerHTML={{ __html: page.content }} />
          )}
        </Col>
      </Row>
      {page.acf.gallery && (
        <Row>
          <Col xs={12}>
            <Carousel>
              {page.acf.gallery.map(img => (
                <Carousel.Item key={img.id}>
                  <Img
                    alt={img.alt_text}
                    fluid={img.localFile.childImageSharp.fluid}
                  />
                  <Carousel.Caption>
                    <h3>{img.title}</h3>
                    {img.caption && <p>{img.caption}</p>}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
    </Main>
  </Layout>
)

export default GalleryTemplate

export const query = graphql`
  query GalleryQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
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
          title
          caption
          alt_text
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
`
