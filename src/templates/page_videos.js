import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'

const Main = styled(Container)`
  padding: 45px 15px;
`

const Content = styled.div`
  color: ${props => props.theme.body};
  margin: 0 auto;
  max-width: 960px;
  padding: 45px 15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.primary};
  }
`

const Embed = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow: hidden;
  max-width: 100%;
  height: auto;
  margin-bottom: 45px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

const VideosTemplate = ({ data: { page } }) => (
  <Layout>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
    <Main>
      <Row>
        <Col xs={12}>
          {page.content && (
            <Content dangerouslySetInnerHTML={{ __html: page.content }} />
          )}
          {page.acf.videos && (
            <Row>
              {page.acf.videos.map(({ video }, i) => (
                <Col md={6} key={i}>
                  <Embed dangerouslySetInnerHTML={{ __html: video }} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default VideosTemplate

export const query = graphql`
  query VideosQuery($id: String!) {
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
        videos {
          video
        }
      }
    }
  }
`
