import Head from 'next/head'
import {
  HeroContent,
  HeroContentProps,
  HeroUnit
} from '../components/hero-unit'
import Layout from '../components/layout'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Fragment } from 'react'
import { PageProps } from '../pages/[slug]'
import { WordPressPage } from '../data/types'

interface LibraryPage extends WordPressPage {
  template: 'page_library.php'
  acf: HeroContentProps & {
    file_groups: {
      group_name: string
      file_group: {
        list_name: string | null
        files: {
          title: string
          file: {
            url: string
          }
        }[]
      }[]
    }[]
  }
}
export interface LibraryTemplateProps extends PageProps {
  page: LibraryPage
}

export default function LibraryTemplate(props: LibraryTemplateProps) {
  return (
    <Layout {...props}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HeroUnit imgSrc={props.heroImg.media_details.sizes.full.source_url}>
        <HeroContent
          content={props.page.acf.content}
          buttons={props.page.acf.buttons}
        />
      </HeroUnit>
      {props.page.content.rendered && (
        <Content
          dangerouslySetInnerHTML={{ __html: props.page.content.rendered }}
        />
      )}
      <Main>
        <Container>
          <Row>
            <Col xs={12}>
              <Library>
                {props.page.acf &&
                  props.page.acf.file_groups &&
                  props.page.acf.file_groups.map((groups, i) => (
                    <LibraryGroup key={i}>
                      <h2>{groups.group_name}</h2>
                      {groups.file_group.map((group, j) => (
                        <Fragment key={j}>
                          {group.list_name && <h3>{group.list_name}</h3>}
                          {group.files && (
                            <ul>
                              {group.files.map(({ title, file }, k) => (
                                <li key={k}>
                                  {file && file.url && file.url ? (
                                    <a
                                      href={file.url}
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
}

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
