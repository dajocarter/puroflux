import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const TypInstallTemplate = ({ data }) => (
  <Layout>
    <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
    <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
  </Layout>
)

export default TypInstallTemplate

export const query = graphql`
  query TypInstallQuery($id: String!) {
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
