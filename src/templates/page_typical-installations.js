import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Accordion from '../components/Accordion'

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
    <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
    <Main>
      <Row>
        <Col xs={12}>
          {data.page.content && (
            <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
          )}
          {data.filterInstalls && (
            <Installation>
              <div className="text--center">
                <h2>Filter Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion
                files={data.filterInstalls.edges}
                slipStream
                sweeperPiping
              />
            </Installation>
          )}
          {data.sepInstalls && (
            <Installation>
              <div className="text--center">
                <h2>Separator Installations</h2>
                <h3>Select a Model</h3>
                <h4>View product summary</h4>
              </div>
              <Accordion
                files={data.sepInstalls.edges}
                sweeperPiping
                fullFlow
                sideStream
              />
            </Installation>
          )}
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default TypicalInstallTemplate

export const query = graphql`
  query TypicalInstallQuery($id: String!) {
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
