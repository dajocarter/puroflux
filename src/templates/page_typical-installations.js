import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import ModelInstallationFiles from '../components/ModelInstallationFiles'
import Accordion, {
  AccordionTitle,
  AccordionContent
} from '../components/Accordion'

const Main = styled(Container)`
  padding: 45px 15px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Installation = styled.div`
  &:first-of-type {
    margin-bottom: 45px;
  }

  .text--center {
    text-align: center;
  }

  h2 {
    text-transform: uppercase;
  }

  h4 {
    color: #ccc;
  }
`

const TypicalInstallTemplate = ({ data }) => (
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
          {data.page.content && (
            <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
          )}
          {data.filterInstalls && (
            <Installation>
              <div className='text--center'>
                <h2>Filter Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion>
                {data.filterInstalls.edges.map(({ node }, i) => (
                  <div key={node.id}>
                    <AccordionTitle accordionIndex={i}>
                      {node.title}
                    </AccordionTitle>
                    <AccordionContent accordionIndex={i}>
                      <ModelInstallationFiles
                        slipStream={node.acf.slip_stream_files}
                        sweeperPiping={node.acf.sweeper_piping_files}
                      />
                    </AccordionContent>
                  </div>
                ))}
              </Accordion>
            </Installation>
          )}
          {data.sepInstalls && (
            <Installation>
              <div className='text--center'>
                <h2>Separator Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion>
                {data.sepInstalls.edges.map(({ node }, i) => (
                  <div key={node.id}>
                    <AccordionTitle accordionIndex={i}>
                      {node.title}
                    </AccordionTitle>
                    <AccordionContent accordionIndex={i}>
                      <ModelInstallationFiles
                        sweeperPiping={node.acf.sweeper_piping_files}
                        fullFlow={node.acf.full_flow_files}
                        sideStream={node.acf.side_stream_files}
                      />
                    </AccordionContent>
                  </div>
                ))}
              </Accordion>
            </Installation>
          )}
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default TypicalInstallTemplate

export const query = graphql`
  query TypicalInstallQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      content
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
    filterInstalls: allWordpressWpSeries(
      filter: {
        acf: {
          products: { elemMatch: { title: { eq: "Permanent Media Filters" } } }
        }
      }
      sort: { fields: wordpress_id, order: ASC }
    ) {
      edges {
        node {
          id
          title
          acf {
            slip_stream_files {
              file {
                wordpress_id
                title
                url {
                  source_url
                }
              }
            }
            sweeper_piping_files {
              file {
                wordpress_id
                title
                url {
                  source_url
                }
              }
            }
          }
        }
      }
    }
    sepInstalls: allWordpressWpSeries(
      filter: {
        acf: { products: { elemMatch: { title: { eq: "Separators" } } } }
      }
      sort: { fields: wordpress_id, order: ASC }
    ) {
      edges {
        node {
          id
          title
          acf {
            sweeper_piping_files {
              file {
                wordpress_id
                title
                url {
                  source_url
                }
              }
            }
            full_flow_files {
              file {
                wordpress_id
                title
                url {
                  source_url
                }
              }
            }
            side_stream_files {
              file {
                wordpress_id
                title
                url {
                  source_url
                }
              }
            }
          }
        }
      }
    }
  }
`
