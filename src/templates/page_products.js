import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ProductNav from '../components/productNav'
import ExcerptExpander from '../components/excerptExpander'

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductsPageTemplate = ({ data: { page, products } }) => (
  <Layout>
    <Hero html={page.acf.content} links={page.acf.buttons} />
    <Main>
      <Row>
        <Col xs={12}>
          <ProductNav />
        </Col>
      </Row>
      {products.edges && (
        <Row>
          <Col xs={12}>
            <ExcerptExpander items={products.edges} />
          </Col>
        </Row>
      )}
    </Main>
  </Layout>
)

export default ProductsPageTemplate

export const query = graphql`
  query ProductsPageQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
      acf {
        content
        buttons {
          button_link {
            title
            target
            url
          }
        }
      }
    }
    products: allWordpressWpProducts {
      edges {
        node {
          title
          slug
          featured_media {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          acf {
            excerpt
          }
        }
      }
    }
  }
`
