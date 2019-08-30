import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { FaFilePdf } from 'react-icons/fa'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import ProductNav from '../components/productNav'
import Accordion, {
  AccordionTitle,
  AccordionContent
} from '../components/Accordion'
import Btn from '../components/styled/button'

const DownloadCol = ({ title, file }) => (
  <Col xs={12} sm={3}>
    <Download>
      <PDFicon />
      <p>
        <span>{title}</span>
        <a
          href={file.url.source_url}
          target='_blank'
          rel='noopener noreferrer'
        >
          DOWNLOAD
        </a>
      </p>
    </Download>
  </Col>
)

const SeriesTemplate = ({ data: { series }, pageContext }) => (
  <Layout pageTitle={series.title} pageSlug={series.slug}>
    <HeroUnit>
      <Row>
        <Col>
          <ProductNav light='true' />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='content'>
            <SeriesTitle>{series.title} Series</SeriesTitle>
            <SeriesDescription>{series.acf.description}</SeriesDescription>
          </div>
        </Col>
      </Row>
    </HeroUnit>
    <Main>
      <Row>
        <Col sm={12} md={6}>
          {series.featured_media.localFile && (
            <Img
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
      <DownloadRow>
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
        {series.acf.optional_file && (
          <DownloadCol
            title={series.acf.optional_file.title}
            file={series.acf.optional_file}
          />
        )}
      </DownloadRow>
      {series.acf.models &&
        <Row>
          <Col>
            <ModelTitle>Select a Model</ModelTitle>
            <ModelDescription>View product summary</ModelDescription>
          </Col>
        </Row>
      }
      {series.acf.models &&
        <AccordionRow>
          <Col>
            <Accordion>
              {series.acf.models.map((model, i) => (
                <div key={model.slug}>
                  <AccordionTitle accordionIndex={i}>
                    {model.title}
                  </AccordionTitle>
                  <AccordionContent accordionIndex={i}>
                    <Row>
                      {model.acf.model_stats && (
                        <Col xs={12} md={8}>
                          <ul>
                            {model.acf.model_stats.map((stat, s) => (
                              <li key={s}>
                                <span>{stat.title}:</span>{' '}
                                <span>{stat.value}</span>
                              </li>
                            ))}
                          </ul>
                        </Col>
                      )}
                      {model.acf.model_files && (
                        <Col xs={12} md={4}>
                          <strong>{model.acf.file_names}</strong>
                          <ul>
                            {model.acf.model_files.map((mf, f) => (
                              <li key={f}>
                                {mf.title}:
                                {mf.file ? (
                                  <a
                                    href={mf.file.url.source_url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    DOWNLOAD
                                  </a>
                                ) : (
                                  <span>* Consult Factory</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </Col>
                      )}
                    </Row>
                  </AccordionContent>
                </div>
              ))}
            </Accordion>
          </Col>
        </AccordionRow>
      }
      {series.acf.model_notes &&
        <Row>
          <Col>
            <ModelNotes
              dangerouslySetInnerHTML={{ __html: series.acf.model_notes }}
            />
          </Col>
        </Row>
      }
      {series.acf.products && (
        <Fragment>
          <Row>
            <Col>
              <ProductTitle>{series.acf.products[0].title}</ProductTitle>
            </Col>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            {series.acf.products[0].acf &&
              series.acf.products[0].acf.series &&
              series.acf.products[0].acf.series
                .filter(rs => rs.slug !== pageContext.slug)
                .map(relatedSeries => (
                  <RelatedModel key={relatedSeries.id} xs={12} md={4}>
                    <RelatedTitle>{relatedSeries.title}</RelatedTitle>
                    <RelatedExcerpt>
                      {relatedSeries.acf.description}
                    </RelatedExcerpt>
                    <Btn primary='true' to={relatedSeries.slug}>
                      View Product
                    </Btn>
                  </RelatedModel>
                ))}
          </Row>
        </Fragment>
      )}
    </Main>
  </Layout>
)

export default SeriesTemplate

export const query = graphql`
  query SeriesQuery($slug: String!) {
    series: wordpressWpSeries(slug: { eq: $slug }) {
      title
      slug
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
        optional_file {
          title
          url {
            source_url
          }
        }
        model_notes
        models {
          slug
          title
          acf {
            model_stats {
              title
              value
            }
            file_names
            model_files {
              title
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

const FeaturedTitle = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 36px;
`
const FeaturedContent = styled.div`
  color: ${({ theme }) => theme.body};
  font-size: 18px;
`

const DownloadRow = styled(Row)`
  justify-content: center;
  margin-top: 3rem;
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
    color: ${({ theme }) => theme.body};
  }

  a {
    text-transform: uppercase;
    &,
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`
const PDFicon = styled(FaFilePdf)`
  color: ${({ theme }) => theme.primary};
  font-size: 3rem;
`

const AccordionRow = styled(Row)`
  ul {
    &:first-child {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @media (max-width: 575px) {
        grid-template-columns: 1fr;
      }
    }

    &:not(:first-child) {
      span {
        margin-left: 5px;
      }
    }
  }
`

const ModelTitle = styled.h2`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 1rem;
`
const ModelDescription = styled.p`
  text-align: center;
`
const ModelNotes = styled.p`
  text-align: center;
`

const ProductTitle = styled.h2`
  margin-top: 4rem;
  margin-bottom: 3rem;
  text-align: center;
`

const RelatedModel = styled(Col)`
  text-align: center;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`

const RelatedTitle = styled.h4`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
`

const RelatedExcerpt = styled.p`
  color: ${({ theme }) => theme.body};
`
