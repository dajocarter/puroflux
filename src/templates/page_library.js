import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Main = styled.div`
  padding: 45px 15px;
  background-color: black;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Library = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
`

const LibraryGroup = styled.div`
  flex: 0 0 auto;
  h2 {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }
  ul,
  a {
    color: #ffa200;
    text-decoration: none;
  }
`

const LibraryTemplate = ({ data: { page } }) => (
  <Layout>
    <Hero html={page.acf.content} links={page.acf.buttons} />
    {page.content && (
      <Content dangerouslySetInnerHTML={{ __html: page.content }} />
    )}
    <Main>
      <Container>
        <Row>
          <Col xs={12}>
            <Library>
              {page.acf &&
                page.acf.file_groups &&
                page.acf.file_groups.map((group, i) => (
                  <LibraryGroup key={i}>
                    <h2>{group.group_name}</h2>
                    <ul>
                      {group.files.map(({ file }) => (
                        <li key={file.wordpress_id}>
                          <a
                            href={`${process.env.SOURCE_URL}${
                              file.url.source_url
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </LibraryGroup>
                ))}
            </Library>
          </Col>
        </Row>
      </Container>
    </Main>
  </Layout>
)

export default LibraryTemplate

export const query = graphql`
  query LibraryQuery($id: String!) {
    page: wordpressPage(id: { eq: $id }) {
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
        file_groups {
          group_name
          files {
            file {
              wordpress_id
              title
              url {
                source_url
              }
            }
          }
          sub_groups {
            group_name
            files {
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
