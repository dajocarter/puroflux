import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import NewsletterForm from '../components/forms/newsletter'
import Request3dForm from '../components/forms/request3D'
import ContactForm from '../components/forms/contact'

const FormTemplate = ({ data: { page } }) => (
  <Layout pageTitle={page.title} pageSlug={page.slug}>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
    <Main>
      <Row>
        <Col xs={12}>
          <Content>
            {page.acf.form ? page.acf.form === 'newsletter' ? <NewsletterForm /> : <Request3dForm /> : <ContactForm />}
          </Content>
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default FormTemplate

export const query = graphql`
  query FormQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      title
      slug
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
        form
      }
    }
  }
`

const Main = styled(Container)`
  padding: 45px 15px;
`

const Content = styled.div`
  color: ${({ theme }) => theme.body};
  margin: 0 auto;
  max-width: 960px;
  padding: 45px 15px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.primary};
  }
`
