import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, TabContainer, TabContent, TabPane, Nav } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import ProductNav from '../components/productNav'
import Btn from '../components/styled/button'

const Main = styled(Container)`
  padding: 45px 15px;
`

const Tabs = styled(Nav)`
  &.nav {
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 991px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .nav-link {
    padding: 0;
  }
`

const Pane = styled.div`
  display: grid;
  grid-gap: 1rem;
  align-items: center;
  grid-template-columns: 1fr;

  @media (min-width: 991px) {
    grid-template-columns: 600px auto;
  }
`
const Content = styled.div``
const ItemTitle = styled.h2``
const ItemContent = styled.p``

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
          <TabContainer id='product-selector'>
            <Row>
              <Col xs={12}>
                <Tabs>
                  {data.products.edges.map(({ node }) =>
                    <Nav.Item key={node.id}>
                      <Nav.Link eventKey={node.id}>
                        <Img
                          fluid={node.featured_media.localFile.childImageSharp.fluid}
                        />
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  <Nav.Item>
                    <Nav.Link eventKey={data.addlItem.id}>
                      <Img
                        fluid={data.addlItem.featured_media.localFile.childImageSharp.fluid}
                      />
                    </Nav.Link>
                  </Nav.Item>
                </Tabs>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TabContent animation='true'>
                  {data.products.edges.map(({ node }) =>
                    <TabPane key={node.id} eventKey={node.id}>
                      <Pane>
                        <Img
                          fluid={node.featured_media.localFile.childImageSharp.fluid}
                        />
                        <Content>
                          <ItemTitle>{node.title}</ItemTitle>
                          <ItemContent
                            dangerouslySetInnerHTML={{
                              __html: node.excerpt || node.acf.excerpt
                            }}
                          />
                          <Btn to={node.slug}>Learn More</Btn>
                        </Content>
                      </Pane>
                    </TabPane>
                  )}
                  <TabPane eventKey={data.addlItem.id}>
                    <Pane>
                      <Img
                        fluid={data.addlItem.featured_media.localFile.childImageSharp.fluid}
                      />
                      <Content>
                        <ItemTitle>{data.addlItem.title}</ItemTitle>
                        <ItemContent
                          dangerouslySetInnerHTML={{
                            __html: data.addlItem.excerpt || data.addlItem.acf.excerpt
                          }}
                        />
                        <Btn to={data.addlItem.slug}>Learn More</Btn>
                      </Content>
                    </Pane>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </TabContainer>
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
