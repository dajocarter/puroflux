import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import ProductNav from '../components/productNav'
import Btn from '../components/styled/button'

const Main = styled(Container)`
  padding: 45px 15px;
`

const ProductTitle = styled.h1``

const ProductDescription = styled.p``

const FeaturedTitle = styled.p``

const FeaturedImg = styled(Img)``

const FeaturedBtn = styled(Btn)``

const Series = styled(Col)``

const SeriesTitle = styled.p``

const SeriesImg = styled(Img)``

const SeriesDescrip = styled.p``

const SeriesBtn = styled(Btn)``

const OverviewTitle = styled.h2``

const OverviewContent = styled.div``

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
          <Col>
            {product.acf.title && (
              <FeaturedTitle>{product.acf.title}</FeaturedTitle>
            )}
            {product.acf.image &&
              product.acf.image.localFile &&
              product.acf.image.localFile.childImageSharp &&
              product.acf.image.localFile.childImageSharp.fixed && (
                <FeaturedImg
                  fixed={product.acf.image.localFile.childImageSharp.fixed}
                />
              )}
            {product.acf.file &&
              product.acf.file.url &&
              product.acf.file.title && (
                <FeaturedBtn
                  as="a"
                  href={`${process.env.SOURCE_URL}${
                    product.acf.file.url.source_url
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.acf.file.title}
                </FeaturedBtn>
              )}
          </Col>
        </Row>
      )}
      {product.acf.series && (
        <Row>
          {product.acf.series.map(series => (
            <Series key={series.id}>
              <SeriesTitle>{series.title}</SeriesTitle>
              <SeriesImg
                fixed={series.featured_media.localFile.childImageSharp.fixed}
              />
              <SeriesDescrip>{series.acf.description}</SeriesDescrip>
              <SeriesBtn to={series.slug}>View Product</SeriesBtn>
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
