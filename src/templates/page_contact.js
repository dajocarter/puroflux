import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../components/layout'
import HeroUnit from '../components/Hero/HeroUnit'
import HeroContent from '../components/Hero/HeroContent-Page'
import ContactForm from '../components/forms/contact'

const Contact = ({ data: { page } }) => (
  <Layout>
    <HeroUnit>
      <HeroContent html={page.acf.content} buttons={page.acf.buttons} />
    </HeroUnit>
    <Main>
      <Row>
        <Col md={5}>
          <ColumnTitle>Contact Information</ColumnTitle>
          <GMap>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.9867927125356!2d-118.80215204942941!3d34.27438898045055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c282bad55e5c73%3A0xe389b73478d03800!2sPuroflux+Corporation!5e0!3m2!1sen!2sus!4v1535824827764'
              width='600'
              height='450'
              frameBorder='0'
              style={{ border: 0 }}
              title='map'
              allowFullScreen
            />
          </GMap>
          <Address>
            Puroflux Corporation <br />
            2121 Union Place <br />
            Simi Valley, CA 93065
          </Address>
          <ContactInfo>
            <Title>Tel:</Title>
            <Value href='tel:805-579-0216'>(805) 579-0216</Value> <br />
            <Title>Fax:</Title>
            <Value href='tel:805-579-6005'>(805) 579-6005</Value> <br />
            <Title>Email:</Title>
            <Value href='mailto:sales@puroflux.com'>sales@puroflux.com</Value>
          </ContactInfo>
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <ColumnTitle>Contact Form</ColumnTitle>
          <ContactForm />
        </Col>
      </Row>
    </Main>
  </Layout>
)

export default Contact

export const query = graphql`
  query ContactQuery($slug: String!) {
    page: wordpressPage(slug: { eq: $slug }) {
      acf {
        content
        buttons {
          button_link {
            title
            target
            url
          }
        }
        location {
          address
          lat
          lng
        }
        address
        phone_number
        fax_number
        contact_email
      }
    }
  }
`

const Main = styled(Container)`
  padding: 45px 15px;
`

const ColumnTitle = styled.h2`
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
`

const GMap = styled.div`
  iframe {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }
`

const Address = styled.p`
  margin-top: 1rem;
`

const ContactInfo = styled.p``

const Title = styled.span`
  color: ${({ theme }) => theme.primary};
`

const Value = styled.a`
  color: black;
  margin-left: 5px;
  text-decoration: underline;

  &:hover,
  &:focus {
    color: black;
  }
`
