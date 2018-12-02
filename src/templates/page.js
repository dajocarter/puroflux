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

const PageTemplate = ({ data: { page } }) => (
  <Layout>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
    {page.content && (
      <Main>
        <Row>
          <Col xs={12}>
            <Content dangerouslySetInnerHTML={{ __html: page.content }} />
          </Col>
        </Row>
      </Main>
    )}
  </Layout>
)

export default PageTemplate

export const query = graphql`
  query PageQuery($slug: String!) {
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
  }
`
