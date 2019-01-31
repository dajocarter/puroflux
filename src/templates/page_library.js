import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'

const LibraryTemplate = ({ data: { page } }) => (
  <Layout pageTitle={page.title} pageSlug={page.slug}>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
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
                page.acf.file_groups.map((groups, i) => (
                  <LibraryGroup key={i}>
                    <h2>{groups.group_name}</h2>
                    {groups.file_group.map((group, j) => (
                      <Fragment key={j}>
                        {group.list_name && <h3>{group.list_name}</h3>}
                        {group.files && (
                          <ul>
                            {group.files.map(({ title, file }, k) => (
                              <li key={k}>
                                {file && file.url && file.url.source_url ? (
                                  <a
                                    href={file.url.source_url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                  >
                                    {title}
                                  </a>
                                ) : (
                                  title
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Fragment>
                    ))}
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
  query LibraryQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      slug
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
          file_group {
            list_name
            files {
              title
              file {
                url {
                  source_url
                  localFile {
                    absolutePath
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

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
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const LibraryGroup = styled.div`
  h2,
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  h2 {
    color: white;
    text-transform: uppercase;
  }
  h3 {
    color: ${({ theme }) => theme.primary};
  }
  ul,
  a {
    color: ${({ theme }) => theme.secondary};
    text-decoration: none;
  }

  a {
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.primary};
    }
  }
`
