import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ProductNav from '../components/productNav'
import ExcerptExpander from '../components/Expander'

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductsPageTemplate = ({ data }) => {
  return (
    <Layout>
      <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
      <Main>
        <Row>
          <Col xs={12}>
            <ProductNav />
          </Col>
        </Row>
        {data.products &&
          data.addlItem && (
            <Row>
              <Col xs={12}>
                <ExcerptExpander
                  products={data.products.edges}
                  addlItem={data.addlItem}
                />
              </Col>
            </Row>
          )}
      </Main>
    </Layout>
  )
}

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
    addlItem: wordpressPage(slug: { eq: "installations" }) {
      id
      title
      slug
      excerpt
      featured_media {
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    products: allWordpressWpProducts {
      edges {
        node {
          id
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
