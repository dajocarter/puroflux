import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { FaFilePdf } from 'react-icons/fa'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import ProductNav from '../components/productNav'
import Btn from '../components/styled/button'

const Main = styled(Container)`
  padding: 45px 15px;
`

const SeriesTitle = styled.h1`
  margin-top: 3rem;
  text-transform: uppercase;
`
const SeriesDescription = styled.p`
  font-size: 18px;
  text-transform: uppercase;
`

const FeaturedImg = styled(Img)``
const FeaturedTitle = styled.h2``
const FeaturedContent = styled.div``

const PDFicon = styled(FaFilePdf)`
  color: ${props => props.theme.primary};
`

const ModelTitle = styled.h2``
const ModelDescription = styled.p``
const ModelNotes = styled.p``

const ProductTitle = styled.h2``
const RelatedTitle = styled.h4``
const RelatedExcerpt = styled.p``
const RelatedBtn = styled(Btn)``

const SeriesTemplate = ({ data: { series } }) => (
  <Layout>
    <HeroUnit>
      <Row>
        <Col>
          <ProductNav light />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="content">
            <SeriesTitle>{series.title} Series</SeriesTitle>
            <SeriesDescription>{series.acf.description}</SeriesDescription>
          </div>
        </Col>
      </Row>
    </HeroUnit>
    <Main>
      <Row>
        {series.featured_media && (
          <Col>
            <FeaturedImg
              fixed={series.featured_media.localFile.childImageSharp.fixed}
            />
          </Col>
        )}
        <Col>
          <FeaturedTitle>Details</FeaturedTitle>
          <FeaturedContent
            dangerouslySetInnerHTML={{ __html: series.content }}
          />
        </Col>
      </Row>
      <Row>
        {series.acf.datasheet && (
          <Col>
            <PDFicon /> {series.title} Series Datasheet{' '}
            <a
              href={series.acf.datasheet.url.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD
            </a>
          </Col>
        )}
        {series.acf.operation___maint_manual && (
          <Col>
            <PDFicon /> Operation & Maint. Manual
            <a
              href={series.acf.operation___maint_manual.url.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD
            </a>
          </Col>
        )}
        {series.acf.sample_spec_sheet && (
          <Col>
            <PDFicon /> Sample Spec. Sheet
            <a
              href={series.acf.sample_spec_sheet.url.source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOWNLOAD
            </a>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <ModelTitle>Select a Model</ModelTitle>
          <ModelDescription>View product summary</ModelDescription>
        </Col>
      </Row>
      <Row>
        <Col>
          <ModelNotes
            dangerouslySetInnerHTML={{ __html: series.acf.model_notes }}
          />
        </Col>
      </Row>
      {series.acf.products && (
        <Row>
          <ProductTitle>{series.acf.products.title}</ProductTitle>
          {series.acf.products.acf &&
            series.acf.products.acf.series &&
            series.acf.products.acf.series.map(relatedSeries => (
              <Col key={relatedSeries.id}>
                <RelatedTitle>{relatedSeries.title}</RelatedTitle>
                <RelatedExcerpt>{relatedSeries.acf.description}</RelatedExcerpt>
                <RelatedBtn to={relatedSeries.slug}>View Product</RelatedBtn>
              </Col>
            ))}
        </Row>
      )}
    </Main>
  </Layout>
)

export default SeriesTemplate

export const query = graphql`
  query SeriesQuery($id: String!) {
    series: wordpressWpSeries(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
      acf {
        description
        datasheet {
          url {
            source_url
          }
        }
        operation___maint_manual {
          url {
            source_url
          }
        }
        sample_spec_sheet {
          url {
            source_url
          }
        }
        model_notes
        models {
          title
          acf {
            model_stats {
              title
              value
            }
            file_names
            model_files {
              file {
                url {
                  source_url
                }
              }
            }
          }
        }
        products {
          title
          acf {
            series {
              id
              title
              slug
              acf {
                description
              }
            }
          }
        }
      }
    }
  }
`
