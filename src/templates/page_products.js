import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import ProductNav from '../components/productNav'
import ExcerptExpander from '../components/Expander'

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductsPageTemplate = ({ data }) => {
  return (
    <Layout>
      <HeroUnit>
        <HeroContent
          html={data.page.acf.content}
          buttons={data.page.acf.buttons}
        />
      </HeroUnit>
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
  query ProductsPageQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
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
