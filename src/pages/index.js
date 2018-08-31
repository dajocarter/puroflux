import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import FlexibleContent from '../components/flexible-content'

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  width: 100%;

  > .gatsby-image-outer-wrapper {
    width: 100%;
  }

  @media (min-width: 768px) {
    width: 45%;
  }
`

const FeatureImage = styled(Img)`
  height: auto;
  width: 100%;
`

const FeatureTitle = styled.h2`
  border-bottom: 3px solid #05c6c7;
  color: #7f7f7f;
  padding: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
`

const ButtonLink = styled(Link)`
  border: 3px solid #ffa200;
  background-color: transparent;
  color: black;
  display: inline-block;
  letter-spacing: 1px;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.15s ease-in;
  &:hover,
  &:focus {
    background-color: #ffa200;
    color: white;
  }
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
        <Container>
          <Row>
            <Column>
              {data.page.acf.featured_image && (
                <FeatureImage
                  fluid={
                    data.page.acf.featured_image.localFile.childImageSharp.fluid
                  }
                />
              )}
            </Column>
            <Column>
              <FeatureTitle>Featured</FeatureTitle>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.page.acf.featured_content,
                }}
              />
              <ButtonLink to={`/gallery`}>View Gallery</ButtonLink>
            </Column>
          </Row>
        </Container>
        {data.page.acf.layouts_page && (
          <FlexibleContent layouts={data.page.acf.layouts_page} />
        )}
      </Layout>
    )}
  />
)

export default IndexPage
