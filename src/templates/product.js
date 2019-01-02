import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import ProductNav from '../components/productNav'
import Btn from '../components/styled/button'

const ProductTemplate = ({ data: { product } }) => (
  <Layout>
    <Main>
      <Row>
        <Col>
          <ProductNav />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.acf.description}</ProductDescription>
        </Col>
      </Row>
      {(product.acf.title ||
        (product.acf.image &&
          product.acf.image.localFile &&
          product.acf.image.localFile.childImageSharp &&
          product.acf.image.localFile.childImageSharp.fixed) ||
        (product.acf.file &&
          product.acf.file.url &&
          product.acf.file.title)) && (
        <Row>
          <FeaturedProduct>
            {product.acf.title && (
              <FeaturedTitle>{product.acf.title}</FeaturedTitle>
            )}
            {product.acf.image &&
              product.acf.image.localFile &&
              product.acf.image.localFile.childImageSharp &&
              product.acf.image.localFile.childImageSharp.fixed && (
                <div>
                  <FeaturedImg
                    fixed={product.acf.image.localFile.childImageSharp.fixed}
                  />
                </div>
              )}
            {product.acf.file &&
              product.acf.file.url &&
              product.acf.file.title && (
                <FeaturedBtn
                  as="a"
                  primary="true"
                  href={`${process.env.SOURCE_URL}${
                    product.acf.file.url.source_url
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.acf.file.title}
                </FeaturedBtn>
              )}
          </FeaturedProduct>
        </Row>
      )}
      {product.acf.series && (
        <Row>
          {product.acf.series.map(series => (
            <Series key={series.id} xs={12} sm={6} md={3}>
              <SeriesTitle>{series.title} Series</SeriesTitle>
              <SeriesImg
                fixed={series.featured_media.localFile.childImageSharp.fixed}
              />
              <SeriesDescrip>{series.acf.description}</SeriesDescrip>
              <SeriesBtn primary="true" to={series.slug}>
                View Product
              </SeriesBtn>
            </Series>
          ))}
        </Row>
      )}
      <Row>
        <Col>
          <OverviewTitle>Overview</OverviewTitle>
          <OverviewContent
            dangerouslySetInnerHTML={{ __html: product.content }}
          />
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default ProductTemplate

export const query = graphql`
  query ProductQuery($slug: String!) {
    product: wordpressWpProducts(slug: { eq: $slug }) {
      title
      content
      acf {
        description
        title
        image {
          localFile {
            childImageSharp {
              fixed(width: 250) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        file {
          title
          url {
            source_url
          }
        }
        series {
          id
          title
          slug
          featured_media {
            localFile {
              childImageSharp {
                fixed(height: 175) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
          acf {
            description
          }
        }
      }
    }
  }
`

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductTitle = styled.h1`
  margin-top: 3rem;
  text-align: center;
`

const ProductDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.body};
  margin-bottom: 3rem;
`

const FeaturedProduct = styled(Col)`
  text-align: center;
`

const FeaturedTitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-transform: uppercase;
`

const FeaturedImg = styled(Img)``

const FeaturedBtn = styled(Btn)`
  margin-top: 2rem;
`

const Series = styled(Col)`
  margin-bottom: 2rem;
  text-align: center;
`

const SeriesTitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  text-transform: uppercase;
`

const SeriesImg = styled(Img)``

const SeriesDescrip = styled.p`
  color: ${({ theme }) => theme.body};
  font-size: 0.85rem;
`

const SeriesBtn = styled(Btn)``

const OverviewTitle = styled.h2`
  margin-top: 3rem;
  margin-bottom: 2rem;
`

const OverviewContent = styled.div`
  color: ${({ theme }) => theme.body};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.primary};
  }

  a {
    color: ${({ theme }) => theme.secondary};

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.secondary};
      text-decoration-color: ${({ theme }) => theme.primary};
    }
  }

  iframe {
    display: block;
    margin: 1rem auto;
    max-width: 100%;
  }
`
