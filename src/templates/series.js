import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const SeriesTemplate = ({ data: { series } }) => (
  <Layout>
    <h1>{series.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: series.content }} />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SeriesTemplate

export const query = graphql`
  query SeriesQuery($id: String!) {
    series: wordpressWpSeries(id: { eq: $id }) {
      title
      content
    }
  }
`
