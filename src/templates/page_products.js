import React, { PureComponent } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  Container,
  Row,
  Col,
  TabContainer,
  TabContent,
  TabPane,
  Nav
} from 'react-bootstrap'
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import styled, { css } from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import ProductNav from '../components/productNav'
import Btn from '../components/styled/button'

export default class ProductsPageTemplate extends PureComponent {
  constructor (props, context) {
    super(props, context)

    this.prevPane = this.prevPane.bind(this)
    this.nextPane = this.nextPane.bind(this)
    this.closePane = this.closePane.bind(this)

    this.state = {
      key: ``
    }
  }

  prevPane () {
    document.getElementById(`panes`) &&
      document.getElementById(`panes`).scrollIntoView({ behavior: 'smooth' })
    this.setState(prevState => ({ key: parseInt(prevState.key) - 1 }))
  }

  nextPane () {
    document.getElementById(`panes`) &&
      document.getElementById(`panes`).scrollIntoView({ behavior: 'smooth' })
    this.setState(prevState => ({ key: parseInt(prevState.key) + 1 }))
  }

  setPane (key) {
    document.getElementById(`panes`) &&
      document.getElementById(`panes`).scrollIntoView({ behavior: 'smooth' })
    this.setState({ key })
  }

  closePane () {
    document.getElementById(`tabs`) &&
      document.getElementById(`tabs`).scrollIntoView({ behavior: 'smooth' })
    this.setState({ key: `` })
  }

  render () {
    const { key } = this.state
    const { data } = this.props

    return (
      <Layout pageTitle={data.page.title} pageSlug={data.page.slug}>
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
            <TabContainer
              id='product-selector'
              activeKey={key}
              onSelect={key => this.setPane(key)}
            >
              <Row id='tabs'>
                <Col xs={12}>
                  <Tabs>
                    {data.products.edges.map(({ node }, index) => (
                      <Nav.Item key={node.id}>
                        <Nav.Link eventKey={index}>
                          <Img
                            fluid={
                              node.featured_media.localFile.childImageSharp
                                .fluid
                            }
                          />
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                    <Nav.Item>
                      <Nav.Link eventKey={data.products.edges.length}>
                        <Img
                          fluid={
                            data.addlItem.featured_media.localFile
                              .childImageSharp.fluid
                          }
                        />
                      </Nav.Link>
                    </Nav.Item>
                  </Tabs>
                </Col>
              </Row>
              <Row id='panes'>
                <Col xs={12}>
                  <TabContent animation='true'>
                    {data.products.edges.map(({ node }, index) => (
                      <SelectablePane
                        key={node.id}
                        node={node}
                        eventKey={index}
                        closePane={this.closePane}
                        next
                        nextPane={this.nextPane}
                        prev={index > 0}
                        prevPane={this.prevPane}
                      />
                    ))}
                    <SelectablePane
                      node={data.addlItem}
                      eventKey={data.products.edges.length}
                      closePane={this.closePane}
                      next={false}
                      nextPane={this.nextPane}
                      prev={data.products.edges.length - 1}
                      prevPane={this.prevPane}
                    />
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

const SelectablePane = ({
  node,
  eventKey,
  closePane,
  next,
  nextPane,
  prev,
  prevPane
}) => (
  <TabPane eventKey={eventKey}>
    <Pane>
      <Img fluid={node.featured_media.localFile.childImageSharp.fluid} />
      <div>
        <h2>{node.title}</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: node.excerpt || node.acf.excerpt
          }}
        />
        <Btn to={node.slug}>Learn More</Btn>
        <CloseIcon onClick={closePane} />
        <Arrows>
          {prev && <LeftArrow onClick={prevPane} />}
          {next && <RightArrow onClick={nextPane} />}
        </Arrows>
      </div>
    </Pane>
  </TabPane>
)

export const query = graphql`
  query ProductsPageQuery($slug: String!) {
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
    grid-template-columns: minmax(600px, 1fr) 1fr;
  }
`

const Icon = css`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.25rem;
  cursor: pointer;
`

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 0;
  right: 1rem;
  ${Icon};
`

const Arrows = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
`

const LeftArrow = styled(FaArrowLeft)`
  ${Icon};
`

const RightArrow = styled(FaArrowRight)`
  ${Icon};
`
