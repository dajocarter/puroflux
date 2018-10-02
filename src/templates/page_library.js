import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Library = styled.div`
  background-color: black;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const LibraryGroup = styled.div`
  flex: 0 0 auto;
  h2 {
    color: white;
  }
  ul,
  a {
    color: #ffa200;
    text-decoration: none;
  }
`

const LibraryTemplate = () => (
  <StaticQuery
    query={graphql`
      query LibraryQuery {
        page: wordpressPage(template: { eq: "page_library.php" }) {
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
    `}
    render={data => (
      <Layout>
        <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
        {data.page.content && (
          <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
        )}
        <Library>
          {data.page.acf.file_groups.map((group, i) => (
            <LibraryGroup key={i}>
              <h2>{group.group_name}</h2>
              <ul>
                {group.files.map(({ file }) => (
                  <li key={file.wordpress_id}>
                    <a
                      href={`${process.env.SOURCE_URL}${file.url.source_url}`}
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
      </Layout>
    )}
  />
)

export default LibraryTemplate
