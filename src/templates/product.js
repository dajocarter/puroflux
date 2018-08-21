import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const ProductTemplate = () => (
  <Layout>
    <h1>Hi from the product template</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ProductTemplate
