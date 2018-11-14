import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const ProductTemplate = ({ data: { product } }) => (
  <Layout>
    <h1>{product.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: product.content }} />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ProductTemplate

export const query = graphql`
  query ProductQuery($id: String!) {
    product: wordpressWpProducts(id: { eq: $id }) {
      title
      content
    }
  }
`
