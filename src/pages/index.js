import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import FlexibleContent from '../components/flexible-content'
import Btn from '../components/styled/button'

const FeatureContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 2rem;

  > .row > .col {
    position: relative;
    height: 73px;
  }
`

const Column = styled(Col)`
  > .gatsby-image-outer-wrapper {
    width: 100%;
  }

  blockquote {
    border-left: ${props => `0.5rem solid ${props.theme.primary}`};
    padding: 1rem;
    background: #f7f7f7;
    font-style: italic;

    > p:last-child {
      margin-bottom: 0;
    }
  }

  &:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 991px) {
    &:last-of-type {
      margin-top: 2rem;
    }
  }
`

const FeatureImage = styled(Img)`
  height: auto;
  width: 100%;
`

const FeatureTitle = styled.h2`
  border-bottom: ${props => `3px solid ${props.theme.primary}`};
  color: #7f7f7f;
  padding: 0 0.5rem 0.5rem;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 992px) {
    left: 75%;
    transform: translateX(-75%);
  }
`

const WPcontent = styled.div`
color: ${props => props.theme.body};
`

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query HomeQuery {
        page: wordpressPage(slug: { eq: "home" }) {
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
                content_split
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
    `}
    render={data => (
      <Layout>
        <Hero
          isHome
          html={data.page.acf.content}
          links={data.page.acf.buttons}
        />
        <FeatureContainer>
          <Row>
            <Col>
              <FeatureTitle>Featured</FeatureTitle>
            </Col>
          </Row>
          <Row>
            <Column xs={12} lg={6}>
              {data.page.acf.featured_image && (
                <FeatureImage
                  fluid={
                    data.page.acf.featured_image.localFile.childImageSharp.fluid
                  }
                />
              )}
            </Column>
            <Column xs={12} lg={6}>
              <WPcontent
                dangerouslySetInnerHTML={{
                  __html: data.page.acf.featured_content,
                }}
              />
              <Btn secondary="true" to={`/gallery/`}>
                View Gallery
              </Btn>
            </Column>
          </Row>
        </FeatureContainer>
        {data.page.acf.layouts_page && (
          <FlexibleContent layouts={data.page.acf.layouts_page} />
        )}
      </Layout>
    )}
  />
)

export default IndexPage
