import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'

const GalleryTemplate = ({ data: { page } }) => (
  <Layout pageTitle={page.title} pageSlug={page.slug}>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
    {page.acf.gallery && (
      <Main>
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
      </Main>
    )}
  </Layout>
)

export default GalleryTemplate

export const query = graphql`
  query GalleryQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      slug
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

const Main = styled(Container)`
  padding: 45px 15px;
`
