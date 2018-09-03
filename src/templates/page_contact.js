import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Form from '../components/form'

const Container = styled.div``

const Row = styled.div``

const Col = styled.div``

const ColumnTitle = styled.h2``

const Map = styled.div``

const Address = styled.p``

const ContactInfo = styled.p``

const Title = styled.span``

const Value = styled.a``

const Contact = () => (
  <StaticQuery
    query={graphql`
      query ContactQuery {
        page: wordpressPage(slug: { eq: "contact" }) {
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
    `}
    render={data => (
      <Layout>
        <Hero html={data.page.acf.content} links={data.page.acf.buttons} />
        <Container>
          <Row>
            <Col>
              <ColumnTitle>Contact Information</ColumnTitle>
              <Map>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.9867927125356!2d-118.80215204942941!3d34.27438898045055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c282bad55e5c73%3A0xe389b73478d03800!2sPuroflux+Corporation!5e0!3m2!1sen!2sus!4v1535824827764"
                  width="600"
                  height="450"
                  frameBorder="0"
                  style={{ border: 0 }}
                  title="map"
                  allowFullScreen
                />
              </Map>
              <Address>
                Puroflux Corporation 2121 Union Place Simi Valley, CA 93065
              </Address>
              <ContactInfo>
                <Title>Tel:</Title>
                <Value href="tel:805-579-0216">(805) 579-0216</Value>
                <Title>Fax:</Title>
                <Value href="tel:805-579-6005">(805) 579-6005</Value>
                <Title>Email:</Title>
                <Value href="mailto:sales@puroflux.com">
                  sales@puroflux.com
                </Value>
              </ContactInfo>
            </Col>
            <Col>
              <ColumnTitle>Contact Form</ColumnTitle>
              <Form />
            </Col>
          </Row>
        </Container>
      </Layout>
    )}
  />
)

export default Contact
