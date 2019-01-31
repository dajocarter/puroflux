import React from 'react'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'

const NotFoundPage = () => (
  <Layout pageTitle={'Page Not Found'}>
    <HeroUnit>
      <HeroContent
        html={`<h1>PAGE NOT FOUND</h1>`}
      />
    </HeroUnit>
  </Layout>
)

export default NotFoundPage
