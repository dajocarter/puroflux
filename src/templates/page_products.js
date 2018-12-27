import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, TabContainer, TabContent, TabPane, Nav } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
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

  @media (max-width: 990px) {
    margin-top: 2rem;
  }

  @media (min-width: 991px) {
    grid-template-columns: minmax(600px,1fr) 1fr;
  }
`
const Content = styled.div``
const ItemTitle = styled.h2``
const ItemContent = styled.p``
const CloseIcon = styled(FaTimes)`
  color: ${({ theme }) => theme.secondary};
  position: absolute;
  top: 0;
  right: 1rem;
  font-size: 1.15rem;
  cursor: pointer;
`

export default class ProductsPageTemplate extends Component {
  constructor (props, context) {
    super(props, context)

    this.closePane = this.closePane.bind(this)

    this.state = {
      key: ``
    }
  }

  handleKeyChange (key) {
    document.getElementById(`panes`).scrollIntoView({ behavior: 'smooth' })
    this.setState({ key })
  }

  closePane () {
    document.getElementById(`tabs`).scrollIntoView({ behavior: 'smooth' })
    this.setState({ key: `` })
  }

  render () {
    const { key } = this.state
    const { data } = this.props

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
            <TabContainer id='product-selector' activeKey={key} onSelect={key => this.handleKeyChange(key)}>
              <Row id='tabs'>
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
              <Row id='panes'>
                <Col xs={12}>
                  <TabContent animation='true'>
                    {data.products.edges.map(({ node }) =>
                      <SelectablePane key={node.id} node={node} closePane={this.closePane} />
                    )}
                    <SelectablePane node={data.addlItem} closePane={this.closePane} />
                  </TabContent>
                </Col>
              </Row>
            </TabContainer>
          )}
        </Main>
      </Layout>
    )
  }
}

const SelectablePane = ({ node, closePane }) => (
  <TabPane eventKey={node.id}>
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
        <CloseIcon onClick={closePane} />
      </Content>
    </Pane>
  </TabPane>
)

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
