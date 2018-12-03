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
const FeaturedTitle = styled.h2`
  color: ${props => props.theme.primary};
  font-size: 36px;
`
const FeaturedContent = styled.div`
  color: ${props => props.theme.body};
  font-size: 18px;
`

const Download = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 383px) {
    justify-content: flex-start;
  }

  p {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    margin-left: 10px;
    color: ${props => props.theme.body};
  }

  a {
    text-transform: uppercase;
    &,
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`
const PDFicon = styled(FaFilePdf)`
  color: ${props => props.theme.primary};
  font-size: 3rem;
`

const ModelTitle = styled.h2`
  text-align: center;
`
const ModelDescription = styled.p`
  text-align: center;
`
const ModelNotes = styled.p`
  text-align: center;
`

const ProductTitle = styled.h2``
const RelatedTitle = styled.h4``
const RelatedExcerpt = styled.p``
const RelatedBtn = styled(Btn)``

const DownloadCol = ({ title, file }) => (
  <Col>
    <Download>
      <PDFicon />
      <p>
        <span>{title}</span>
        <a href={file.url.source_url} target="_blank" rel="noopener noreferrer">
          DOWNLOAD
        </a>
      </p>
    </Download>
  </Col>
)

const SeriesTemplate = ({ data: { series } }) => (
  <Layout>
    <HeroUnit>
      <Row>
        <Col>
          <ProductNav light="true" />
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
        <Col sm={12} md={6}>
          {series.featured_media && (
            <FeaturedImg
              fluid={series.featured_media.localFile.childImageSharp.fluid}
            />
          )}
        </Col>
        <Col sm={12} md={6}>
          <FeaturedTitle>Details</FeaturedTitle>
          <FeaturedContent
            dangerouslySetInnerHTML={{ __html: series.content }}
          />
        </Col>
      </Row>
      <Row>
        {series.acf.datasheet && (
          <DownloadCol
            title={`${series.title} Series Datasheet`}
            file={series.acf.datasheet}
          />
        )}
        {series.acf.operation___maint_manual && (
          <DownloadCol
            title={`Operation & Maint. Manual`}
            file={series.acf.operation___maint_manual}
          />
        )}
        {series.acf.sample_spec_sheet && (
          <DownloadCol
            title={`Sample Spec. Sheet`}
            file={series.acf.sample_spec_sheet}
          />
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
        <>
          <Row>
            <Col>
              <ProductTitle>{series.acf.products[0].title}</ProductTitle>
            </Col>
          </Row>
          <Row>
            {series.acf.products[0].acf &&
              series.acf.products[0].acf.series &&
              series.acf.products[0].acf.series.map(relatedSeries => (
                <Col key={relatedSeries.id}>
                  <RelatedTitle>{relatedSeries.title}</RelatedTitle>
                  <RelatedExcerpt>
                    {relatedSeries.acf.description}
                  </RelatedExcerpt>
                  <RelatedBtn to={relatedSeries.slug}>View Product</RelatedBtn>
                </Col>
              ))}
          </Row>
        </>
      )}
    </Main>
  </Layout>
)

export default SeriesTemplate

export const query = graphql`
  query SeriesQuery($slug: String!) {
    series: wordpressWpSeries(slug: { eq: $slug }) {
      title
      content
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
