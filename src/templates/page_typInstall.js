import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Accordion from '../components/Accordion'

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Installation = styled.div`
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

const TypInstallTemplate = () => (
  <StaticQuery
    query={graphql`
      query TypInstallQuery {
        page: wordpressPage(
          template: { eq: "page_typical-installations.php" }
        ) {
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
        models: allWordpressWpProducts {
          edges {
            node {
              id
              title
              categories {
                slug
              }
              acf {
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
      }
    `}
    render={data => {
      const filterInstalls = data.models.edges
        .filter(({ node }) =>
          node.categories.some(cat => cat.slug === 'permanent-media-filters')
        )
        .reverse()
      const sepInstalls = data.models.edges
        .filter(({ node }) =>
          node.categories.some(cat => cat.slug === 'separators')
        )
        .reverse()
      return (
        <Layout>
          <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
          {data.page.content && (
            <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
          )}
          {filterInstalls && (
            <Installation>
              <div className="text--center">
                <h2>Filter Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion files={filterInstalls} slipStream sweeperPiping />
            </Installation>
          )}
          {sepInstalls && (
            <Installation>
              <div className="text--center">
                <h2>Separator Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion
                files={sepInstalls}
                sweeperPiping
                fullFlow
                sideStream
              />
            </Installation>
          )}
        </Layout>
      )
    }}
  />
)

export default TypInstallTemplate
