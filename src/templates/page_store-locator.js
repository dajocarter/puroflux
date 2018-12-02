import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const StoreLocatorTemplate = ({ data: { page } }) => (
  <Layout>
    <h1>{page.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.content }} />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default StoreLocatorTemplate

export const query = graphql`
  query StoreLocatorQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      content
    }
  }
`
