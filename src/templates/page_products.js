import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ProductNav from '../components/productNav'

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

const ProductsPageTemplate = ({ data: { page } }) => (
  <Layout>
    <Hero html={page.acf.content} links={page.acf.buttons} />
    <Main>
      <Row>
        <Col xs={12}>
          <ProductNav />
        </Col>
      </Row>
      {page.content && (
        <Row>
          <Col xs={12}>
            <Content dangerouslySetInnerHTML={{ __html: page.content }} />
          </Col>
        </Row>
      )}
    </Main>
  </Layout>
)

export default ProductsPageTemplate

export const query = graphql`
  query ProductsPageQuery($id: String!) {
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
      }
    }
  }
`
