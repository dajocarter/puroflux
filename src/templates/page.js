import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'

const Content = styled.div`
	color: ${props => props.theme.body};
  margin: 0 auto;
  max-width: 960px;
  padding: 45px 15px;

	h1, h2, h3, h4, h5, h6 {
		color: ${props => props.theme.primary};
	}
`

const PageTemplate = ({ data }) => (
  <Layout>
    <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
    {data.page.content && (
      <Content dangerouslySetInnerHTML={{ __html: data.page.content }} />
    )}
  </Layout>
)

export default PageTemplate

export const query = graphql`
  query PageQuery($id: String!) {
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
